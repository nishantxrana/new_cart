import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create a context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalCartValue, setTotalCartValue] = useState(0);

  // loading the cart items form mongoDB as soon as component mounts
  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await axios.get(
          "http://localhost:3005/api/cart/getAll"
        );
        if (response.data) {
          setItems(response.data.items);
          setTotalItemCount(response.data.totalItemCount);
          setTotalCartValue(response.data.totalCartValue);
        }
      } catch (error) {
        console.error("error in fetching cart items in cart context", error);
      }
    }
    fetchCart();
  }, []);

  // checking with useeffect if the fetch function is working
  useEffect(() => {
    console.log("items", items);
    console.log("totalItemCount", totalItemCount);
    console.log("totalCartValue", totalCartValue);
  }, [items, totalItemCount, totalCartValue]);

  const updateTotalCartValue = (items) => {
    const totalValue = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalCartValue(totalValue);
  };

  // const addItemToCart = (id, price) => {
  //   setItems((prevItems) => {
  //     const existingItem = prevItems.find((item) => item.id === id);
  //     let updatedItems;
  //     if (existingItem) {
  //       updatedItems = prevItems.map((item) =>
  //         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  //       );
  //     } else {
  //       updatedItems = [...prevItems, { id, price, quantity: 1 }];
  //     }
  //     updateTotalCartValue(updatedItems);
  //     return updatedItems;
  //   });
  //   setTotalItemCount((prevCount) => prevCount + 1);
  // };
  const addItemToCart = async (id, price) => {
    try {
      const response = await axios.post(
        "http://localhost:3005/api/cart/addItem",
        { id, price }
      );
      setItems(response.data.items);
      setTotalItemCount(response.data.totalItemCount);
      setTotalCartValue(response.data.totalCartValue);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  // const removeItemFromCart = (id) => {
  //   setItems((prevItems) => {
  //     const itemToRemove = prevItems.find((item) => item.id === id);
  //     if (itemToRemove) {
  //       const updatedItems = prevItems.filter((item) => item.id !== id);
  //       setTotalItemCount((prevCount) => prevCount - itemToRemove.quantity);
  //       updateTotalCartValue(updatedItems);
  //       return updatedItems;
  //     }
  //     return prevItems;
  //   });
  // };

  const removeItemFromCart = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:3005/api/cart/removeItem",
        { id }
      );
      setItems(response.data.items);
      setTotalItemCount(response.data.totalItemCount);
      setTotalCartValue(response.data.totalCartValue);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // const reduceItemQuantity = (id) => {
  //   setItems((prevItems) => {
  //     const existingItem = prevItems.find((item) => item.id === id);
  //     if (existingItem && existingItem.quantity > 1) {
  //       const updatedItems = prevItems.map((item) =>
  //         item.id === id ? { ...item, quantity: item.quantity - 1 } : item
  //       );
  //       setTotalItemCount((prevCount) => prevCount - 1);
  //       updateTotalCartValue(updatedItems);
  //       return updatedItems;
  //     }
  //     return prevItems;
  //   });
  // };
  const reduceItemQuantity = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:3005/api/cart/reduceItemQuantity",
        { id }
      );
      setItems(response.data.items);
      setTotalItemCount(response.data.totalItemCount);
      setTotalCartValue(response.data.totalCartValue);
    } catch (error) {
      console.error("Error reducing item quantity:", error);
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
