const Cart = require("../model/Cart");
const Product = require("../model/Product");

const addProductCart = async (req, res) => {
  const { name, img, price } = req.body;

  const noEstaVacio = name?.trim() && img?.trim() && price > 0;
  if (!noEstaVacio) {
    return res.status(400).json({
      error: true,
      message: "Faltan campos requeridos o son inválidos",
    });
  }

  const estaEnProducts = await Product.findOne({ name });
  if (!estaEnProducts) {
    return res.status(400).json({
      error: true,
      message: "Este producto no se encuentra en nuestra base de datos",
    });
  }

  const estaEnElCarrito = await Cart.findOne({ productId: estaEnProducts._id });
  if (estaEnElCarrito) {
    return res.status(400).json({
      error: true,
      message: "El producto ya está en el carrito",
    });
  }

  try {
    const newProductInCart = new Cart({
      productId: estaEnProducts._id,
      name,
      img,
      price,
      amount: 1,
    });

    await Product.findByIdAndUpdate(
      estaEnProducts._id,
      { inCart: true },
      { new: true }
    );

    await newProductInCart.save();
    res.json({
      error: false,
      message: "El producto fue agregado al carrito",
      product: newProductInCart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error al agregar el producto al carrito",
    });
  }
};

module.exports = addProductCart;