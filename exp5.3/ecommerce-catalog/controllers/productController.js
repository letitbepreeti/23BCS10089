// controllers/productController.js
const Product = require("../models/Product");

// ✅ Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving products", error: err });
  }
};

// ✅ Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving category", error: err });
  }
};

// ✅ Get products by color (search inside variants)
exports.getProductsByColor = async (req, res) => {
  try {
    const color = req.params.color;
    const products = await Product.find({ "variants.color": color });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving by color", error: err });
  }
};

// ✅ Insert sample products
exports.addSampleProducts = async (req, res) => {
  try {
    const sampleProducts = [
      {
        name: "Smartphone",
        price: 699,
        category: "Electronics",
        variants: [],
      },
      {
        name: "Winter Jacket",
        price: 200,
        category: "Apparel",
        variants: [
          { color: "Black", size: "S", stock: 8 },
          { color: "Gray", size: "M", stock: 12 },
          { color: "Blue", size: "L", stock: 5 },
        ],
      },
    ];

    await Product.insertMany(sampleProducts);
    res.status(201).json({ message: "Sample products inserted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error inserting sample data", error: err });
  }
};
