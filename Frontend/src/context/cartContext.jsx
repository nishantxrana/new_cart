import React, { createContext, useContext, useEffect, useState } from "react";

// Create a context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalCartValue, setTotalCartValue] = useState(0);

  const updateTotalCartValue = (items) => {
    const totalValue = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalCartValue(totalValue);
  };

  const addItemToCart = (id, price) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);
      let updatedItems;
      if (existingItem) {
        updatedItems = prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedItems = [...prevItems, { id, price, quantity: 1 }];
      }
      updateTotalCartValue(updatedItems);
      return updatedItems;
    });
    setTotalItemCount((prevCount) => prevCount + 1);
  };

  const removeItemFromCart = (id) => {
    setItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === id);
      if (itemToRemove) {
        const updatedItems = prevItems.filter((item) => item.id !== id);
        setTotalItemCount((prevCount) => prevCount - itemToRemove.quantity);
        updateTotalCartValue(updatedItems);
        return updatedItems;
      }
      return prevItems;
    });
  };

  const reduceItemQuantity = (id) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        const updatedItems = prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
        setTotalItemCount((prevCount) => prevCount - 1);
        updateTotalCartValue(updatedItems);
        return updatedItems;
      }
      return prevItems;
    });
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
