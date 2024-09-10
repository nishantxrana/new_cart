import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create a context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalCartValue, setTotalCartValue] = useState(0);

  // Function to fetch cart data from the backend
  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:3005/api/cart/getAll");
      if (response.data) {
        setItems(response.data.items);
        setTotalItemCount(response.data.totalItemCount);
        setTotalCartValue(response.data.totalCartValue);
      }
    } catch (error) {
      console.error("Error in fetching cart items in cart context", error);
    }
  };

  // Load cart data from MongoDB as soon as the component mounts
  useEffect(() => {
    fetchCart();
  }, []);

  const updateTotalCartValue = (items) => {
    const totalValue = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalCartValue(totalValue);
  };

  const addItemToCart = async (id, price) => {
    const existingItem = items.find((item) => item.id === id);
    let updatedItems;
    if (existingItem) {
      updatedItems = items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedItems = [...items, { id, price, quantity: 1 }];
    }
    setItems(updatedItems);
    setTotalItemCount((prevCount) => prevCount + 1);
    updateTotalCartValue(updatedItems);

    try {
      await axios.post("http://localhost:3005/api/cart/addItem", { id, price });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      // Revert state if the request fails
      setItems(items);
      setTotalItemCount((prevCount) => prevCount - 1);
      updateTotalCartValue(items);
    }
  };

  const removeItemFromCart = async (id) => {
    const itemToRemove = items.find((item) => item.id === id);
    if (itemToRemove) {
      const updatedItems = items.filter((item) => item.id !== id);
      setItems(updatedItems);
      setTotalItemCount((prevCount) => prevCount - itemToRemove.quantity);
      updateTotalCartValue(updatedItems);

      try {
        await axios.post("http://localhost:3005/api/cart/removeItem", { id });
      } catch (error) {
        console.error("Error removing item from cart:", error);
        setItems(items);
        setTotalItemCount((prevCount) => prevCount + itemToRemove.quantity);
        updateTotalCartValue(items);
      }
    }
  };

  const reduceItemQuantity = async (id) => {
    const existingItem = items.find((item) => item.id === id);
    if (existingItem && existingItem.quantity > 1) {
      const updatedItems = items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setItems(updatedItems);
      setTotalItemCount((prevCount) => prevCount - 1);
      updateTotalCartValue(updatedItems);

      try {
        await axios.post("http://localhost:3005/api/cart/reduceItemQuantity", { id });
      } catch (error) {
        console.error("Error reducing item quantity:", error);
        setItems(items);
        setTotalItemCount((prevCount) => prevCount + 1);
        updateTotalCartValue(items);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalItemCount,
        totalCartValue,
        addItemToCart,
        removeItemFromCart,
        reduceItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};