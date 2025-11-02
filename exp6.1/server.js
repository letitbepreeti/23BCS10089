// server.js
const express = require("express");
const app = express();

const logger = require("./middleware/logger");
const routes = require("./routes/routes");

// Apply JSON parsing and logger middleware globally
app.use(express.json());
app.use(logger);

// Mount routes
app.use("/", routes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
