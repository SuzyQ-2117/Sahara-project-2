import React from 'react';
import '../CSS/CartItemRow.css';

/**
 * CartItemRow component represents a single row in the cart, displaying details
 * about the item, such as its name, price, and quantity. It also provides controls
 * for adjusting the item's quantity and removing the item from the cart.
 *
 * This component renders a table row (`<tr>`) with several cells (`<td>`),
 * each containing different pieces of information or controls related to the item.
 */
const CartItemRow = ({ item, itemMap, handleQuantityChange, handleRemoveItem }) => (
    <tr>
        <td>{item.name}</td>
        <td>£{item.price.toFixed(2)}</td>
        <td>
            <select
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, e)}
            >
                {Array.from({ length: itemMap[item.id] || 0 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>{num}</option>
                ))}
            </select>
        </td>
        <td>£{(item.price * item.quantity).toFixed(2)}</td>
        <td>
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
        </td>
    </tr>
);

export default CartItemRow;
