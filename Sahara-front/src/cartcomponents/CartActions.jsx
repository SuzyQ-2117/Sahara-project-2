// import React, { useState } from "react";
import SaveCartButton from "./SaveCartButton";
import CheckoutButton from "./CheckoutButton";
import RetrieveCart from "./RetrieveCart";
import "../CSS/CartActions.css";

/**
 * CartActions component provides a set of actions related to the shopping cart,
 * including saving the cart, checking out, and retrieving a saved cart.
 *
 * This component contains buttons for saving the cart and proceeding to checkout,
 * as well as a retrieval option for loading a previously saved cart.
 *
 * Props:
 * - `onRetrieve`: A callback function that is triggered when the user attempts to retrieve a saved cart.
 */
const CartActions = ({ onRetrieve }) => {
  return (
    <>
      {/* Container for the Save Cart and Checkout buttons */}
      <div className="button-container">
        <SaveCartButton className="save-cart-btn" />
        <CheckoutButton className="checkout-btn" />
      </div>

      {/* Container for the Retrieve Cart functionality */}
      <div className="retrieve-cart">
        <RetrieveCart onRetrieve={onRetrieve} />
      </div>
    </>
  );
};

export default CartActions;
