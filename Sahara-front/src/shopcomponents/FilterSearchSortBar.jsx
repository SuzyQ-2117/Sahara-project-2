import React, { useState } from 'react';

const FilterSearchSortBar = ({ onSort, onFilter }) => {
    const [showSortControls, setShowSortControls] = useState(false);
    const [showFilterControls, setShowFilterControls] = useState(false);
  
    const toggleSortControls = () => setShowSortControls(!showSortControls);
    const toggleFilterControls = () => setShowFilterControls(!showFilterControls);
  
    const handleSortApply = () => {
      // Sort logic here
      toggleSortControls();
    };
  
    const handleFilterApply = () => {
      // Filter logic here
      toggleFilterControls();
    };
  
    return (
      <div className="filter-search-sort-bar">

        <div className="top-controls">
          <div className="search-controls">
            <label>Search:</label>
            <input type="text" placeholder="Search items..." />
          </div>
  
          <div className="sort-button" onClick={toggleSortControls}>Sort</div>
          <div className="filter-button" onClick={toggleFilterControls}>Filter</div>
        </div>
  
        {showSortControls && (
          <div className="sort-controls">
            <button className="close" onClick={toggleSortControls}>X</button>
            <div>
              <label>Sort by Name</label>
              <select>
                <option value="asc">A to Z</option>
                <option value="desc">Z to A</option>
              </select>
            </div>
            <div>
              <label>Sort by Price</label>
              <select>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
            </div>
            <button onClick={handleSortApply}>Apply</button>
            <button onClick={() => {/* Clear sort logic */}}>Clear</button>
          </div>
        )}
  
        {showFilterControls && (
          <div className="filter-controls">
            <button className="close" onClick={toggleFilterControls}>X</button>
            <div>
              <label>Category</label>
              <select>
                <option value="all">All Categories</option>
                <option value="writing">Writing</option>
                <option value="drawing">Drawing</option>
              </select>
            </div>
            <div>
              <label>Price Range</label>
              <input type="number" placeholder="Min" />
              <input type="number" placeholder="Max" />
            </div>
            <div>
              <label>
                <input type="checkbox" /> In Stock Only
              </label>
            </div>
            <button onClick={handleFilterApply}>Apply</button>
            <button onClick={() => {/* Clear filter logic */}}>Clear</button>
          </div>
        )}
      </div>
    );
  };

export default FilterSearchSortBar;