const Product = require("../model/Product");

const getProducts = async (req, res) => {
  const products = await Product.find();

  if (products) {
    res.json({ products });
  } else {
    res.status(404).json({ error: true, message: "No hay productos" });
  }
};

module.exports = getProducts;