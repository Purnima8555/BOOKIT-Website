import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { FaBookOpen, FaFire, FaRegClock, FaStar } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaCamera, FaRegBuilding, FaChild, FaTheaterMasks, FaSchool, FaMagic, FaGhost, FaSearch, FaHeart, FaRocket, FaUsers } from 'react-icons/fa';

// Import Header and Footer
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";

const CategoryPage = () => {
  const [isFilterByOpen, setIsFilterByOpen] = useState(true);
  const [isGenresOpen, setIsGenresOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [selectedPriceOption, setSelectedPriceOption] = useState("500-1200");
  const [priceRange, setPriceRange] = useState([500, 1200]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Handle custom range slider change
  const handleCustomPriceChange = (values) => {
    setPriceRange(values);
  };

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
    { name: 'Science Fiction', icon: <FaRocket className="text-indigo-500" size={18} /> },
    { name: 'Self-help', icon: <FaUsers className="text-green-600" size={18} /> },
  ];

  // Handle the selection of a category
  const handleSelect = (category) => {
    setSelectedCategory(category);
    setIsGenresOpen(false);
  };

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
                        value="newArrivals"
                        checked={selectedFilter === "newArrivals"}
                        onChange={() => setSelectedFilter("newArrivals")}
                        className="mr-2 cursor-pointer"
                      />
                      <FaFire className="text-red-500" size={18} />
                      <label className="text-gray-700">New Arrivals</label>
                    </li>
                    <li className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="bestsellers"
                        checked={selectedFilter === "bestsellers"}
                        onChange={() => setSelectedFilter("bestsellers")}
                        className="mr-2 cursor-pointer"
                      />
                      <FaStar className="text-yellow-500" size={18} />
                      <label className="text-gray-700">Bestsellers</label>
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
                onClick={() => setIsGenresOpen(!isGenresOpen)}  // Toggle dropdown
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

            {/* Price Range Box */}
            <div className="bg-white p-4 shadow rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-md font-medium mb-2">Price (NPR)</h3>
                <button
                  onClick={() => setIsPriceOpen(!isPriceOpen)}
                  className="text-gray-500"
                >
                  {isPriceOpen ? (
                    <IoIosArrowUp size={20} />
                  ) : (
                    <IoIosArrowDown size={20} />
                  )}
                </button>
              </div>
              <div
                className={`transition-all ease-in-out duration-500 overflow-hidden ${
                  isPriceOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {isPriceOpen && (
                  <div>
                    {/* Radio Buttons */}
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="0-500"
                          checked={selectedPriceOption === "0-500"}
                          onChange={() => setSelectedPriceOption("0-500")}
                          className="mr-2"
                        />
                        0 - 500
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="500-1200"
                          checked={selectedPriceOption === "500-1200"}
                          onChange={() => setSelectedPriceOption("500-1200")}
                          className="mr-2"
                        />
                        500 - 1200
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="moreThan1200"
                          checked={selectedPriceOption === "moreThan1200"}
                          onChange={() => setSelectedPriceOption("moreThan1200")}
                          className="mr-2"
                        />
                        More than 1200
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="custom"
                          checked={selectedPriceOption === "custom"}
                          onChange={() => setSelectedPriceOption("custom")}
                          className="mr-2"
                        />
                        Custom
                      </label>
                    </div>

                    {/* Custom Range Slider */}
                    {selectedPriceOption === "custom" && (
                      <div className="mt-4">
                        <label
                          htmlFor="customRange"
                          className="text-sm text-gray-600 block"
                        >
                          Custom Price Range
                        </label>
                        <Slider
                          range
                          min={0}
                          max={5000}
                          defaultValue={priceRange}
                          onChange={handleCustomPriceChange}
                          className="mt-2"
                        />
                        <div className="flex justify-between text-sm mt-2">
                          <span>{priceRange[0]}</span>
                          <span>{priceRange[1]}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">
          <div className="flex justify-between items-center mb-8">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-600">
              <span className="hover:text-blue-500 cursor-pointer">Home</span> /{" "}
              <span className="hover:text-blue-500 cursor-pointer">Genres</span> /{" "}
              <span className="font-semibold">Arts and Photography</span>
            </div>

            {/* Sort By */}
            <div className="flex items-center space-x-2">
              <label htmlFor="sort" className="mr-2 text-gray-600">
                Sort by:
              </label>
                <select
                  id="sort"
                  className="border border-gray-300 rounded px-2 py-1 text-gray-700"
                >
                  <option>Default</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white shadow-lg p-4 rounded-md w-full">
                <img
                  src={`https://placeimg.com/300/200/tech?${i}`}
                  alt={`Book ${i}`}
                  className="w-full h-48 object-cover mb-4 rounded-md"
                />
                <h4 className="font-semibold text-md">Book Title {i + 1}</h4>
                <p className="text-sm text-gray-600 mt-2">NPR 600</p>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CategoryPage;
