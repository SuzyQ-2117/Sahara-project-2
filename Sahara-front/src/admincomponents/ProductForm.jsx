import React from 'react';

/**
 * ProductForm component renders a form for creating or updating a product.
 * 
 * This component provides input fields for the product's name, price, quantity, 
 * and image URL. It includes validation for price and quantity fields, and 
 * supports both creation and update modes.
 * 
 */
const ProductForm = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  isUpdateMode = false
}) => {
  /**
   * Handles changes to the price input field, allowing only valid currency values.
   * Updates the form data state with the new price value.
   * 
   */
  const handlePriceChange = (e) => {
    let value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      onChange({ ...formData, price: value });
    }
  };

  /**
   * Handles changes to the quantity input field, allowing only numeric values.
   * Updates the form data state with the new quantity value.
   * 
   */
  const handleQuantityChange = (e) => {
    let value = e.target.value;
    if (/^\d*$/.test(value)) {
      onChange({ ...formData, quantity: value });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {/* Input field for the product name */}
      <div className="form-group">
        <label className="label1">Name:</label>
        <input
          className="input1"
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => onChange({ ...formData, name: e.target.value })}
          required
        />
      </div>

      {/* Input field for the product price with validation */}
      <div className="form-group">
        <label className="label1">Price:</label>
        <input
          className="input1"
          type="text"
          step="0.01"
          name="price"
          value={formData.price}
          onChange={handlePriceChange}
          onBlur={() => onChange({ ...formData, price: parseFloat(formData.price).toFixed(2) })}
          required
        />
      </div>

      {/* Input field for the product quantity with validation */}
      <div className="form-group">
        <label className="label1">Quantity:</label>
        <input
          className="input1"
          type="text" 
          name="quantity"
          value={formData.quantity}
          onChange={handleQuantityChange}
          required
        />
      </div>

      {/* Input field for the product image URL */}
      <div className="form-group">
        <label className="label1">Image URL:</label>
        <input
          className="input1"
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={(e) => onChange({ ...formData, imageUrl: e.target.value })}
          required
        />
      </div>

      {/* Button group for submitting or canceling the form */}
      <div className="button-group">
        <button className="add-btn" type="submit">
          {isUpdateMode ? 'Update' : 'Submit'}
        </button>
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
