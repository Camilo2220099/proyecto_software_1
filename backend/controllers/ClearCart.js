const mongoose = require("mongoose");
const Cart = require("../model/Cart");
const Product = require("../model/Product");

const clearCart = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const cartItems = await Cart.find().session(session);

    const productIds = cartItems.map(item => item.productId);
    await Product.updateMany(
      { _id: { $in: productIds } },
      { inCart: false },
      { session }
    );

    await Cart.deleteMany({}, { session });

    await session.commitTransaction();
    session.endSession();

    res.json({
      error: false,
      message: "El carrito ha sido vaciado exitosamente",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error al vaciar el carrito:", error);
    res.status(500).json({
      error: true,
      message: "Error al vaciar el carrito",
    });
  }
};

module.exports = clearCart;