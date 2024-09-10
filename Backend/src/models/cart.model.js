import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema({
  items: [cartItemSchema],
  totalItemCount: {
    type: Number,
    required: true,
  },
  totalCartValue: {
    type: Number,
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
