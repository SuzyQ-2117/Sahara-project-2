import React, { useState } from 'react';
import axios from 'axios';
import CustomAlert from '../genericcomponents/CustomAlert';
import { useCart } from '../cartcomponents/CartContext';

/**
 * SaveCartButton component allows users to save the current cart to the server.
 * 
 * This component handles:
 * - Sending the cart items to the server via a POST request to save them.
 * - Displaying an alert message upon successful or failed save operation.
 * - Clearing the cart items after the save operation is complete.
 * 
 * The component uses the `useCart` hook to access and manipulate the cart context,
 * including retrieving the current cart items and clearing the cart.
 */
function SaveCartButton() {
    const { cartItems, newCart, setNewCart, clearCart } = useCart();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    /**
     * Handles the saving of the current cart by sending a POST request to the server.
     * On successful save, updates the alert message with the order ID and clears the cart.
     * On failure, sets an error message to be displayed.
     */
    const handleSaveCart = async () => {
        try {
            const response = await axios.post('http://localhost:8083/cart/add', cartItems, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 201) {
                const orderId = response.data;  
                console.log(orderId);
                setAlertMessage(`Cart successfully saved. Your order ID is ${orderId}.`);
                
                setNewCart(orderId);
            } else {
                setAlertMessage('Failed to save cart.');
            }
        } catch (error) {
            console.error('Error saving cart:', error);
            setAlertMessage('Failed to save cart.');
        }
        setShowAlert(true);
        clearCart();
    };

    /**
     * Closes the alert message.
     */
    const closeAlert = () => {
        setShowAlert(false);
    };

    return (
        <div>
            <button className="save-cart-btn" onClick={handleSaveCart}>Save Cart</button>
            {showAlert && <CustomAlert message={alertMessage} onClose={closeAlert} />}
        </div>
    );
};

export default SaveCartButton;
