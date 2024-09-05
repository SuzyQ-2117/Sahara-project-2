import '../CSS/CustomAlert.css';
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Displays a custom alert message with a close button.
 * 
 * This component renders an alert with a message and a button that, when clicked,
 * triggers a function to close or dismiss the alert.
 * 
 * The `message` prop is used to display the content of the alert, and the `onClose`
 * prop is a function that is called when the user clicks the "Close" button.
 * 
 */
const CustomAlert = ({ message, onClose }) => {
    return (
        <div className="custom-alert">
            <p>{message}</p>
            <button
                onClick={onClose}
                type="button"
                className="custom-alert-button"
            >
                Close
            </button>
        </div>
    );
};

// Define prop types for validation
CustomAlert.propTypes = {
    message: PropTypes.string.isRequired,  // `message` should be a required string
    onClose: PropTypes.func.isRequired    // `onClose` should be a required function
};

export default CustomAlert;
