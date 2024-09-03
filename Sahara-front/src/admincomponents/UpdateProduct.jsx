import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import CustomAlert from '../genericcomponents/CustomAlert';
import ProductForm from './ProductForm';
import useFetchItems from './FetchItems';
import axios from 'axios';
import '../CSS/Modal.css';

Modal.setAppElement('#root');

/**
 * UpdateProduct component allows the user to update the details of an existing product.
 * 
 * This component uses a modal to present a form where the user can update the product details.
 * It checks for duplicate product names and displays alerts based on success or failure of the update operation.
 * 
 */
const UpdateProduct = ({ product, onCancel, onUpdateSuccess }) => {
  
  /**
   * State to manage the form data, initialized with the product prop.
  */
  const [formData, setFormData] = useState({ ...product });

  /**
   * State to manage the visibility of the custom alert.
  */
  const [showAlert, setShowAlert] = useState(false);

  /**
   * State to manage the alert message content.
  
   */
  const [alertMessage, setAlertMessage] = useState('');

  /**
   * State to control the visibility of the modal.
   */
  const [isModalVisible, setIsModalVisible] = useState(true);

  /**
   * Custom hook to fetch existing products from the API.
   * Destructures the items (products) and any error that occurs during fetch.
   */
  const { items: existingProducts, error } = useFetchItems();

  /**
   * Effect to reset the form data whenever the product prop changes.
   */
  useEffect(() => {
    setFormData({ ...product });
  }, [product]);

  /**
   * Handles the form submission for updating the product.
   * Validates for duplicate product names and attempts to update the product via an API call.
   * 
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (error) {
      setAlertMessage('Error loading existing products. Please try again later.');
      setShowAlert(true);
      setIsModalVisible(false); 
      return;
    }

    // Check if the product name already exists in other products
    const productNameExists = existingProducts.some(p => 
      p.name.toLowerCase() === formData.name.toLowerCase() && p.id !== formData.id
    );
    
    if (productNameExists) {
      setAlertMessage('Product name already exists. Please choose a different name.');
      setShowAlert(true);
      setIsModalVisible(false); 
      return;
    }
    
    // Attempt to update the product via API call
    try {
      const response = await axios.patch(`http://localhost:8082/item/update/${formData.id}`, formData);
      if (response.status === 200) {
        setAlertMessage('Product successfully updated.');
        setShowAlert(true);
        setIsModalVisible(false);
        onUpdateSuccess(formData);
      } else {
        setAlertMessage('Failed to update product.');
        setShowAlert(true);
        setIsModalVisible(false); 
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setAlertMessage('Failed to update product.');
      setShowAlert(true);
      setIsModalVisible(false);
    }
  };

  /**
   * Closes the alert and reopens the modal.
   */
  const closeAlert = () => {
    setShowAlert(false);
    setIsModalVisible(true); 
  };

  return (
    <div>
      {isModalVisible && (
        <Modal
          isOpen={true}
          onRequestClose={onCancel}
          contentLabel="Update Product Modal"
          shouldCloseOnOverlayClick={false}
          className="modal"
          overlayClassName="modal-overlay"
        >
          <h2>Update Product {formData.id}</h2>
          <ProductForm
            formData={formData}
            onChange={setFormData}
            onSubmit={handleSubmit}
            onCancel={onCancel}
            isUpdateMode={true}
          />
        </Modal>
      )}

      {showAlert && (
        <CustomAlert
          message={alertMessage}
          onClose={closeAlert}
        />
      )}
    </div>
  );
};

export default UpdateProduct;
