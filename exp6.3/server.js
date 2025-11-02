const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const transferRoutes = require("./routes/transferRoutes");

const app = express();
app.use(bodyParser.json());

// 🔹 Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/bankDB")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// 🔹 Routes
app.use("/", transferRoutes);

// 🔹 Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
