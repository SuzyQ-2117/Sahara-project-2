import React, { useState } from 'react';
import axios from 'axios';
import CustomAlert from '../genericcomponents/CustomAlert';
import { useCart } from '../cartcomponents/CartContext';

/**
 * RetrieveCart component allows users to retrieve a cart from the server using a cart ID.
 * 
 * The component includes:
 * - An input field for entering the cart ID.
 * - A button to initiate the retrieval of the cart.
 * - An alert mechanism to display success or error messages based on the retrieval operation.
 * 
 * When the "Retrieve Cart" button is clicked, the component sends a GET request to the server
 * to fetch the cart data associated with the provided cart ID. If successful, it updates
 * the cart context with the retrieved items and displays a success message. If the retrieval fails,
 * it displays an error message.
 * 
 * The `useCart` hook is used to access and update the cart context.
 */
const RetrieveCart = () => {
    const { setCartItems, setNewCart } = useCart();
    const [cartId, setCartId] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    
    /**
     * Handles the retrieval of the cart by sending a GET request to the server.
     * On successful retrieval, updates the cart context and displays a success message.
     * On failure, displays an error message.
     */
    const handleRetrieve = async () => {
        try {
            console.log(`http://localhost:8083/cart/${cartId}`)
            const response = await axios.get(`http://localhost:8083/cart/${cartId}`);
            if (response.status === 200) {
                console.log(`Cart retrieved. Cart id: ${cartId}`);
                setNewCart(cartId);
                setCartItems(response.data);
                setAlertMessage('Cart successfully retrieved.');
            } else {
                setAlertMessage('Failed to retrieve cart.');
            }
        } catch (error) {
            console.error('Error retrieving cart:', error);
            setAlertMessage('Failed to retrieve cart.');
        }
        setShowAlert(true);
    };

    /**
     * Closes the alert message.
     */
    const closeAlert = () => {
        setShowAlert(false);
    };

    return (
        <div className="retrieve-cart">
            <input
                type="text"
                placeholder="Enter Cart ID"
                value={cartId}
                onChange={(e) => {
                    setCartId(e.target.value);
                    console.log(`Cart ID set to: ${e.target.value}`);
                }}
            />
            <button className="retrieve-cart-btn" onClick={handleRetrieve}>Retrieve Cart</button>
            {showAlert && <CustomAlert message={alertMessage} onClose={closeAlert} />}
        </div>
    );
};

export default RetrieveCart;
