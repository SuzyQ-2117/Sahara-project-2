import React, { createContext, useContext, useState } from "react";

// Create a context for managing the shopping cart state
const CartContext = createContext();

/**
 * CartProvider component manages the state and logic for the shopping cart.
 * It provides context to its child components, allowing them to interact with
 * the cart's state (e.g., adding items, updating quantities, removing items).
 *
 * This component is intended to wrap around any components that need access
 * to the cart's state.
 */
export const CartProvider = ({ children }) => {
  // State to store the items in the cart
  const [cartItems, setCartItems] = useState([]);
  
  // State to manage any new cart created
  const [newCart, setNewCart] = useState(null);

  /**
   * Adds an item to the cart. If the item already exists in the cart, it updates the quantity.
   * The item includes an id and quantity.
   */
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prevItems, item];
    });
  };

  /**
   * Updates the quantity of a specific item in the cart.
   * The item is identified by its id and the quantity is updated to the new value.
   */
  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  /**
   * Removes an item from the cart using its ID.
   */
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  /**
   * Clears the cart by resetting the cart items and any new cart.
   */
  const clearCart = () => {
    setCartItems([]);
    setNewCart(null);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        newCart,
        setNewCart,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/**
 * Custom hook to access the cart context.
 * Provides access to cart items and actions like adding, updating, and removing items.
 */
export const useCart = () => useContext(CartContext);
