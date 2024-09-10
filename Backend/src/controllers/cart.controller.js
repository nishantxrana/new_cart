import Cart from "../models/cart.model.js";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addToCart = async (req, res) => {
  const { id, price } = req.body;
  try {
    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart({ items: [], totalItemCount: 0, totalCartValue: 0 });
    }
    const exsistingItem = cart.items.find((item) => item.id === id);
    if (exsistingItem) {
      exsistingItem.quantity += 1;
    } else {
      cart.items.push({ id, price, quantity: 1 });
    }
    cart.totalItemCount += 1;
    cart.totalCartValue += price;
    let savedCart = await cart.save();
    if (savedCart) {
      return res.status(201).json({
        message: "Item added to cart successfully",
        cart: savedCart,
      });
    } else {
      return res.status(500).json({ message: "Failed to add item to cart" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  const { id } = req.body;
  try {
    let cart = await Cart.findOne();
    const existingItem = cart.items.find((item) => item.id === id);
    if (existingItem) {
      cart.totalItemCount -= existingItem.quantity;
      cart.totalCartValue -= existingItem.price * existingItem.quantity;
      cart.items = cart.items.filter((item) => item.id !== id);
      let savedCart = await cart.save();
      if (savedCart) {
        return res.status(200).json({
          message: "Item removed from cart successfully",
          cart: savedCart,
        });
      } else {
        return res.status(500).json({
          message: "Failed to remove item from cart",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// quantity reduce function that will reduce the quantity of the item until there is 1 item left after that acc to
//require ment it will not delet the value

export const reduceItemQuantity = async (req, res) => {
  const { id } = req.body;
  try {
    let cart = await Cart.findOne();
    const existingItem = cart.items.find((item) => item.id === id);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        cart.totalItemCount -= 1;
        cart.totalCartValue -= existingItem.price;
      }
      let savedCart = await cart.save();
      if (savedCart) {
        return res.status(200).json({
          message: "Item quantity reduced successfully",
          cart: savedCart,
        });
      } else {
        return res.status(500).json({
          message: "Failed to reduce item quantity",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
