import React from 'react';
import '../CSS/CartSummary.css';

/**
 * CartSummary component displays a summary of the cart's financials,
 * including the subtotal, service charge, and the total amount to be paid.
 * 
 * This component renders three table rows (`<tr>`), each showing a different 
 * aspect of the cart summary: the subtotal, the service charge, and the final total.
 */
const CartSummary = ({ total, serviceCharge }) => (
    <>
        <tr>
            <td colSpan="3">Subtotal</td>
            <td>£{total}</td>
            <td></td>
        </tr>
        <tr>
            <td colSpan="3">Service Charge (7.25%)</td>
            <td>£{serviceCharge}</td>
            <td></td>
        </tr>
        <tr>
            <td colSpan="3">Total</td>
            <td>£{(total + parseFloat(serviceCharge)).toFixed(2)}</td>
            <td></td>
        </tr>
    </>
);

export default CartSummary;
