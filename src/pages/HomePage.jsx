import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import Header from "../components/Header.jsx";
import "./css/Homepage.css";
import Footer from "../components/Footer.jsx";
import BookCard2 from "../components/BookCard2.jsx";

const Homepage = () => {
  const [activeCategoryArrow, setActiveCategoryArrow] = useState("left");
  const [activeArrivalArrow, setActiveArrivalArrow] = useState("left");
  const [activeDealArrow, setActiveDealArrow] = useState("left");

  // Scroll functions for categories
  const scrollLeft = () => {
    const container = document.querySelector(".category-boxes");
    container.scrollBy({ left: -474, behavior: "smooth" });
  };

  const scrollRight = () => {
    const container = document.querySelector(".category-boxes");
    container.scrollBy({ left: 474, behavior: "smooth" });
  };

  // Scroll functions for new arrivals
  const scrollNewArrivalsLeft = () => {
    const container = document.querySelector(".new-arrivals");
    container.scrollBy({ left: -474, behavior: "smooth" });
  };

  const scrollNewArrivalsRight = () => {
    const container = document.querySelector(".new-arrivals");
    container.scrollBy({ left: 474, behavior: "smooth" });
  };

  // State for handling the favorite state for each book
  const [favorites, setFavorites] = useState({});

  // Toggle the favorite state for a specific book
  const toggleFavorite = (index) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [index]: !prevFavorites[index],
    }));
  };

  // Scroll functions for the Deal of the Day section
  const scrollLeftDeal = () => {
    const container = document.querySelector(".deal-of-the-day-container");
    container.scrollBy({ left: -640, behavior: "smooth" });
    setActiveDealArrow("left");
  };

  const scrollRightDeal = () => {
    const container = document.querySelector(".deal-of-the-day-container");
    container.scrollBy({ left: 640, behavior: "smooth" });
    setActiveDealArrow("right");
  };

  const dealBooks = [
    { title: "The Power of Habit", author: "Charles Duhigg", price: "Rs.1499", img: "/src/assets/book_images/thepowerofhabit.jpg" },
    { title: "Sapiens", author: "Yuval Noah Harari", price: "Rs.1899", img: "/src/assets/book_images/sapiens.jpg" },
    { title: "Becoming", author: "Michelle Obama", price: "Rs.1699", img: "/src/assets/book_images/becoming.jpg" },
    { title: "Educated", author: "Tara Westover", price: "Rs.1399", img: "/src/assets/book_images/educated.jpg" },
    { title: "The Book of Love", author: "Fionnuala Kearney", price: "Rs.1599", img: "/src/assets/book_images/thebookoflove.jpg" },
  ];

  return (
    <div>
      {/* Import Header */}
      <Header />

      {/* Main Container */}
      <div className="homepage-container">
        {/* Left Container for Image */}
        <div className="image-container">
          <img src="/src/assets/images/home.png" alt="Hero" className="hero-image" />
        </div>

        {/* Right Container for Text and Button */}
        <div className="content-container">
          <h1 className="hero-title">Welcome to BookIt!</h1>
          <p className="hero-text">
            Discover, Rent, and Buy Books Effortlessly - Your Gateway to Endless Stories and Knowledge!
          </p>
          <button className="hero-button">
            Explore Now <IoBagHandle fontSize={17} />
          </button>
        </div>
      </div>

      {/* Additional Container */}
      <div className="additional-container">
        {/* Upper Container: Search Input */}
        <div className="search-container">
          <input type="text" className="search-input" placeholder="Search for books..." />
          <button className="search-button">Search</button>
        </div>

        {/* Lower Container: Images */}
        <div className="image-grid">
          <img src="/src/assets/book_images/thecatcherintherye.jpg" alt="Book 1" className="grid-image" />
          <img src="/src/assets/book_images/piecebypiece.jpg" alt="Book 2" className="grid-image" />
          <img src="/src/assets/book_images/physics.jpg" alt="Book 3" className="grid-image" />
          <img src="/src/assets/book_images/idiots.png" alt="Book 4" className="grid-image" />
        </div>
      </div>

      {/* Category Section */}
      <div className="category-container">
        {/* Top Section: Shop by Categories and Arrows */}
        <div className="category-header">
          <span className="category-label">Shop by Categories:</span>
          <div className="arrow-container">
            <button
              onClick={() => {
                scrollLeft();
                setActiveCategoryArrow("left");
              }}
              className={`arrow-button ${activeCategoryArrow === "left" ? "active default" : ""}`}
            >
              <FaArrowLeft className="arrow" />
            </button>
            <button
              onClick={() => {
                scrollRight();
                setActiveCategoryArrow("right");
              }}
              className={`arrow-button ${activeCategoryArrow === "right" ? "active default" : ""}`}
            >
              <FaArrowRight className="arrow" />
            </button>
          </div>
        </div>

        {/* Bottom Section: Category Boxes */}
        <div className="category-boxes">
          {[
            { name: "Educational", img: "/src/assets/category_icons/education.png", items: 75 },
            { name: "Business", img: "/src/assets/category_icons/business.png", items: 40 },
            { name: "Art & Photography", img: "/src/assets/category_icons/art_photography.png", items: 25 },
            { name: "Drama", img: "/src/assets/category_icons/drama.png", items: 45 },
            { name: "Fantasy", img: "/src/assets/category_icons/fantasy.png", items: 30 },
            { name: "Science Fiction", img: "/src/assets/category_icons/scifi.png", items: 60 },
            { name: "Horror", img: "/src/assets/category_icons/horror.png", items: 25 },
            { name: "Romance", img: "/src/assets/category_icons/romance.png", items: 50 },
            { name: "Mystery", img: "/src/assets/category_icons/mystery.png", items: 35 },
            { name: "Biography", img: "/src/assets/category_icons/biography.png", items: 20 },
            { name: "Children", img: "/src/assets/category_icons/children.png", items: 40 },
            { name: "Self-help", img: "/src/assets/category_icons/selfhelp.png", items: 23 },
          ].map((category, index) => (
            <div className="category-box" key={index}>
              <img src={category.img} alt={category.name} className="category-image" />
              <div className="category-info">
                <h4 className="category-name">{category.name}</h4>
                <p className="item-count">{category.items} Items</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Arrivals Section */}
      <div className="new-arrivals-container">
        <div className="new-arrivals-header">
          <span className="section-label">New Arrivals:</span>
          <div className="arrow-container">
            <button
              onClick={() => {
                scrollNewArrivalsLeft();
                setActiveArrivalArrow("left");
              }}
              className={`arrow-button ${activeArrivalArrow === "left" ? "active default" : ""}`}
            >
              <FaArrowLeft className="arrow" />
            </button>
            <button
              onClick={() => {
                scrollNewArrivalsRight();
                setActiveArrivalArrow("right");
              }}
              className={`arrow-button ${activeArrivalArrow === "right" ? "active default" : ""}`}
            >
              <FaArrowRight className="arrow" />
            </button>
          </div>
        </div>

        <div className="new-arrivals">
          {[
              { title: "Atomic Habits", author: "James Clear", img: "/src/assets/book_images/atomichabits.jpg" },
              { title: "The Alchemist", author: "Paulo Coelho", img: "/src/assets/book_images/thealchemist.jpg" },
              { title: "1984", author: "George Orwell", img: "/src/assets/book_images/1984.jpg" },
              { title: "To Kill a Mockingbird", author: "Harper Lee", img: "/src/assets/book_images/tokillamockingbird.jpg" },
              { title: "The Great Gatsby", author: "F. Scott Fitzgerald", img: "/src/assets/book_images/thegreatgatsby.jpg" },
              { title: "The Catcher in the Rye", author: "J.D. Salinger", img: "/src/assets/book_images/thecatcherintherye.jpg" },
              { title: "Piece By Piece", author: "Tez Brooks", img: "/src/assets/book_images/piecebypiece.jpg" },
            ].map((book, index) => (
    <BookCard2 key={index} title={book.title} author={book.author} img={book.img} />
          ))}
        </div>
      </div>

      {/* Best Selling Section */}
      <div className="best-selling-container">
        {/* Header */}
        <div className="best-selling-header">
          <h2 className="best-selling-label">Best Sellers</h2>
        </div>

        {/* Content */}
        <div className="best-selling-content">
          {/* Left Section */}
          <div className="best-selling-left">
            <h3 className="series-label">Search by Series</h3>
            <div className="search-series-container">
              <input
                type="text"
                placeholder="Search for series..."
                className="series-input"
              />
              <FaArrowRight className="search-arrow-icon" />
            </div>
            <div className="series-labels">
              <span>High Rated</span>
              <span>Popular By Choice</span>
              <span>Best Rented</span>
            </div>
          </div>

          {/* Right Section - Use BookCard2 */}
    <div className="best-selling-right">
      {[
        { title: "Atomic Habits", author: "James Clear", img: "/src/assets/book_images/atomichabits.jpg" },
        { title: "The Alchemist", author: "Paulo Coelho", img: "/src/assets/book_images/thealchemist.jpg" },
        { title: "1984", author: "George Orwell", img: "/src/assets/book_images/1984.jpg" },
      ].map((book, index) => (
        <BookCard2 key={index} title={book.title} author={book.author} img={book.img} />
      ))}
    </div>
        </div>
      </div>

      <div className="image-section">
      <div className="image-content">
          <p className="image-text">Whether you're a passionate reader, a book lover, or someone looking for your next great adventure,
            now is the perfect time to explore our vast collection. Don't miss out on the latest releases, bestsellers, or hidden gems that await you. </p>
        <button className="image-button">Explore Now</button>
      </div>
      </div>

      <div className="deal-section">
      {/* Label and Arrow Controls */}
      <div className="deal-header">
        <span className="deal-label">Deal of the Day:</span>
        <div className="arrow-container">
          <button
            onClick={scrollLeftDeal}
            className={`arrow-button ${activeDealArrow === "left" ? "active" : ""}`}
          >
            <FaArrowLeft className="arrow" />
          </button>
          <button
            onClick={scrollRightDeal}
            className={`arrow-button ${activeDealArrow === "right" ? "active" : ""}`}
          >
            <FaArrowRight className="arrow" />
          </button>
        </div>
      </div>

      {/* Cards Container - Using BookCard3 */}
  <div className="deal-of-the-day-container">
    {dealBooks.map((book, index) => (
      <BookCard3 key={index} title={book.title} author={book.author} img={book.img} price={book.price} />
    ))}
  </div>
      </div>
      
      {/* Import Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;
