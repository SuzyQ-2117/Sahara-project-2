import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Navbar.css';

/**
 * The Navbar component displays the navigation bar for the application.
 * It includes a site title and a menu that toggles visibility on mouse events.
 * The menu contains links to various pages in the application such as Home, Shop, Cart, and Admin.
 * 
 * This component manages its own state to control the visibility of the navigation menu based on mouse events.
 * 
 * @returns {JSX.Element} The rendered Navbar component, including the site title and navigation links.
 */
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    /**
     * Handles mouse enter event to open the navigation menu.
     */
    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    /**
     * Handles mouse leave event to close the navigation menu.
     */
    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <h1 className="site-title">Sahara Stationery</h1>
                <div 
                    className="menu-toggle"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span>Menu</span>
                </div>
                <ul 
                    className={`nav ${isOpen ? 'active' : ''}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <li className="nav-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/shop">Shop</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/cart">Cart</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin">Admin</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
