import axios from "axios";
import { Clock, Heart, Star, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const NewArrivalsPage = () => {
  const [newBooks, setNewBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooksAndFavorites = async () => {
      try {
        const booksResponse = await axios.get("http://localhost:3000/api/books/new/newbooks");
        setNewBooks(booksResponse.data);

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
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load books.");
        setLoading(false);
      }
    };

    fetchBooksAndFavorites();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1E2751] to-blue-600 py-6">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Sparkles className="w-12 h-12 text-yellow-300 fill-yellow-300" />
            <h1 className="text-5xl font-bold text-white">New Arrivals</h1>
            <Sparkles className="w-12 h-12 text-yellow-300 fill-yellow-300" />
          </div>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Discover our latest collection of books fresh off the press
          </p>
        </div>
      </div>

      {/* Books Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <p className="text-center text-lg text-gray-600">Loading books...</p>
        ) : error ? (
          <p className="text-center text-lg text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10">
            {newBooks.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300 cursor-pointer relative border border-gray-300" // Added border
                onClick={() => navigate(`/book/${book._id}`)}
              >
                <div className="flex flex-col md:flex-row h-full">
                  {/* Book Cover */}
                  <div className="md:w-2/5 relative">
                    <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-purple-600">
                      New Release
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
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Book Details */}
                  <div className="md:w-3/5 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{book.title}</h3>
                        <div className="flex items-center">
                          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                          <span className="ml-1 text-gray-600">{book.rating || "N/A"}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">by {book.author}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>
                          Added: {new Date(book.createdAt).toISOString().split("T")[0]}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {book.genre.map((genre, index) => (
                          <span
                            key={index}
                            className="bg-blue-200 font-semibold text-xs px-2 py-1 rounded text-blue-800"
                          >
                            {genre}
                          </span>
                        ))}
                        <span className="bg-green-200 font-semibold text-xs px-2 py-1 rounded text-green-800">
                          {book.available_stock} in stock
                        </span>
                      </div>
                    </div>

                    {/* Pricing and Actions */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg border border-gray-300"> {/* Added border */}
                        <div>
                          <span className="text-sm text-gray-600">Purchase</span>
                          <p className="font-bold text-gray-800">Rs. {book.price}</p>
                        </div>
                        <button className="bg-[#1E2751] text-white px-4 py-2 rounded-lg hover:bg-[#2A3A7A] transition-colors">
                          Buy Now
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg border border-gray-300"> {/* Added border */}
                        <div>
                          <span className="text-sm text-gray-600">Rent</span>
                          <p className="font-bold text-gray-800">Rs. {book.rental_price}/day</p>
                        </div>
                        <button className="border border-[#1E2751] text-[#1E2751] px-4 py-2 rounded-lg hover:bg-[#1E2751] hover:text-white transition-colors">
                          Rent Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default NewArrivalsPage;