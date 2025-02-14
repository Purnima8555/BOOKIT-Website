import React, { useState, useEffect } from "react";
import { FaBookOpen, FaRegClock } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaCamera, FaRegBuilding, FaChild, FaTheaterMasks, FaSchool, FaMagic, FaGhost, FaSearch, FaHeart, FaRocket, FaUsers } from 'react-icons/fa';
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Import Header and Footer
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";

const CategoryPage = () => {
  const [isFilterByOpen, setIsFilterByOpen] = useState(true);
  const [isGenresOpen, setIsGenresOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [books, setBooks] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const navigate = useNavigate();

  // Categories list
  const categories = [
    { name: 'Art & Photography', icon: <FaCamera className="text-yellow-500" size={18} /> },
    { name: 'Biography', icon: <FaBookOpen className="text-gray-700" size={18} /> },
    { name: 'Business', icon: <FaRegBuilding className="text-green-500" size={18} /> },
    { name: 'Children', icon: <FaChild className="text-pink-500" size={18} /> },
    { name: 'Drama', icon: <FaTheaterMasks className="text-purple-500" size={18} /> },
    { name: 'Educational', icon: <FaSchool className="text-blue-500" size={18} /> },
    { name: 'Fantasy', icon: <FaMagic className="text-orange-500" size={18} /> },
    { name: 'Horror', icon: <FaGhost className="text-gray-600" size={18} /> },
    { name: 'Mystery', icon: <FaSearch className="text-teal-500" size={18} /> },
    { name: 'Romance', icon: <FaHeart className="text-red-500" size={18} /> },
    { name: 'Science', icon: <FaRocket className="text-indigo-500" size={18} /> },
    { name: 'Self-help', icon: <FaUsers className="text-green-600" size={18} /> },
  ];

  // Fetch all books when the filter is set to "all"
  const fetchAllBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/books/");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Effect hook to fetch books based on selected filter
useEffect(() => {
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/books/");
      let filteredBooks = response.data;

      // Apply filtering based on availability status
      if (selectedFilter == "inStock") {
        filteredBooks = filteredBooks.filter(book => book.availability_status == "yes");
      } else if (selectedFilter == "outOfStock") {
        filteredBooks = filteredBooks.filter(book => book.availability_status == "no");
      }

      setBooks(filteredBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  fetchBooks();
  }, [selectedFilter]);

  // Add effect to reset the selectedCategory when filter changes
  useEffect(() => {
    setSelectedCategory(null);
  }, [selectedFilter]);

  // Handle the selection of a category
  const handleSelect = async (category) => {
    setSelectedCategory(category);
    setIsGenresOpen(false);

    try {
      const response = await axios.get(`http://localhost:3000/api/books/genre/${category}`);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const sortedBooks = [...books].sort((a, b) => {
  if (sortBy === "priceLowHigh") {
    return a.price - b.price;
  } else if (sortBy === "priceHighLow") {
    return b.price - a.price;
  }
  return 0;
});

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <Header />

      <div className="w-5/6 mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 mt-12">
        {/* Sidebar */}
        <aside className="hidden lg:block bg-gray-100 p-4 rounded-lg">
          <div className="space-y-6">
            {/* Filter by Box */}
            <div className="bg-white p-4 shadow rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-md font-medium mb-2">Filter by</h3>
                <button
                  onClick={() => setIsFilterByOpen(!isFilterByOpen)}
                  className="text-gray-500"
                >
                  {isFilterByOpen ? (
                    <IoIosArrowUp size={20} />
                  ) : (
                    <IoIosArrowDown size={20} />
                  )}
                </button>
              </div>
              <div
                className={`transition-all ease-in-out duration-500 overflow-hidden ${
                  isFilterByOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {isFilterByOpen && (
                  <ul className="space-y-2">
                    {/* Filter By Options */}
                    <li className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="all"
                        checked={selectedFilter === "all"}
                        onChange={() => setSelectedFilter("all")}
                        className="mr-2 cursor-pointer"
                      />
                      <FaBookOpen className="text-gray-500" size={18} />
                      <label className="text-gray-700">All</label>
                    </li>
                    <li className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="inStock"
                        checked={selectedFilter === "inStock"}
                        onChange={() => setSelectedFilter("inStock")}
                        className="mr-2 cursor-pointer"
                      />
                      <FaBookOpen className="text-green-500" size={18} />
                      <label className="text-gray-700">In Stock</label>
                    </li>
                    <li className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="outOfStock"
                        checked={selectedFilter === "outOfStock"}
                        onChange={() => setSelectedFilter("outOfStock")}
                        className="mr-2 cursor-pointer"
                      />
                      <FaRegClock className="text-blue-500" size={18} />
                      <label className="text-gray-700">Out of Stock</label>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            {/* Genres Box */}
            <div className="bg-white p-4 shadow rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-md font-medium mb-2">All Genres</h3>
                <button
                onClick={() => setIsGenresOpen(!isGenresOpen)}
                className="text-gray-500"
              >
                {isGenresOpen ? (
                  <IoIosArrowUp size={20} />
                ) : (
                <IoIosArrowDown size={20} />
                )}
                </button>
              </div>

              {/* Display selected category with icon */}
              {selectedCategory && (
              <div className="mt-4">
                <p className="text-sm font-semibold mb-2">Selected Genre:</p>
                <div className="flex items-center space-x-3 mt-2">
                  {categories.find(category => category.name === selectedCategory)?.icon}
                  <span className="text-gray-700 font-bold">{selectedCategory}</span>
                </div>
          
              {/* Divider */}
                <div className="my-4 border-t border-gray-300"></div>
              </div>
              )}

              {/* Genre Dropdown */}
              {isGenresOpen && (
              <ul className="space-y-2 mt-4">
                {categories.map((category) => (
                <li
                  key={category.name}
                  onClick={() => handleSelect(category.name)}
                  className={`flex items-center space-x-2 cursor-pointer
                  ${selectedCategory === category.name ? 'text-gray-700 font-bold' : 'text-gray-700'}
                  hover:text-blue-500 hover:font-bold`}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </li>
                ))}
              </ul>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">
          <div className="flex justify-between items-center mb-8">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-600">
              <span className="hover:text-blue-500 cursor-pointer">Home</span> /{" "}
              <span className="hover:text-blue-500 cursor-pointer">Genre</span> /{" "}
              <span className="font-semibold">{selectedCategory || "All Books"}</span>
            </div>

            {/* Sort By */}
            <div className="flex items-center space-x-2">
              <label htmlFor="sort" className="mr-2 text-gray-600">
                Sort by:
              </label>
                <select
                  id="sort"
                  className="border border-gray-300 rounded px-2 py-1 text-gray-700"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Default</option>
                  <option value="priceLowHigh">Price: Low to High</option>
                  <option value="priceHighLow">Price: High to Low</option>
                </select>
              </div>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
      {sortedBooks.length > 0 ? (
        sortedBooks.map((book, i) => (
          <div
            key={i}
            className="bg-white shadow-lg p-4 rounded-md w-full cursor-pointer"
            onClick={() => navigate(`/book/${book._id}`)} // Navigate on click
          >
            <img
              src={book.image ? `http://localhost:3000/book_images/${book.image}` : "/default-book-cover.jpg"}
              alt={book.title}
              className="w-full h-50 object-cover mb-4 rounded-md"
            />
            <h4 className="font-semibold text-md">{book.title}</h4>
            <p className="text-xl text-gray-700 mt-2">Rs{book.price}</p>
          </div>
        ))
      ) : (
        <p>No books found in this category.</p>
      )}
    </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CategoryPage;
