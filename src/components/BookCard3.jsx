import React from "react";
import "./css/BookCard3.css";

const BookCard3 = ({ title, author, img, price }) => {
  return (
    <div className="deal-card">
      <img src={img} alt={title} className="deal-image" />
      <div className="deal-details">
        <h4 className="deal-title">{title}</h4>
        <p className="deal-author">By {author}</p>
        <p className="deal-price">{price}</p>
      </div>
    </div>
  );
};

export default BookCard3;
