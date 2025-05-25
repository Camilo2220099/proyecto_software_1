const { model, Schema } = require("mongoose");

const CartSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  img: { type: String, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
});

module.exports = model("Cart", CartSchema);