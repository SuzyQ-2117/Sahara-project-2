import React, { useState, useEffect } from 'react';
import useFetchItems from '../admincomponents/FetchItems';
import AddProduct from '../admincomponents/AddProduct';
import UpdateProduct from '../admincomponents/UpdateProduct';
import ProductListTable from '../admincomponents/ProductListTable';
import DeleteProduct from '../admincomponents/DeleteProduct'; 
import '../CSS/AdminPage.css'; 
import '../CSS/Modal.css';

/**
 * The AdminPage component provides an interface for managing products. 
 * It includes functionalities for adding, updating, and deleting products,
 * and displays a list of products in a table format..
 * 
 * It uses custom hooks and components to fetch products, handle updates,
 * and manage modals for deleting and updating products.
 * 
 * This component manages internal state for product updates, deletions,
 * and sorting configurations. It also handles error states during product fetches...
 * 
 */
const AdminPage = () => {
    const { items: products, error, refetch } = useFetchItems();
    const [productToUpdate, setProductToUpdate] = useState(null);
    const [showUpdateDialogue, setShowUpdateDialogue] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

    /**
     * Handles the sorting of products by updating the sort configuration.
     * Toggles between ascending and descending order based on current state.
     * 
     */
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    useEffect(() => {
        refetch();
    }, []);

    // If there's an error fetching products, display an error message
    if (error) return <div>Error loading products: {error.message}</div>;

    return (
        <div>
            <div className="container2">               
                <AddProduct onAddProduct={refetch} /> 
            </div>
            <div className="table-wrapper">
                <ProductListTable
                    products={products}
                    onUpdate={(product) => {
                        setProductToUpdate(product);
                        setShowUpdateDialogue(true);
                    }}
                    onDelete={(id) => setProductIdToDelete(id)} // Set ID to delete
                    onRequestSort={requestSort}
                    sortConfig={sortConfig}
                />
            </div>
            {productIdToDelete !== null && (
                <DeleteProduct
                    productIdToDelete={productIdToDelete}
                    onCancel={() => setProductIdToDelete(null)} // Clear the ID
                    onConfirm={() => {
                        refetch(); // Refresh the products list
                        setProductIdToDelete(null); // Clear the product ID
                    }}
                />
            )}
            {showUpdateDialogue && productToUpdate && (
                <UpdateProduct
                    product={productToUpdate}
                    onCancel={() => setShowUpdateDialogue(false)}
                    onUpdateSuccess={() => {
                        refetch(); // Refresh the products list
                        setShowUpdateDialogue(false);
                        setProductToUpdate(null);
                    }}
                />
            )}
        </div>
    );
};

export default AdminPage;
