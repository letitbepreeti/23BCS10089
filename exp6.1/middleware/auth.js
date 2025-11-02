// middleware/auth.js
module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing or incorrect" });
  }

  const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

  if (token !== "mysecrettoken") {
    return res.status(403).json({ message: "Invalid token" });
  }

  // Token verified
  next();
};
