import axios from 'axios';
import { BookOpen, Heart, Star } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer';
import Header from '../components/Header';

const BestSellersPage = () => {
  const [bestBooks, setBestBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBestBooksAndFavorites = async () => {
      try {
        const booksResponse = await axios.get('http://localhost:3000/api/books/best/bestbooks');
        setBestBooks(booksResponse.data);

        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (userId && token) {
          const favResponse = await axios.get(
            `http://localhost:3000/api/favorites/${userId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          const favMap = {};
          favResponse.data.forEach((fav) => {
            if (fav.isFavorite) {
              favMap[fav.book_id._id] = true;
            }
          });
          setFavorites(favMap);
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch best-selling books.");
        setLoading(false);
      }
    };

    fetchBestBooksAndFavorites();
  }, []);

  const toggleFavorite = async (bookId, e) => {
    e.stopPropagation();

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      alert("Please log in to favorite books");
      return;
    }

    const isCurrentlyFavorited = favorites[bookId] || false;

    try {
      if (isCurrentlyFavorited) {
        const response = await axios.get(
          `http://localhost:3000/api/favorites/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const favoriteToRemove = response.data.find(
          (fav) => fav.book_id._id === bookId && fav.isFavorite
        );

        if (favoriteToRemove) {
          await axios.delete(
            `http://localhost:3000/api/favorites/${favoriteToRemove._id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setFavorites(prev => ({ ...prev, [bookId]: false }));
        }
      } else {
        await axios.post(
          "http://localhost:3000/api/favorites/",
          {
            user_id: userId,
            book_id: bookId,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFavorites(prev => ({ ...prev, [bookId]: true }));
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      alert("Failed to update favorite status. Please try again.");
    }
  };

  const renderStars = (rating) => (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-5 h-5 ${index < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );

  const handleViewDetails = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  if (loading) return <p className="text-center text-xl mt-10">Loading best sellers...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (bestBooks.length === 0) return <p className="text-center text-gray-500 mt-10">No best sellers found.</p>;

  const [topBook, ...otherBestSellers] = bestBooks;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1E2751] to-blue-600 py-6">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Star className="w-12 h-12 text-yellow-300 fill-yellow-300" />
            <h1 className="text-5xl font-bold text-white">Best Sellers</h1>
            <Star className="w-12 h-12 text-yellow-300 fill-yellow-300" />
          </div>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Explore the chart toppers that are captivating readers everywhere
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-9">
        {/* Top Book Feature */}
        {topBook && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-10 transform hover:scale-[1.02] transition-transform duration-300 border border-gray-300">
            <div className="flex flex-col lg:flex-row relative">
              {/* Book Cover */}
              <div className="lg:w-1/4 relative overflow-hidden">
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium z-10">
                  #1 Best Seller
                </div>
                <div
                  className={`absolute top-4 right-4 p-2 rounded-full border-2 transition-colors ${
                    favorites[topBook._id] ? 'bg-white border-gray-400' : 'bg-[#1E2751] border-[#1E2751]'
                  }`}
                  onClick={(e) => toggleFavorite(topBook._id, e)}
                >
                  <Heart
                    className={`w-5 h-5 ${favorites[topBook._id] ? 'text-red-500 fill-red-500' : 'text-white'}`}
                  />
                </div>
                <img
                  src={`http://localhost:3000/book_images/${topBook.image}`}
                  alt={topBook.title}
                  className="w-80 h-120 object-cover"
                />
              </div>

              {/* Book Info */}
              <div className="lg:w-2/3 p-6 lg:p-8 flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-3 text-gray-900">{topBook.title}</h2>
                  <p className="text-lg text-gray-600 mb-4">by {topBook.author}</p>
                  <div className="flex items-center gap-4 mb-4">
                    {renderStars(topBook.averageRating)}
                    <div className="flex items-center text-green-600 text-lg">
                      <BookOpen className="w-5 h-5 mr-1" />
                      <span>{topBook.reviewsCount} reviews</span>
                    </div>
                  </div>
                  <p className="text-gray-700 text-md mb-6 line-clamp-3">
                    {topBook.description}
                  </p>
                </div>
                <div className="flex flex-col gap-6 lg:w-1/3">
                  <span className="text-3xl font-bold" style={{ color: "#1E2751" }}>
                    Rs {topBook.price}
                  </span>
                  <button
                    onClick={() => handleViewDetails(topBook._id)}
                    className="bg-transparent border-2 border-[#1E2751] text-[#1E2751] px-3 py-1 rounded-full text-lg font-medium hover:bg-[#1E2751] hover:text-white transition-colors duration-200"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Best Sellers Grid */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-gray-900">More Best Sellers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherBestSellers.map((book, index) => (
              <div
                key={book._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 border border-gray-300"
                onClick={() => handleViewDetails(book._id)}
              >
                <div className="relative justify-center">
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    #{index + 2}
                  </div>
                  <div
                    className={`absolute top-4 right-4 p-2 rounded-full border-2 transition-colors ${
                      favorites[book._id] ? 'bg-white border-gray-400' : 'bg-[#1E2751] border-[#1E2751]'
                    }`}
                    onClick={(e) => toggleFavorite(book._id, e)}
                  >
                    <Heart
                      className={`w-5 h-5 ${favorites[book._id] ? 'text-red-500 fill-red-500' : 'text-white'}`}
                    />
                  </div>
                  <img
                    src={`http://localhost:3000/book_images/${book.image}`}
                    alt={book.title}
                    className="w-75 h-80 object-cover mx-auto"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{book.title}</h3>
                  <p className="text-gray-600 mb-4">by {book.author}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">{renderStars(book.averageRating)}</div>
                    <div className="flex items-center text-green-600 text-sm">
                      <BookOpen className="w-5 h-5 mr-1" />
                      <span>{book.reviewsCount} reviews</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-lg font-bold" style={{ color: "#1E2751" }}>
                      Rs {book.price}
                    </span>
                    <button className="bg-transparent border-2 border-[#1E2751] text-[#1E2751] px-3 py-1 rounded-full text-lg font-medium hover:bg-[#1E2751] hover:text-white transition-colors duration-200">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BestSellersPage;