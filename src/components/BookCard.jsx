import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

const BookCard = ({ title, price, img, altText }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="relative max-w-xs bg-white rounded-lg shadow-lg overflow-hidden h-[350px]">
      {/* Increased height of the card */}
      <div className="relative">
        <img
          src={img ? `http://localhost:3000/book_images/${img}` : "/default-book-cover.jpg"}
          alt={altText}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        {/* Increased height of the image */}
        
        <button
          className={`absolute top-3 right-3 p-2 rounded-full border-2
            ${isFavorited ? 'bg-white border-gray-400' : 'bg-[#1E2751] border-[#1E2751]'}`
          }
          onClick={toggleFavorite}
        >
          <FaHeart
            className={`h-5 w-5 transition-colors duration-200 
              ${isFavorited ? 'text-red-500' : 'text-white'}`}
          />
        </button>
      </div>

      {/* Book Info */}
      <div className="p-4">
        <h3 className="font-semibold text-xl text-[#1E2751]">{title}</h3>
        <p className="text-sm text-gray-600">{price}</p>
      </div>
    </div>
  );
};

export default BookCard;
