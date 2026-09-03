require("dotenv").config(); // Must be at line 1

const express = require("express");
const validator = require("validator");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Multi-language email template generator
function createEmailContent(firstName = "", lastName = "", lang = "tr") {
  const fullName =
    `${firstName} ${lastName}`.trim() ||
    (lang === "en" ? "Student" : "Öğrenci");

  if (lang === "en") {
    return {
      subject: "Indonesian Course - Wire Transfer / EFT Payment Instructions",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2>Hello ${fullName},</h2>
          <p>Thank you for registering for our course! Below are the details to complete your payment via <strong>Wire Transfer / EFT</strong>:</p>
          
          <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Bank:</strong> Ziraat Bankası</p>
            <p style="margin: 5px 0;"><strong>Recipient:</strong> Hilmy</p>
            <p style="margin: 5px 0;"><strong>IBAN:</strong> TR00 0000 0000 0000 0000 0000 00</p>
            <p style="margin: 5px 0;"><strong>Description:</strong> ${fullName} - Course Payment</p>
          </div>

          <p>Once the payment is completed, you can reply directly to this email with your transfer receipt attached.</p>
          <p>Best regards,<br/><strong>Indonesian Course Team</strong></p>
        </div>
      `,
    };
  }

  // Default: Turkish Template
  return {
    subject: "Endonezce Kursu - Havale / EFT Ödeme Talimatları",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2>Merhaba ${fullName},</h2>
        <p>Kurs kaydınız için teşekkür ederiz! Ödemenizi tamamlamak için <strong>Havale / EFT</strong> bilgilerimiz aşağıdadır:</p>
        
        <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Banka:</strong> Ziraat Bankası</p>
          <p style="margin: 5px 0;"><strong>Alıcı:</strong> Hilmy</p>
          <p style="margin: 5px 0;"><strong>IBAN:</strong> TR00 0000 0000 0000 0000 0000 00</p>
          <p style="margin: 5px 0;"><strong>Açıklama:</strong> ${fullName} - Kurs Ödemesi</p>
        </div>

        <p>Ödemeyi gerçekleştirdikten sonra dekontunuzu bu e-postaya yanıt vererek gönderebilirsiniz.</p>
        <p>Başarılar dileriz,<br/><strong>Endonezce Kurs Ekibi</strong></p>
      </div>
    `,
  };
}

// 1. Checkout Route
app.post("/api/checkout", async (req, res) => {
  const { firstName, lastName, email, lang } = req.body;

  if (!email || !validator.isEmail(email)) {
    return res.json({ success: false, code: "EMAIL_INVALID" });
  }

  try {
    const { subject, html } = createEmailContent(firstName, lastName, lang);

    await transporter.sendMail({
      from: `"Endonezce Kursu" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: html,
    });

    console.log(
      `[SERVER LOG]: Payment email (${lang || "tr"}) sent to ${email}`,
    );
    return res.json({ success: true, code: "EMAIL_SENT" });
  } catch (error) {
    console.error("[SERVER LOG ERROR]: Dispatch failed ->", error.message);
    return res.json({
      success: false,
      code: "SERVER_ERROR",
      message: error.message,
    });
  }
});

// 2. Resend Route
app.post("/api/resend-email", async (req, res) => {
  const { firstName, lastName, email, lang } = req.body;

  if (!email || !validator.isEmail(email)) {
    return res.json({ success: false, code: "EMAIL_INVALID" });
  }

  try {
    const { subject, html } = createEmailContent(firstName, lastName, lang);
    const resendPrefix = lang === "en" ? "[Resend] " : "[Tekrar] ";

    await transporter.sendMail({
      from: `"Endonezce Kursu" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `${resendPrefix}${subject}`,
      html: html,
    });

    console.log(
      `[SERVER LOG]: Resend payment email (${lang || "tr"}) sent to ${email}`,
    );
    return res.json({ success: true, code: "EMAIL_SENT" });
  } catch (error) {
    console.error("[SERVER LOG ERROR]: Resend failed ->", error.message);
    return res.json({
      success: false,
      code: "SERVER_ERROR",
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
