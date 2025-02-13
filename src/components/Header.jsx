import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom
import { FaHeart, FaRegUserCircle, FaSearch, FaCaretUp } from "react-icons/fa";
import { HiMiniShoppingBag } from "react-icons/hi2";
import axios from "axios"; // Import axios for making API requests
import "./css/Header.css";

const Header = () => {
    const navigate = useNavigate();  // Initialize the navigate function
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        // Check if the user is logged in by checking localStorage for token
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (userId && token && role) {
            // User is logged in
            setIsLoggedIn(true);
            // Fetch the user's profile data, including the profile picture
            fetchUserProfile(userId);
        } else {
            // User is not logged in
            setIsLoggedIn(false);
        }
    }, []);

    const fetchUserProfile = async (userId) => {
        try {
            // Make API request to get the user's profile data
            const response = await axios.get(`http://localhost:3000/api/customer/${userId}`);
            setSelectedUser(response.data);  // Assuming response.data contains the user's profile data
        } catch (error) {
            console.error("Error fetching user profile:", error);
            // Optionally, handle errors or set default data
        }
    };

    const handleSignInClick = () => {
        if (!isLoggedIn) {
            navigate("/loginregister"); // Navigate to the loginregister page when not logged in
        } else {
            // Optionally, navigate to the user's profile page or home page
            navigate("/profile");  // Or wherever you'd like the logged-in user to go
        }
    };

    const handleHomeClick = () => {
        navigate("/"); // Navigate to the homepage
    };

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
                    <li><a onClick={handleHomeClick}>Home</a></li> {/* Use onClick to trigger navigate */}
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
                {/* Display profile picture if logged in, otherwise show "Sign In" button */}
                <button className="signin-btn" onClick={handleSignInClick}>
                    {isLoggedIn && selectedUser ? (
                        // If logged in and user data is available, display their profile picture
                        selectedUser.image ? (
                            <img
                                src={
                                    selectedUser.imagePreview
                                        ? selectedUser.imagePreview
                                        : `http://localhost:3000/profilePicture/${selectedUser.image}` // Fetch image from server
                                }
                                alt="User"
                                className="w-10 h-10 rounded-full object-fit border-2 border-gray-300 transition-all"
                            />
                        ) : (
                            // If no image, display a default profile icon
                            <FaRegUserCircle className="user-icon" />
                        )
                    ) : (
                        // If not logged in, show "Sign In" button with default icon
                        <>
                            Sign In <FaRegUserCircle className="user-icon" />
                        </>
                    )}
                </button>
            </div>
        </header>
    );
};

export default Header;
