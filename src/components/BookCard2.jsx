import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import "./css/BookCard2.css";

const BookCard2 = ({ title, author, img, bookId, onClick }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch initial favorite status when component mounts
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token || !bookId) return;

      try {
        const response = await axios.get(
          `http://localhost:3000/api/favorites/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const isBookFavorited = response.data.some(
          (fav) => fav.book_id._id === bookId && fav.isFavorite
        );
        setIsFavorited(isBookFavorited);
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    checkFavoriteStatus();
  }, [bookId]);

  const toggleFavorite = async (e) => {
    e.stopPropagation(); // Prevent card click from triggering when clicking heart

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      alert("Please log in to favorite books");
      return;
    }

    if (!bookId) {
      console.error("Book ID is missing");
      return;
    }

    setIsLoading(true);
    try {
      if (isFavorited) {
        // Remove favorite
        const favorites = await axios.get(
          `http://localhost:3000/api/favorites/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const favoriteToRemove = favorites.data.find(
          (fav) => fav.book_id._id === bookId && fav.isFavorite
        );

        if (favoriteToRemove) {
          await axios.delete(
            `http://localhost:3000/api/favorites/${favoriteToRemove._id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setIsFavorited(false);
        }
      } else {
        // Add favorite
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
        setIsFavorited(true);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      alert("Failed to update favorite status. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="new-arrival-card transform transition-transform duration-100 hover:scale-105">
      <div className="book-card" onClick={onClick} style={{ cursor: "pointer" }}>
        <div className="new-arrival-image-container">
          <img
            src={img ? `http://localhost:3000/book_images/${img}` : "/default-book-cover.jpg"}
            alt="Book Cover"
            className="w-full h-full object-cover"
          />
          <div
            className={`fav-icon-circle ${isFavorited ? "active" : ""}`}
            onClick={toggleFavorite}
            style={{ pointerEvents: isLoading ? "none" : "auto" }}
          >
            <FaHeart className={`favorite-icon ${isFavorited ? "active" : ""}`} />
          </div>
        </div>
        <h4 className="new-arrival-title">{title}</h4>
        <p className="new-arrival-author">{author}</p>
      </div>
    </div>
  );
};

export default BookCard2;