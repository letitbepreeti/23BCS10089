// script.js
const products = [
  { name: "T-Shirt", category: "Clothing" },
  { name: "Jeans", category: "Clothing" },
  { name: "Headphones", category: "Electronics" },
  { name: "Smartphone", category: "Electronics" },
  { name: "Novel", category: "Books" },
  { name: "Cookbook", category: "Books" },
];

const categoryFilter = document.getElementById("categoryFilter");
const productList = document.getElementById("productList");

function renderProducts(filterCategory) {
  productList.innerHTML = ""; // Clear the list

  const filteredProducts = filterCategory === "All"
    ? products
    : products.filter(product => product.category === filterCategory);

  filteredProducts.forEach(product => {
    const item = document.createElement("div");
    item.className = "product-item";
    item.textContent = product.name;
    productList.appendChild(item);
  });
}

// Initial render
renderProducts("All");

// Listen for dropdown changes
categoryFilter.addEventListener("change", function () {
  renderProducts(this.value);
});
