import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCaretDown, FaHeart, FaSearch, FaBars, FaTimes, FaRegUserCircle, FaBell } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import SearchPopup from "./Search";
import "./css/Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [userRole, setUserRole] = useState(null);
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
      setUserRole(role); // Set the role state
      fetchUserProfile(userId);
      fetchUnreadNotifications(userId, token);
    } else {
      setIsLoggedIn(false);
      setUserRole(null); // Clear role if not logged in
      setUnreadCount(0);
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

  const fetchUnreadNotifications = async (userId, token) => {
    try {
      const response = await axios.get("http://localhost:3000/api/notifications/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetched notifications for header:", response.data);
      const unread = response.data.filter((notif) => !notif.read).length;
      setUnreadCount(unread);
    } catch (error) {
      console.error("Error fetching notifications for header:", error);
      setUnreadCount(0);
    }
  };

  const handleSignInClick = () => {
    navigate(isLoggedIn ? "/profile" : "/loginregister");
  };

  const handleHomeClick = () => {
    // Navigate based on role
    if (isLoggedIn && userRole === "Admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
    setIsMenuOpen(false);
  };

  const handleFavoritesClick = () => {
    navigate("/favorite");
    setIsMenuOpen(false);
  };

  const handleNotificationsClick = () => {
    navigate("/notifications");
    setIsMenuOpen(false);
  };

  const handleCartClick = () => {
    navigate("/cart");
    setIsMenuOpen(false);
  };

  const handleMouseEnter = () => {
    clearTimeout(dropdownTimeout);
    setIsGenreOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout = setTimeout(() => {
      setIsGenreOpen(false);
    }, 200);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      {/* Hamburger Menu for Mobile */}
      <div className="hamburger" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes className="icon" /> : <FaBars className="icon" />}
      </div>

      {/* Section 1: Logo */}
      <div className="header-section logo-section" onClick={handleHomeClick}>
        <img src="/src/assets/images/no_bg_logo.png" alt="Logo" className="logo" />
        <h1 className="website-name">BookIt!</h1>
      </div>

      {/* Section 2: Navigation */}
      <nav className={`header-section nav-section ${isMenuOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li
            className="genre-dropdown"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <a href="/genre">
              Genre <FaCaretDown className="dropdown-icon" />
            </a>
            {isGenreOpen && (
              <ul className="dropdown-menu">
                {genres.map((genre, index) => (
                  <li key={index} className="dropdown-item">
                    <a
                      href={`/genre/${genre.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {genre}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li><a href="/newArrivals" onClick={() => setIsMenuOpen(false)}>New Arrivals</a></li>
          <li><a href="/bestSeller" onClick={() => setIsMenuOpen(false)}>Best Selling</a></li>
          <li><a href="/bookRequest" onClick={() => setIsMenuOpen(false)}>Book Request</a></li>
        </ul>
      </nav>

      {/* Section 3: User Options */}
      <div className="header-section user-options">
        <div className="icon-circle" onClick={toggleSearch}>
          <FaSearch className="icon" />
        </div>
        <div className="icon-circle" onClick={handleCartClick}>
          <HiMiniShoppingBag className="icon" />
        </div>
        <div className="icon-circle" onClick={handleFavoritesClick}>
          <FaHeart className="icon" />
        </div>
        <div className="icon-circle relative" onClick={handleNotificationsClick}>
          <FaBell className="icon" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>

        {/* User Icon/Profile */}
        {!isLoggedIn ? (
          <button className="signin-btn" onClick={handleSignInClick}>
            Sign In <FaRegUserCircle className="user-icon" />
          </button>
        ) : (
          <div className="icon-circle" onClick={handleSignInClick}>
            {selectedUser?.image ? (
              <img
                src={
                  selectedUser.imagePreview
                    ? selectedUser.imagePreview
                    : `http://localhost:3000/profilePicture/${selectedUser.image}`
                }
                alt="User"
                className="profile-pic rounded-full w-full h-full object-cover"
              />
            ) : (
              <FaCircleUser className="icon" />
            )}
          </div>
        )}
      </div>

      {/* Search Popup */}
      {isSearchOpen && <SearchPopup onClose={toggleSearch} />}
    </header>
  );
};

export default Header;