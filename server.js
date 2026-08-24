const express = require("express");
const cors = require("cors");
const validator = require("validator");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Middleware to handle JSON and cross-origin requests
app.use(cors());
app.use(express.json());

// Serve your HTML, CSS, JS, and Image files automatically
app.use(express.static(__dirname));

// Nodemailer Transporter Configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your sender email address
    pass: process.env.EMAIL_PASS, // Your app password
  },
});

// Helper function to build email template
function createEmailContent(firstName, lastName) {
  return {
    subject: "Endonezce Kursu - Havale / EFT Ödeme Talimatları",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2>Merhaba ${firstName} ${lastName},</h2>
        <p>Kurs kaydınız için teşekkür ederiz! Ödemenizi tamamlamak için <strong>Havale / EFT</strong> bilgilerimiz aşağıdadır:</p>
        
        <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Banka:</strong> Ziraat Bankası</p>
          <p style="margin: 5px 0;"><strong>Alıcı:</strong> Hilmy</p>
          <p style="margin: 5px 0;"><strong>IBAN:</strong> TR00 0000 0000 0000 0000 0000 00</p>
          <p style="margin: 5px 0;"><strong>Açıklama:</strong> ${firstName} ${lastName} - Kurs Ödemesi</p>
        </div>

        <p>Ödemeyi gerçekleştirdikten sonra dekontunuzu bu e-postaya yanıt vererek gönderebilirsiniz.</p>
        <p>Başarılar dileriz,<br/><strong>Endonezce Kurs Ekibi</strong></p>
      </div>
    `,
  };
}

// 1. Initial Checkout Endpoint
app.post("/api/checkout", async (req, res) => {
  const { firstName, lastName, email, paymentMethod } = req.body;

  // Real email format check using validator
  const isValidEmail = Boolean(email && validator.isEmail(email));

  if (!isValidEmail) {
    // Send a success signal with emailValid: false so JS handles the warning UI
    return res.status(200).json({
      success: false,
      emailValid: false,
      code: "INVALID_EMAIL",
    });
  }

  try {
    const { subject, html } = createEmailContent(firstName, lastName);

    await transporter.sendMail({
      from: `"Endonezce Kursu" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: html,
    });

    return res.status(200).json({
      success: true,
      emailValid: true,
      code: "EMAIL_SENT",
    });
  } catch (error) {
    console.error("Email Sending Error:", error);
    return res.status(200).json({
      success: false,
      emailValid: true,
      code: "SEND_FAILED",
    });
  }
});

// 2. Resend Email Endpoint
app.post("/api/resend-email", async (req, res) => {
  const { firstName, lastName, email } = req.body;

  const isValidEmail = Boolean(email && validator.isEmail(email));

  if (!isValidEmail) {
    return res.status(200).json({
      success: false,
      emailValid: false,
      code: "INVALID_EMAIL",
    });
  }

  try {
    const { subject, html } = createEmailContent(
      firstName || "Öğrenci",
      lastName || "",
    );

    await transporter.sendMail({
      from: `"Endonezce Kursu" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `[Tekrar] ${subject}`,
      html: html,
    });

    return res.status(200).json({
      success: true,
      emailValid: true,
      code: "EMAIL_SENT",
    });
  } catch (error) {
    console.error("Resend Email Error:", error);
    return res.status(200).json({
      success: false,
      emailValid: true,
      code: "SEND_FAILED",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
