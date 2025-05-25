const validator = require("validator");
const Product = require("../model/Product");

const addProduct = async (req, res) => {
  let { name, img, price } = req.body;

  const numericPrice = Number(price);

  if (
    !name ||
    !validator.isURL(img) ||
    isNaN(numericPrice) ||
    typeof price === "boolean" ||
    numericPrice <= 0
  ) {
    return res.status(400).json({ error: true, message: "Campos inválidos, posible precio negativo." });
  }

  const existingProduct = await Product.findOne({ name });
  if (existingProduct) {
    return res.status(400).json({ error: true, message: "El producto ya existe" });
  }

  try {
    const newProduct = new Product({
      name,
      img,
      price: numericPrice,
      inCart: false,
    });

    await newProduct.save();
    res.status(201).json({
      error: false,
      message: "Producto creado exitosamente",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Error al crear el producto" });
  }
};

module.exports = addProduct;
