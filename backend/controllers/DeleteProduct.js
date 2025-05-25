const Cart = require("../model/Cart");
const Product = require("../model/Product");
const mongoose = require("mongoose");

const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: true, message: "ID de producto inválido" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const productInCart = await Cart.findById(productId).session(session);
    if (!productInCart) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: true, message: "Producto no encontrado en el carrito" });
    }

    const product = await Product.findById(productInCart.productId).session(session);
    if (!product) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: true, message: "Producto no encontrado en el catálogo" });
    }

    await Cart.findByIdAndDelete(productId).session(session);

    await Product.findByIdAndUpdate(
      productInCart.productId,
      { inCart: false },
      { new: true, session }
    );

    await session.commitTransaction();
    session.endSession();

    res.json({
      error: false,
      message: `El producto ${product.name} fue eliminado del carrito`,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    res.status(500).json({ error: true, message: "Error al eliminar el producto del carrito" });
  }
};

module.exports = deleteProduct;