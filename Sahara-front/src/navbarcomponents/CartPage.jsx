import '../CSS/CartPage.css';
import React, { useEffect, useState } from 'react';
import { useCart } from '../cartcomponents/CartContext';
import useFetchItems from '../admincomponents/FetchItems';
import CartTable from '../cartcomponents/CartTable';

/**
 * The CartPage component provides an interface for viewing and managing the user's shopping cart.
 * It retrieves cart items from context and displays them in a table format. Users can adjust quantities
 * and remove items from the cart. It also calculates and displays the total cost and service charge.
 * 
 * This component uses hooks to manage state and side effects, and interacts with context and external
 * data fetches to provide a complete cart management experience.
 * 
 */
const CartPage = () => {
    const { cartItems, updateQuantity, removeFromCart, setCartItems } = useCart(); // Access setCartItems from context
    const { items } = useFetchItems();
    const [itemMap, setItemMap] = useState({});

    useEffect(() => {
        const map = items.reduce((acc, item) => {
            acc[item.id] = item.quantity;
            return acc;
        }, {});
        setItemMap(map);
    }, [items]);

    /**
     * Handles the change in quantity for an item.
     * 
     */
    const handleQuantityChange = (id, event) => {
        const quantity = parseInt(event.target.value, 10);
        updateQuantity(id, quantity);
    };

    /**
     * Handles the removal of an item from the cart.
     * 
     */
    const handleRemoveItem = (id) => {
        removeFromCart(id);
    };

    /**
     * Calculates the total cost of items in the cart.
     * 
     */
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    /**
     * Calculates the service charge based on the total cost.
     * 
     */
    const calculateServiceCharge = (total) => {
        return (total * 0.0725).toFixed(2);
    };

    const total = parseFloat(calculateTotal());
    const serviceCharge = calculateServiceCharge(total);

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            <CartTable
                cartItems={cartItems} // Pass cartItems directly from context
                itemMap={itemMap}
                handleQuantityChange={handleQuantityChange}
                handleRemoveItem={handleRemoveItem}
                total={total}
                serviceCharge={serviceCharge}
                // onRetrieve={handleRetrieveCart} 
            />
        </div>
    );
};

export default CartPage;
