import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import "./css/BookCard2.css"; // Import the CSS file

const BookCard2 = ({ title, author, img }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="new-arrival-card">
      <div className="new-arrival-image-container">
        <img
        src={img ? `http://localhost:3000/book_images/${img}` : "/default-book-cover.jpg"}
        alt="Book Cover"
        className="w-full h-full object-cover"
      />
        <div
          className={`fav-icon-circle ${isFavorited ? "active" : ""}`}
          onClick={toggleFavorite}
        >
          <FaHeart className={`favorite-icon ${isFavorited ? "active" : ""}`} />
        </div>
      </div>
      <h4 className="new-arrival-title">{title}</h4>
      <p className="new-arrival-author">{author}</p>
    </div>
  );
};

export default BookCard2;
