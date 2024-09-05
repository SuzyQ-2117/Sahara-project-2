import React, { useEffect } from 'react';
import CartItemRow from './CartItemRow';
import CartSummary from './CartSummary';
import CartActions from '../cartcomponents/CartActions';
import '../CSS/CartTable.css';
import { useCart } from './CartContext';

/**
 * CartTable component displays the cart items in a table format, including a summary
 * of the cart's financials and actions for managing the cart.
 * 
 * The table consists of a header (`<thead>`) that labels each column, a body (`<tbody>`) 
 * that lists each item in the cart with options to change quantity or remove the item, 
 * and a footer (`<tfoot>`) that includes the cart summary and actions such as retrieving 
 * the cart and proceeding to checkout.
 * 
 * The `useCart` hook is used to access the current list of cart items.
 */
const CartTable = ({ itemMap, handleQuantityChange, handleRemoveItem, total, serviceCharge, onRetrieve }) => {
    const { cartItems } = useCart();

    useEffect(() => {
        // Empty effect, placeholder for future side-effects if needed
    }, [cartItems]); 

    return (
        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {cartItems.map((item) => (
                    <CartItemRow
                        key={item.id}
                        item={item}
                        itemMap={itemMap}
                        handleQuantityChange={handleQuantityChange}
                        handleRemoveItem={handleRemoveItem}
                    />
                ))}
            </tbody>
            <tfoot>
                <CartSummary total={total} serviceCharge={serviceCharge} />
                <tr>
                    <td colSpan="5">
                        <CartActions onRetrieve={onRetrieve} />
                    </td>
                </tr>
            </tfoot>
        </table>
    );
};

export default CartTable;
