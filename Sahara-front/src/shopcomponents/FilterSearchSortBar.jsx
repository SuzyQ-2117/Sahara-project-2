import React, { useEffect, useState, useContext } from 'react';
import { ItemContext } from './ItemContext';

const FilterSearchSortBar = ({ fetchItems }) => {
    const { sortOptions, setSortOptions, filters, setFilters, searchTerm, setSearchTerm } = useContext(ItemContext);

    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

    const [showSortControls, setShowSortControls] = useState(false);
    const [showFilterControls, setShowFilterControls] = useState(false);

    const toggleSortControls = () => setShowSortControls(!showSortControls);
    const toggleFilterControls = () => setShowFilterControls(!showFilterControls);

    const handleSearchSubmit = () => {
        setSearchTerm(localSearchTerm);
    }

    const handleClearSearch = () => {
        setLocalSearchTerm('');
        setSearchTerm('');
    }

    const handleClearSort = () => {
        setSortOptions({ name: 'none', price: 'none' });
    }


    const handleClearFilters = () => {
        setFilters({ minPrice: '', maxPrice: '', category: 'all', inStock: false });
    }

    useEffect(() => {
        fetchItems();
    }, [sortOptions, filters, searchTerm]);

    return (
        <div className="filter-search-sort-bar">

            <div className="top-controls">
                <div className="search-controls">
                    <label>Search</label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearchSubmit}>Search</button>
                    <button onClick={handleClearSearch}>Clear</button>
                    <div className="sort-button" onClick={toggleSortControls}>Sort</div>
                    <div className="filter-button" onClick={toggleFilterControls}>Filter</div>
                </div>


            </div>

            {showSortControls && (
                <div className="sort-controls">
                    <button className="close" onClick={toggleSortControls}>X</button>
                    <div>
                        <label>Sort by Name</label>
                        <select
                            value={sortOptions.name}
                            onChange={e => setSortOptions(prev => ({ ...prev, name: e.target.value }))}
                        >
                            <option value="none">None</option>
                            <option value="asc">A to Z</option>
                            <option value="desc">Z to A</option>
                        </select>
                    </div>
                    <div>
                        <label>Sort by Price</label>
                        <select
                            value={sortOptions.price}
                            onChange={e => setSortOptions(prev => ({ ...prev, price: e.target.value }))}
                        >
                            <option value="none">None</option>
                            <option value="asc">Low to High</option>
                            <option value="desc">High to Low</option>
                        </select>
                    </div>

                    <button onClick={handleClearSort}>Clear Sorting</button>
                </div>
            )}

            {showFilterControls && (
                <div className="filter-controls">
                    <button className="close" onClick={toggleFilterControls}>X</button>
                    <div>
                        <label>Category</label>
                        <select
                            value={filters.category}
                            onChange={e => setFilters(prev => ({ ...prev, category: e.target.value }))}
                        >
                            <option value="all">All Categories</option>
                            <option value="writing">Writing</option>
                            <option value="drawing">Drawing</option>
                        </select>
                    </div>
                    <div>
                        <label>Price Range</label>
                        <label>Min Price</label>
                        <input
                            type="number"
                            value={filters.minPrice}
                            onChange={e => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                        />

                        <label>Max Price</label>
                        <input
                            type="number"
                            value={filters.maxPrice}
                            onChange={e => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={filters.inStock}
                                onChange={e => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                            />
                            In Stock Only
                        </label>
                    </div>
                    <button onClick={handleClearFilters}>Clear Filters</button>
                </div>
            )}
        </div>
    );
};

export default FilterSearchSortBar;