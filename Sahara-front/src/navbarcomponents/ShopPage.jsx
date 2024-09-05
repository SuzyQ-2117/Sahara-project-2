import React from 'react';
import useFetchItems from '../admincomponents/FetchItems';
import ItemList from '../shopcomponents/ItemList';
import '../CSS/ShopPage.css';
import FilterSearchSortBar from '../shopcomponents/FilterSearchSortBar';

/**
 * The ShopPage component displays a list of items available for purchase.
 * It uses a custom hook to fetch items and handles any potential errors.
 * If the items are successfully fetched, they are passed to the ItemList component for rendering.
 * 
 */
const ShopPage = () => {
  const { items, error } = useFetchItems();

  if (error) return <div>Error loading items: {error.message}</div>;

  return (
    <div className="body">
      <FilterSearchSortBar />
      {Array.isArray(items) && <ItemList items={items} />}
    </div>
  );
};

export default ShopPage;
