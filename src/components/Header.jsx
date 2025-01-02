import React from "react";
import { FaHeart, FaRegUserCircle, FaSearch, FaCaretUp } from "react-icons/fa";
import { HiMiniShoppingBag } from "react-icons/hi2";
import "./css/Header.css";

const Header = () => {
    return (
        <header className="header">
            {/* Section 1: Logo */}
            <div className="header-section logo-section">
                <img src="/src/assets/images/no_bg_logo.png" alt="Logo" className="logo" />
                <h1 className="website-name">BookIt!</h1>
            </div>

            {/* Section 2: Navigation */}
            <nav className="header-section nav-section">
                <ul className="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#category">Category <FaCaretUp className="dropdown-icon" /></a></li>
                    <li><a href="#new">New Arrivals</a></li>
                    <li><a href="#best">Best Selling</a></li>
                    <li><a href="#contact">Contact Us</a></li>
                </ul>
            </nav>

            {/* Section 3: User Options */}
            <div className="header-section user-options">
                <div className="icon-circle">
                    <FaSearch className="icon" />
                </div>
                <div className="icon-circle">
                    <HiMiniShoppingBag className="icon" />
                </div>
                <div className="icon-circle">
                    <FaHeart className="icon" />
                </div>
                <button className="signin-btn">
                    Sign In <FaRegUserCircle className="user-icon" />
                </button>
            </div>
        </header>
    );
};

export default Header;
