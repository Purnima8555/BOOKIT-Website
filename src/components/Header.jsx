import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCaretDown, FaHeart, FaRegUserCircle, FaSearch } from "react-icons/fa";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import "./css/Header.css";

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isGenreOpen, setIsGenreOpen] = useState(false);
    let dropdownTimeout;

    const genres = [
        "Art & Photography", "Biography", "Business", "Children", "Drama",
        "Educational", "Fantasy", "Horror", "Mystery", "Romance",
        "Science", "Self-help"
    ];

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (userId && token && role) {
            setIsLoggedIn(true);
            fetchUserProfile(userId);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const fetchUserProfile = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/customer/${userId}`);
            setSelectedUser(response.data);
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    const handleSignInClick = () => {
        navigate(isLoggedIn ? "/profile" : "/loginregister");
    };

    const handleHomeClick = () => {
        navigate("/");
    };

    const handleFavoritesClick = () => {
        navigate("/favorite");
    };

    // Handle mouse enter (show instantly)
    const handleMouseEnter = () => {
        clearTimeout(dropdownTimeout);
        setIsGenreOpen(true);
    };

    // Handle mouse leave (delay hiding)
    const handleMouseLeave = () => {
        dropdownTimeout = setTimeout(() => {
            setIsGenreOpen(false);
        }, 200);
    };

    return (
        <header className="header">
            {/* Section 1: Logo */}
            <div className="header-section logo-section" onClick={handleHomeClick}>
                <img src="/src/assets/images/no_bg_logo.png" alt="Logo" className="logo" />
                <h1 className="website-name">BookIt!</h1>
            </div>

            {/* Section 2: Navigation */}
            <nav className="header-section nav-section">
                <ul className="nav-links">
                    <li><a onClick={handleHomeClick}>Home</a></li>

                    {/* Genre Dropdown */}
                    <li
                        className="genre-dropdown"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <a href="/category">
                            Genre <FaCaretDown className="dropdown-icon" />
                        </a>
                        {isGenreOpen && (
                            <ul className="dropdown-menu">
                                {genres.map((genre, index) => (
                                    <li key={index} className="dropdown-item">
                                        <a href={`/genre/${genre.toLowerCase().replace(/ /g, "-")}`}>{genre}</a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>

                    <li><a href="/newArrivals">New Arrivals</a></li>
                    <li><a href="/bestSeller">Best Selling</a></li>
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
                <div className="icon-circle" onClick={handleFavoritesClick}>
                    <FaHeart className="icon" />
                </div>

                {/* Show Sign In button if user is not logged in */}
                {!isLoggedIn ? (
                    <button className="signin-btn" onClick={handleSignInClick}>
                        Sign In <FaRegUserCircle className="user-icon" />
                    </button>
                ) : (
                    // Show Profile Picture inside a div when logged in
                    <div className="profile-container" onClick={handleSignInClick}>
                        {selectedUser?.image ? (
                            <img
                                src={
                                    selectedUser.imagePreview
                                        ? selectedUser.imagePreview
                                        : `http://localhost:3000/profilePicture/${selectedUser.image}`
                                }
                                alt="User"
                                className="profile-pic"
                            />
                        ) : (
                            <FaRegUserCircle className="user-icon" />
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;