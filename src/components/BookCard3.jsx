import React from "react";
import "./css/BookCard3.css";

const BookCard3 = ({ title, author, img, price, discount_percent }) => {

  // Calculate discounted price
  const discountedPrice = price - (price * (discount_percent / 100));
  
  return (
    <div className="deal-card">
      {/* Discount Badge */}
      {discount_percent > 0 && (
        <div className="discount-badge">{discount_percent}% OFF</div>
      )}
      
      <img
        src={img ? `http://localhost:3000/book_images/${img}` : "/default-book-cover.jpg"}
        alt="Book Cover"
        className="deal-image"
      />
      <div className="deal-details">
        <h4 className="deal-title">{title}</h4>
        <p className="deal-author">By {author}</p>
        
        {/* Price Section */}
        <div className="deal-price">
          <p className="original-price">Rs{parseInt(price)}</p>
          <p className="discounted-price">Rs{parseInt(discountedPrice)}</p>
        </div>
      </div>
    </div>
  );
};

export default BookCard3;
