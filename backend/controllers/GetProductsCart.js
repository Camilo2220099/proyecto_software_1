const Cart = require("../model/Cart");

const getProductsCart = async (req, res) => {
  const productsCart = await Cart.find();

  if (productsCart) {
    res.json({ productsCart });
  } else {
    res.status(404).json({ error: true, message: "No hay productos" });
  }
};

module.exports = getProductsCart;