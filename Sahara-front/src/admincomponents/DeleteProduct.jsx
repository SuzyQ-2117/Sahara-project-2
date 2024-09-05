import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import CustomAlert from '../genericcomponents/CustomAlert'; 
import '../CSS/Modal.css'; 

// API endpoint for deleting a product
const API_URL = 'http://localhost:8082/item/remove/';


 // DeleteProduct component provides functionality to delete a product by ID.
 

const DeleteProduct = ({ productIdToDelete, onCancel, onConfirm }) => {
    // State to manage confirmation modal visibility
    const [showConfirmation, setShowConfirmation] = useState(false);

    // State to manage alert visibility and messages
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    /**
     * useEffect hook to display the confirmation modal when a product ID is provided.
     */
    useEffect(() => {
        if (productIdToDelete !== null) {
            setShowConfirmation(true);
        }
    }, [productIdToDelete]);

    
     // Handles the confirmation of the product deletion.
     
    const handleConfirm = async () => {
        try {
            // Send a DELETE request to the API to remove the product
            const response = await axios.delete(`${API_URL}${productIdToDelete}`);
            
            // Check response status to set appropriate alert message
            if (response.status === 200) {
                setAlertMessage(`Product with ID ${productIdToDelete} successfully deleted.`);
            } else {
                setAlertMessage(`Failed to delete the product with ID ${productIdToDelete}.`);
            }
        } catch (error) {
            // Handle errors during the deletion process
            setAlertMessage('Error during deletion.');
        } finally {
            // Hide confirmation modal and show alert
            setShowConfirmation(false);
            setShowAlert(true);
        }
    };

    
     // Handles the closing of the alert and triggers the onConfirm callback.
     
    const handleAlertClose = () => {
        setShowAlert(false);
        onConfirm(); 
    };

    return (
        <>
            {/* Modal for confirming the deletion of a product */}
            {showConfirmation && (
                <Modal
                    isOpen={true}
                    onRequestClose={() => {
                        setShowConfirmation(false);
                        onCancel(); 
                    }}
                    contentLabel="Confirmation Dialog"
                    className="modal"
                    overlayClassName="modal-overlay"
                >
                    <h2>Confirmation</h2>
                    <p>Are you sure you want to delete this product?</p>
                    <div className="button-group">
                        <button
                            className="confirm-btn"
                            onClick={handleConfirm}
                        >
                            Confirm
                        </button>
                        <button className="cancel-btn" onClick={() => {
                            setShowConfirmation(false);
                            onCancel(); 
                        }}>Cancel</button>
                    </div>
                </Modal>
            )}
            
            {/* Custom alert component to show success or error messages */}
            {showAlert && (
                <CustomAlert
                    message={alertMessage}
                    onClose={handleAlertClose} 
                />
            )}
        </>
    );
};

export default DeleteProduct;
