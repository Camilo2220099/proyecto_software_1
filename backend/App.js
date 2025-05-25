const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const db = require("./database");
const controllers = require("./controllers");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

/* GET */
app.get("/products", controllers.getProducts);
app.get("/products-cart", controllers.getProductsCart);

/* POST */
app.post("/products", controllers.addProduct);
app.post("/products-cart", controllers.addProductCart);
app.post("/auth/validate-token", controllers.validateToken);

/* PUT */
app.put("/products/:productId", controllers.updateProduct);
app.put("/products-cart/:productId", controllers.putProduct);

/* DELETE */
app.delete("/products/:productId", controllers.deleteProductFromCatalog);
app.delete("/products-cart/:productId", controllers.deleteProduct);
app.delete("/cart", controllers.clearCart);

app.listen(4000, () => {
  console.log("Server funcionando en el puerto 4000");
  db();
});

module.exports = app;