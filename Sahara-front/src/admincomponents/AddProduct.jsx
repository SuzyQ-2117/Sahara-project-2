import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import CustomAlert from "../genericcomponents/CustomAlert";
import Modal from "react-modal";
import ProductForm from "./ProductForm";
import useFetchItems from "./FetchItems";

// Set the root element for the modal
Modal.setAppElement("#root");

/**
 * AddProduct component allows the user to add a new product.
 *
 
 */
const AddProduct = ({ onAddProduct }) => {
  // State to manage the form data
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    imageUrl: "",
  });

  // State to manage alert visibility and messages
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(true);

  // Fetch existing products using custom hook
  const { items: existingProducts, error } = useFetchItems();

  /**
   * useEffect hook to handle errors during the fetching of existing products.
   */
  useEffect(() => {
    if (error) {
      setAlertMessage("Failed to fetch existing products.");
      setIsModalVisible(false);
      setShowAlert(true);
    }
  }, [error]);

  
   // Handles the submission of the product form.
   
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (
      !formData.name ||
      !formData.price ||
      !formData.quantity ||
      !formData.imageUrl
    ) {
      setAlertMessage("All fields are required.");
      setIsModalVisible(false);
      setShowAlert(true);
      return;
    }

    // Check if the product already exists
    const productExists = existingProducts.some(
      (p) => p.name.toLowerCase() === formData.name.toLowerCase()
    );

    if (productExists) {
      setAlertMessage(
        "Product already exists. Please enter a different product."
      );
      setIsModalVisible(false);
      setShowAlert(true);
      return;
    }

    try {
      // Post new product data to the server
      const postResponse = await axios.post("http://localhost:8082/item/add", {
        ...formData,
        price: parseFloat(formData.price).toFixed(2),
        quantity: parseInt(formData.quantity, 10),
      });
      const data = postResponse.data;

      // Display success message and reset form
      setAlertMessage(`New Product Added. Your Unique ID is ${data.id}`);
      setShowAlert(true);
      setFormData({
        name: "",
        price: "",
        quantity: "",
        imageUrl: "",
      });
      onAddProduct();
      setIsModalOpen(false);
    } catch (error) {
      // Handle errors during the product addition
      console.error("Error adding product:", error);
      setAlertMessage("Failed to add product.");
      setShowAlert(true);
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
      {/* Button to open the Add Product modal */}
      <button onClick={() => setIsModalOpen(true)} className="addproduct-btn">
        Add Product
      </button>

      {/* Modal for adding a new product */}
      {isModalOpen && isModalVisible && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          shouldCloseOnOverlayClick={false}
          contentLabel="Add Product Modal"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <h2>Add Product</h2>
          <ProductForm
            formData={formData}
            onChange={setFormData}
            onSubmit={handleSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}

      {/* Custom alert component to show success or error messages */}
      {showAlert && <CustomAlert message={alertMessage} onClose={closeAlert} />}
    </div>
  );
};

// Define prop types for validation
AddProduct.propTypes = {
  onAddProduct: PropTypes.func.isRequired,  // `onAddProduct` should be a required function
};

export default AddProduct;
