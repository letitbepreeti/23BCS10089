const express = require("express");
const router = express.Router();


// ---------------------- CREATE SAMPLE USERS ----------------------
router.post("/create-users", async (req, res) => {
  try {
    await User.deleteMany({}); // Clear old data
    const users = await User.insertMany([
      { name: "Alice", balance: 1000 },
      { name: "Bob", balance: 500 }
    ]);

    res.status(201).json({ message: "Users created", users });
  } catch (error) {
    res.status(500).json({ message: "Error creating users", error });
  }
});

// ---------------------- TRANSFER MONEY ----------------------
router.post("/transfer", async (req, res) => {
  try {
    const { from, to, amount } = req.body;

    if (!from || !to || !amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid transfer details" });
    }

    const sender = await User.findOne({ name: from });
    const receiver = await User.findOne({ name: to });

    if (!sender) return res.status(404).json({ message: "Sender not found" });
    if (!receiver) return res.status(404).json({ message: "Receiver not found" });

    if (sender.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Sequential updates (no transactions)
    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    res.status(200).json({
      message: `₹${amount} transferred from ${from} to ${to} successfully.`,
      sender: { name: sender.name, balance: sender.balance },
      receiver: { name: receiver.name, balance: receiver.balance }
    });

  } catch (error) {
    res.status(500).json({ message: "Transfer failed", error });
  }
});

// ---------------------- VIEW USERS ----------------------
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

module.exports = router;
