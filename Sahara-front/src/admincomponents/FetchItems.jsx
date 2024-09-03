import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8082/items/getAll';

/**
 * Custom React hook to fetch a list of items from an API.
 *
 * This hook handles the process of fetching data from a specified API endpoint,
 * managing the state of the fetched items, and handling any errors that occur
 * during the fetch operation. It also provides a way to manually refetch the data.
 *
 */
const useFetchItems = () => {
    // State to store the fetched items
    const [items, setItems] = useState([]);

    // State to store any errors that occur during the fetch operation
    const [error, setError] = useState(null);

    /**
     * Function to fetch items from the API.
     * 
     * This function is memoized using `useCallback` to prevent unnecessary
     * re-creations of the function on every render. It makes an HTTP GET request
     * to the specified API URL and updates the state with the fetched data or
     * an error if the request fails.
     */
    const fetchItems = useCallback(async () => {
        try {
            // Perform the GET request to fetch items
            const response = await axios.get(API_URL);

            // Log the fetched data to the console for debugging purposes
            console.log('Data fetched from API:', response.data);

            // Update the items state with the fetched data
            setItems(response.data);
        } catch (error) {
            // Log the error to the console and update the error state
            console.error('Error fetching items:', error);
            setError(error);
        }
    }, []);

    /**
     * Effect hook to automatically fetch items when the component mounts.
     * 
     * This effect will run only once when the component is first rendered,
     * or whenever the `fetchItems` function changes (which should be rare
     * due to `useCallback` memoization).
     */
    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    // Return the fetched items, any error that occurred, and the refetch function
    return { items, error, refetch: fetchItems };
};

export default useFetchItems;
