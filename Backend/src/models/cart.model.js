import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const cartSchema = new mongoose.Schema({
  items: [cartItemSchema],
  totalItemCount: {
    type: Number,
    required: true,
    min: 0,
  },
  totalCartValue: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
