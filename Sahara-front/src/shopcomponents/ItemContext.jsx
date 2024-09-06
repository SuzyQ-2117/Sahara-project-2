import React, { createContext, useState } from 'react';


export const ItemContext = createContext();

// Create a provider component
export const ItemProvider = ({ children }) => {
    // States for sorting, filtering, and searching
    const [sortOptions, setSortOptions] = useState({ name: 'none', price: 'none' });
    const [filters, setFilters] = useState({ minPrice: '', maxPrice: '', category: 'all', inStock: false });
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <ItemContext.Provider
            value={{
                sortOptions,
                setSortOptions,
                filters,
                setFilters,
                searchTerm,
                setSearchTerm
            }}
        >
            {children}
        </ItemContext.Provider>
    );
};
