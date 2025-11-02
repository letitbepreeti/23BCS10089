// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Route to insert sample data
router.post("/seed", productController.addSampleProducts);

// Route to get all products
router.get("/", productController.getAllProducts);

// Route to get products by category
router.get("/category/:category", productController.getProductsByCategory);

// Route to get products by color (nested variant field)
router.get("/by-color/:color", productController.getProductsByColor);

module.exports = router;
