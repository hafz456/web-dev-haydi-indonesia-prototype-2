const express = require("express");
const cors = require("cors");
const validator = require("validator");

const app = express();
const PORT = 3000;

// Middleware to handle JSON and cross-origin requests
app.use(cors());
app.use(express.json());

// Serve your HTML, CSS, JS, and Image files automatically
app.use(express.static(__dirname));

// Checkout Validation Endpoint
app.post("/api/checkout", (req, res) => {
  const { firstName, lastName, email, paymentMethod } = req.body;

  // 1. Check for empty fields
  if (!firstName || !lastName || !email) {
    return res.status(400).json({
      success: false,
      message: "Please fill out all required fields.",
    });
  }

  // 2. Validate Email Syntax
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address.",
    });
  }

  // 3. Success Response
  return res.status(200).json({
    success: true,
    message: "Email validated successfully! Processing order...",
    data: { firstName, lastName, email, paymentMethod },
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
