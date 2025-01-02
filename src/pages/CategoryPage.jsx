import React, { useRef, useEffect } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const CategoryPage = () => {
  const books = [
    "book1.jpg",
    "book2.jpg",
    "book3.jpg",
    "book4.jpg",
    "book5.jpg",
    "book6.jpg",
    "book7.jpg",
    "book8.jpg",
    "book9.jpg",
    "book10.jpg",
    "book11.jpg",
    "book12.jpg",
  ];

  const scrollContainerRef = useRef(null);

  // Auto-scroll functionality
  useEffect(() => {
    const container = scrollContainerRef.current;

    // Clone the first and last set of books for smooth looping
    if (container) {
      const firstClone = container.innerHTML;
      const lastClone = container.innerHTML;
      container.innerHTML = lastClone + container.innerHTML + firstClone;
    }

    const interval = setInterval(() => {
      if (container) {
        container.scrollBy({
          left: 200, // Scroll right by 200px
          behavior: "smooth",
        });

        // If the container reaches the end of the cloned content, reset to the start
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
    }, 3000); // Adjust timing (3000ms = 3 seconds)

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Scroll left or right manually using arrows
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 200; // Adjust scroll distance as needed
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-whitesmoke min-h-screen text-black px-8 py-6">
      {/* Header */}
      <Header />

      {/* Wrapper for 80% width */}
      <div className="max-w-[80%] mx-auto">
        {/* My Books Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">My Books</h2>
          <div className="relative">
            {/* Left Arrow */}
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full z-10 hover:bg-gray-600 transition"
              onClick={() => scroll("left")}
            >
              {"<"}
            </button>

            {/* Horizontal Scrollable Container */}
            <div
              ref={scrollContainerRef}
              className="flex space-x-4 overflow-x-scroll scrollbar-hide"
            >
              {books.map((book, index) => (
                <div
                  key={index}
                  className="w-40 h-60 flex-shrink-0 bg-cover bg-center rounded-lg shadow-xl" // Added `shadow-xl` for deeper shadow
                  style={{
                    backgroundImage: `url(${book})`,
                  }}
                ></div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full z-10 hover:bg-gray-600 transition"
              onClick={() => scroll("right")}
            >
              {">"}
            </button>
          </div>
        </div>

        {/* Main Content: Best Book & Popular */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Best Book */}
          <div className="md:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Best Book</h2>
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <img
                src="best-book.jpg"
                alt="Best Book"
                className="w-full h-60 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold">The Problem with Forever</h3>
              <p className="text-sm text-gray-300 my-2">
                Author: Jennifer L. Armentrout
              </p>
              <p className="text-sm text-gray-400 line-clamp-3">
                This is an emotional and gripping story about life, love, and
                finding oneself.
              </p>
              <button className="mt-4 px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition">
                Read More
              </button>
            </div>
          </div>

          {/* Popular Books */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Popular</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="w-full h-60 bg-cover bg-center rounded-lg shadow-md"
                  style={{
                    backgroundImage: `url(popular${index + 1}.jpg)`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CategoryPage;
