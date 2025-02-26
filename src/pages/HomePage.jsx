import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import BookCard2 from "../components/BookCard2.jsx";
import BookCard3 from "../components/BookCard3.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import "./css/Homepage.css";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

// Utility function to highlight matching text
const highlightMatch = (text, query) => {
  if (!query || !text) return text;

  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} className="bg-yellow-200">{part}</span>
    ) : (
      <span key={index}>{part}</span>
    )
  );
};

const Homepage = () => {
  const [activeCategoryArrow, setActiveCategoryArrow] = useState("left");
  const [activeArrivalArrow, setActiveArrivalArrow] = useState("left");
  const [activeDealArrow, setActiveDealArrow] = useState("left");
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const debouncedQuery = useDebounce(searchQuery, 500);

  const [seriesQuery, setSeriesQuery] = useState("");
  const [seriesResults, setSeriesResults] = useState([]);
  const [seriesLoading, setSeriesLoading] = useState(false);
  const [seriesError, setSeriesError] = useState(null);
  const debouncedSeriesQuery = useDebounce(seriesQuery, 500);

  const scrollLeft = () => {
    const container = document.querySelector(".category-boxes");
    container.scrollBy({ left: -474, behavior: "smooth" });
  };

  const scrollRight = () => {
    const container = document.querySelector(".category-boxes");
    container.scrollBy({ left: 474, behavior: "smooth" });
  };

  const scrollNewArrivalsLeft = () => {
    const container = document.querySelector(".new-arrivals");
    container.scrollBy({ left: -474, behavior: "smooth" });
  };

  const scrollNewArrivalsRight = () => {
    const container = document.querySelector(".new-arrivals");
    container.scrollBy({ left: 474, behavior: "smooth" });
  };

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

  const [newArrivalBooks, setNewArrivals] = useState([]);
  const [randomBooks, setRandomBooks] = useState([]);
  const [bestSellingBooks, setBestSelling] = useState([]);
  const [dealBooks, setDealBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/books/");
        const books = response.data;

        const bestSellingBooks = books.slice(0, 3);
        setBestSelling(bestSellingBooks);

        const latestBooks = books.slice(-8).reverse();
        setNewArrivals(latestBooks);

        const discountedBooks = books.filter((book) => book.hasDiscount === true);
        setDealBooks(discountedBooks);

        const shuffledBooks = books.sort(() => 0.5 - Math.random()).slice(0, 4);
        setRandomBooks(shuffledBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  // Existing title/ISBN search
  useEffect(() => {
    const searchBooks = async () => {
      if (!debouncedQuery.trim()) {
        setSearchResults([]);
        setSearchError(null);
        setSearchLoading(false);
        return;
      }

      setSearchLoading(true);
      setSearchError(null);

      try {
        const response = await axios.get(
          `http://localhost:3000/api/books/search/title-isbn?query=${encodeURIComponent(debouncedQuery)}`
        );
        setSearchResults(response.data);
      } catch (err) {
        setSearchError(err.response?.data?.message || "Error fetching search results");
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    };

    searchBooks();
  }, [debouncedQuery]);

  // New series search
  useEffect(() => {
    const searchSeries = async () => {
      if (!debouncedSeriesQuery.trim()) {
        setSeriesResults([]);
        setSeriesError(null);
        setSeriesLoading(false);
        return;
      }

      setSeriesLoading(true);
      setSeriesError(null);

      try {
        const response = await axios.get(
          `http://localhost:3000/api/books/search/series?series=${encodeURIComponent(debouncedSeriesQuery)}`
        );
        setSeriesResults(response.data);
      } catch (err) {
        setSeriesError(err.response?.data?.message || "Error fetching series results");
        setSeriesResults([]);
      } finally {
        setSeriesLoading(false);
      }
    };

    searchSeries();
  }, [debouncedSeriesQuery]);

  const handleResultClick = (bookId) => {
    navigate(`/book/${bookId}`);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSeriesResultClick = (bookId) => {
    navigate(`/book/${bookId}`);
    setSeriesQuery("");
    setSeriesResults([]);
  };

  return (
    <div>
      <Header />

      <div className="homepage-container">
        <div className="image-container">
          <img src="/src/assets/images/home.png" alt="Hero" className="hero-image" />
        </div>

        <div className="content-container">
          <h1 className="hero-title">Welcome to BookIt!</h1>
          <p className="hero-text">
            Discover, Rent and Buy Books Effortlessly - Your Gateway to Endless Stories and Knowledge!
          </p>
          <button
            className="hero-button"
            onClick={() => {
              document.getElementById("category-section").scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore Now <IoBagHandle fontSize={17} />
          </button>
        </div>
      </div>

      <div className="additional-container">
        <div className="search-container relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            placeholder="Search for books..."
          />
          <button className="search-button">Search</button>

          {(searchLoading || searchError || searchResults.length > 0 || (searchQuery && !searchLoading)) && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 max-h-64 overflow-y-auto z-10">
              {searchLoading && (
                <p className="p-3 text-gray-600 text-center">Loading...</p>
              )}
              {searchError && (
                <p className="p-3 text-red-500 text-center">{searchError}</p>
              )}
              {searchResults.length > 0 && (
                searchResults.map((book) => (
                  <div
                    key={book._id}
                    onClick={() => handleResultClick(book._id)}
                    className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                  >
                    <img
                      src={`http://localhost:3000/book_images/${book.image}`}
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded-md"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {highlightMatch(book.title, searchQuery)}
                      </p>
                      <p className="text-xs text-gray-600">
                        by {highlightMatch(book.author, searchQuery)}
                      </p>
                    </div>
                  </div>
                ))
              )}
              {searchQuery && !searchLoading && searchResults.length === 0 && !searchError && (
                <p className="p-3 text-gray-600 text-center">No books found.</p>
              )}
            </div>
          )}
        </div>

        <div className="image-grid">
          {randomBooks.map((book, index) => (
            <img
              key={index}
              src={`http://localhost:3000/book_images/${book.image}`}
              alt={book.title}
              onClick={() => navigate(`/book/${book._id}`)}
              className="grid-image"
            />
          ))}
        </div>
      </div>

      <div className="category-container" id="category-section">
        <div className="category-header">
          <span className="category-label">Shop by Genres:</span>
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

        <div className="category-boxes">
          {[
            { name: "Educational", img: "/src/assets/category_icons/education.png", items: 75 },
            { name: "Business", img: "/src/assets/category_icons/business.png", items: 40 },
            { name: "Art & Photography", img: "/src/assets/category_icons/art_photography.png", items: 25 },
            { name: "Drama", img: "/src/assets/category_icons/drama.png", items: 45 },
            { name: "Fantasy", img: "/src/assets/category_icons/fantasy.png", items: 30 },
            { name: "Science", img: "/src/assets/category_icons/scifi.png", items: 60 },
            { name: "Horror", img: "/src/assets/category_icons/horror.png", items: 25 },
            { name: "Romance", img: "/src/assets/category_icons/romance.png", items: 50 },
            { name: "Mystery", img: "/src/assets/category_icons/mystery.png", items: 35 },
            { name: "Biography", img: "/src/assets/category_icons/biography.png", items: 20 },
            { name: "Children", img: "/src/assets/category_icons/children.png", items: 40 },
            { name: "Self-help", img: "/src/assets/category_icons/selfhelp.png", items: 23 },
          ].map((category, index) => (
            <div
              key={index}
              className="category-box transform transition-transform duration-100 hover:scale-105 cursor-pointer"
              onClick={() => {
                const genreUrl = `/genre/${category.name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`;
                navigate(genreUrl);
              }}
            >
              <img src={category.img} alt={category.name} className="category-image" />
              <div className="category-info">
                <h4 className="category-name">{category.name}</h4>
                <p className="item-count">{category.items} Items</p>
              </div>
            </div>
          ))}
        </div>
      </div>

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
          {newArrivalBooks.length > 0 ? (
            newArrivalBooks.map((book, index) => (
              <BookCard2
                key={index}
                title={book.title}
                author={book.author}
                img={book.image}
                bookId={book._id}
                onClick={() => navigate(`/book/${book._id}`)}
              />
            ))
          ) : (
            <p>Loading new arrivals...</p>
          )}
        </div>
      </div>

      <div className="best-selling-container">
        <div className="best-selling-header">
          <h2 className="best-selling-label">Popular Series</h2>
        </div>

        <div className="best-selling-content">
          <div className="best-selling-left">
            <h3 className="series-label">Search by Series</h3>
            <div className="search-series-container relative">
              <input
                type="text"
                placeholder="Search for series..."
                className="series-input"
                value={seriesQuery}
                onChange={(e) => setSeriesQuery(e.target.value)}
              />
              <FaArrowRight className="search-arrow-icon" />
              {(seriesLoading || seriesError || seriesResults.length > 0 || (seriesQuery && !seriesLoading)) && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 max-h-64 overflow-y-auto z-10">
                  {seriesLoading && (
                    <p className="p-3 text-gray-600 text-center">Loading...</p>
                  )}
                  {seriesError && (
                    <p className="p-3 text-red-500 text-center">{seriesError}</p>
                  )}
                  {seriesResults.length > 0 && (
                    seriesResults.map((book) => (
                      <div
                        key={book._id}
                        onClick={() => handleSeriesResultClick(book._id)}
                        className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                      >
                        <img
                          src={`http://localhost:3000/book_images/${book.image}`}
                          alt={book.title}
                          className="w-12 h-16 object-cover rounded-md"
                        />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {highlightMatch(book.title, seriesQuery)}
                          </p>
                          <p className="text-xs text-gray-600">
                            Series: {highlightMatch(book.series, seriesQuery)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                  {seriesQuery && !seriesLoading && seriesResults.length === 0 && !seriesError && (
                    <p className="p-3 text-gray-600 text-center">No series found.</p>
                  )}
                </div>
              )}
            </div>
            <div className="series-labels">
              <span>High Rated</span>
              <span>Popular By Choice</span>
            </div>
          </div>

          <div className="best-selling-right">
            {bestSellingBooks.map((book, index) => (
              <BookCard2
                key={index}
                title={book.title}
                author={book.author}
                img={book.image}
                bookId={book._id}
                onClick={() => navigate(`/book/${book._id}`)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="image-section">
        <div className="image-content">
          <p className="image-text">
            Whether you're a passionate reader, a book lover, or someone looking for your next great adventure,
            now is the perfect time to explore our vast collection. Don't miss out on the latest releases, bestsellers, or hidden gems that await you.
          </p>
          <button
            className="image-button"
            onClick={() => {
              document.getElementById("discountdealbook-section").scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore Now
          </button>
        </div>
      </div>

      <div className="deal-section" id="discountdealbook-section">
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

        <div className="discountdeal-of-the-day-container">
          {dealBooks.map((book, index) => (
            <BookCard3
              key={index}
              title={book.title}
              author={book.author}
              img={book.image}
              price={book.price}
              discount_percent={book.discount_percent}
              onClick={() => navigate(`/book/${book._id}`)}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;