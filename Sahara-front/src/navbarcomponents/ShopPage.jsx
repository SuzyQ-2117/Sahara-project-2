import React, { useContext } from 'react';
import useFetchItems from '../admincomponents/FetchItems';
import ItemList from '../shopcomponents/ItemList';
import '../CSS/ShopPage.css';
import FilterSearchSortBar from '../shopcomponents/FilterSearchSortBar';
import { ItemContext } from '../shopcomponents/ItemContext';

/**
 * The ShopPage component displays a list of items available for purchase.
 * It uses a custom hook to fetch items and handles any potential errors.
 * If the items are successfully fetched, they are passed to the ItemList component for rendering.
 * 
 */
const ShopPage = () => {
  const { sortOptions, filters, searchTerm } = useContext(ItemContext);;
    const { items, error, refetch } = useFetchItems(sortOptions, filters, searchTerm);

  if (error) return <div>Error loading items: {error.message}</div>;

  return (
    <div className="body">
      <FilterSearchSortBar
                fetchItems={refetch}  // Pass the refetch function to fetch updated items
            />
      {Array.isArray(items) && <ItemList items={items} />}
    </div>
  );
};

export default ShopPage;
