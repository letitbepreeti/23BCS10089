// routes/routes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// Public route
router.get("/public", (req, res) => {
  res.status(200).send("This is a public route. No authentication required.");
});

// Protected route
router.get("/protected", auth, (req, res) => {
  res.status(200).send("You have accessed a protected route with a valid token!");
});

module.exports = router;
