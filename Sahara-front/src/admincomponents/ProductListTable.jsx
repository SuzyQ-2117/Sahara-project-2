import React, { useState } from 'react';

/**
 * ProductListTable component renders a table of products with options to sort,
 * update, or delete each product.
 * 
 * This component allows sorting by product ID, name, price, and quantity.
 * It also provides buttons to trigger update or delete actions for each product.
 * 
 */
const ProductListTable = ({ products, onUpdate, onDelete }) => {

    /**
     * State to manage sorting configuration, including the key to sort by and the sort direction.
     */
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'descending' });

    /**
     * Sorts the products array based on the current sort configuration.
     * Creates a new sorted array without mutating the original products array.
     * 
     */
    const sortedProducts = [...products].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    /**
     * Handles the sorting request when a table header is clicked.
     * Toggles the sort direction if the same header is clicked consecutively.
     * 
     */
    const onRequestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th onClick={() => onRequestSort('id')}>Product ID</th>
                        <th onClick={() => onRequestSort('name')}>Product Name</th>
                        <th onClick={() => onRequestSort('price')}>Price</th>
                        <th onClick={() => onRequestSort('quantity')}>Quantity</th>
                        <th>Image</th>
                        <th>Update Product</th>
                        <th>Delete Product</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>£{product.price.toFixed(2)}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                />
                            </td>
                            <td>
                                <button className="update-btn" onClick={() => onUpdate(product)}>Update</button>
                            </td>
                            <td>
                                <button className="delete-btn" onClick={() => onDelete(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductListTable;
