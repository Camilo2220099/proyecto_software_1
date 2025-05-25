const mongoose = require("mongoose");
const getProducts = require("./GetProducts");
const getProductsCart = require("./GetProductsCart");
const addProductCart = require("./AddProductCart");
const putProduct = require("./PutProduct");
const deleteProduct = require("./DeleteProduct");
const addProduct = require("./AddProduct");
const updateProduct = require("./UpdateProduct");
const deleteProductFromCatalog = require("./DeleteProductFromCatalog");
const clearCart = require("./ClearCart");
const validateToken = require("./ValidateToken");

module.exports = {
  getProducts,
  getProductsCart,
  addProductCart,
  putProduct,
  deleteProduct,
  addProduct,
  updateProduct,
  deleteProductFromCatalog,
  clearCart,
  validateToken,
};