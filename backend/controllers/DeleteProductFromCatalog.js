const mongoose = require("mongoose");
const Product = require("../model/Product");
const Cart = require("../model/Cart");

const deleteProductFromCatalog = async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({
      error: true,
      message: "ID de producto inválido",
    });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const product = await Product.findById(productId).session(session);
    if (!product) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        error: true,
        message: "Producto no encontrado",
      });
    }

    await Product.findByIdAndDelete(productId).session(session);

    await Cart.findOneAndDelete({ name: product.name }).session(session);

    await session.commitTransaction();
    session.endSession();

    res.json({
      error: false,
      message: `El producto "${product.name}" fue eliminado correctamente`,
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error("Error al eliminar producto con transacción:", error);

    res.status(500).json({
      error: true,
      message: "Error al eliminar el producto del catálogo",
    });
  }
};

module.exports = deleteProductFromCatalog;