import React, { createContext, useContext, useEffect, useState } from "react";

// Create a context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [totalItemCount, setTotalItemCount] = useState(0);
  

  
  const addItemToCart = (id) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { id, quantity: 1 }];
      }
    });
    setTotalItemCount((prevCount) => prevCount + 1);
  };

  const removeItemFromCart = (id) => {
    setItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === id);
      if (itemToRemove) {
        setTotalItemCount((prevCount) => prevCount - itemToRemove.quantity);
        return prevItems.filter((item) => item.id !== id);
      }
      return prevItems;
    });
  };

  const reduceItemQuantity = (id) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prevItems;
    });
    setTotalItemCount((prevCount) => prevCount - 1);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalItemCount,
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
