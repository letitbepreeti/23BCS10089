// models/Product.js
const mongoose = require("mongoose");

// Subdocument Schema for product variants
const variantSchema = new mongoose.Schema({
  color: { type: String, required: true },
  size: { type: String, required: true },
  stock: { type: Number, required: true },
});

// Main Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  variants: [variantSchema], // array of nested documents
});

module.exports = mongoose.model("Product", productSchema);
