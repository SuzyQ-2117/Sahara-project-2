import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './navbarcomponents/Navbar';
import HomePage from './navbarcomponents/HomePage';
import CartPage from './navbarcomponents/CartPage';
import ShopPage from './navbarcomponents/ShopPage';
import Admin from './navbarcomponents/Admin';
import { CartProvider } from './cartcomponents/CartContext'; 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CartProvider> {}
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
