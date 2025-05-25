const Product = require("../model/Product");
const Cart = require("../model/Cart");
const mongoose = require("mongoose");
const validator = require("validator");

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { name, img, price } = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: true, message: "ID de producto inválido" });
  }

  const numericPrice = Number(price);
  if (
    !name?.trim() ||
    !validator.isURL(img) ||
    isNaN(numericPrice) ||
    typeof price === "boolean" ||
    numericPrice <= 0
  ) {
    return res.status(400).json({
      error: true,
      message: "Campos inválidos, posible precio negativo o URL inválida.",
    });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const originalProduct = await Product.findById(productId).session(session);
    if (!originalProduct) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: true, message: "Producto no encontrado" });
    }

    const cartProduct = await Cart.findOne({ productId }).session(session);
    const updateData = { name, img, price: numericPrice, inCart: !!cartProduct };

    const product = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
      session,
    });

    if (cartProduct) {
      await Cart.findOneAndUpdate(
        { productId },
        { name, img, price: numericPrice },
        { new: true, session }
      );
    }

    await session.commitTransaction();
    session.endSession();

    res.json({
      error: false,
      message: "Producto actualizado exitosamente",
      product,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    res.status(500).json({ error: true, message: "Error al actualizar el producto" });
  }
};

module.exports = updateProduct;