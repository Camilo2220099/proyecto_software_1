const mongoose = require("mongoose");
const Cart = require("../model/Cart");
const Product = require("../model/Product");

const putProduct = async (req, res) => {
  const { productId } = req.params;
  const { query } = req.query;
  const body = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: true, message: "ID de producto inválido" });
  }

  if (typeof body.amount !== "number" || body.amount < 0) {
    return res.status(400).json({ error: true, message: "Cantidad inválida" });
  }

  const productBuscado = await Cart.findById(productId);
  if (!productBuscado) {
    return res.status(404).json({ error: true, message: "Producto no encontrado en el carrito" });
  }

  if (!query || (query !== "add" && query !== "del")) {
    return res.status(400).json({ error: true, message: "Debes enviar una query válida ('add' o 'del')" });
  }

  try {
    if (query === "add") {
      const newAmount = productBuscado.amount + 1;

      const updatedProduct = await Cart.findByIdAndUpdate(
        productId,
        { amount: newAmount },
        { new: true }
      );

      return res.json({
        mensaje: `El producto: ${updatedProduct.name} fue actualizado`,
        product: updatedProduct,
      });
    }

    if (query === "del") {
      if (productBuscado.amount <= 1) {
        await Cart.findByIdAndDelete(productId);
        await Product.findOneAndUpdate(
          { name: productBuscado.name },
          { inCart: false }
        );

        return res.json({
          mensaje: `El producto ${productBuscado.name} fue eliminado del carrito`,
        });
      } else {
        const newAmount = productBuscado.amount - 1;

        const updatedProduct = await Cart.findByIdAndUpdate(
          productId,
          { amount: newAmount },
          { new: true }
        );

        return res.json({
          mensaje: `El producto: ${updatedProduct.name} fue actualizado`,
          product: updatedProduct,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Error al actualizar el producto" });
  }
};

module.exports = putProduct;