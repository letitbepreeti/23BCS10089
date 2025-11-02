const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

let balance = 1000; // initial balance for demo

// ------------------ BALANCE ROUTE ------------------
router.get("/balance", verifyToken, (req, res) => {
  res.json({ balance });
});

// ------------------ DEPOSIT ROUTE ------------------
router.post("/deposit", verifyToken, (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Deposit amount must be positive" });
  }

  balance += amount;
  res.json({
    message: `Deposited ₹${amount} successfully.`,
    newBalance: balance
  });
});

// ------------------ WITHDRAW ROUTE ------------------
router.post("/withdraw", verifyToken, (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Withdrawal amount must be positive" });
  }

  if (amount > balance) {
    return res.status(400).json({ message: "Insufficient balance" });
  }

  balance -= amount;
  res.json({
    message: `Withdrew ₹${amount} successfully.`,
    newBalance: balance
  });
});

module.exports = router;
