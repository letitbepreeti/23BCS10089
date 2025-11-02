const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bankingRoutes = require("./routes/banking");

const app = express();
app.use(bodyParser.json());

const SECRET_KEY = "mysecretkey"; // used for signing JWT

// Hardcoded user credentials
const user = {
  username: "user1",
  password: "password123"
};

// ------------------ LOGIN ROUTE ------------------
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Simple authentication check
  if (username === user.username && password === user.password) {
    // Create a token valid for 1 hour
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// ------------------ PROTECTED ROUTES ------------------
app.use("/", bankingRoutes);

app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
