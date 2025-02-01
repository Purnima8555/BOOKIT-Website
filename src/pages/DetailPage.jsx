import React, { useState } from 'react';
import { Star, ShoppingCart, ArrowRight } from 'lucide-react';
import { FaHeart } from 'react-icons/fa';
import theGreatGatsby from '../assets/book_images/thegreatgatsby.jpg';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookCard from '../components/BookCard'; // Import BookCard

const DetailPage = () => {
const [selectedOption, setSelectedOption] = useState('purchase');
const [rentalDays, setRentalDays] = useState(7);
const [quantity, setQuantity] = useState(1);
const [rating, setRating] = useState(0);
const [hoverRating, setHoverRating] = useState(0);
const [review, setReview] = useState('');
const [isFavorited, setIsFavorited] = useState(false);

const book = {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverImage: theGreatGatsby,
    description: "A brilliant exploration of decadence and idealism in the Roaring Twenties, this novel captures the essence of the American Dream through the mysterious Jay Gatsby's pursuit of wealth and lost love.",
    isbn: "978-0743273565",
    publisher: "Scribner",
    rating: 4.5,
    totalReviews: 1245,
    purchasePrice: 24.99,
    rentalPricePerDay: 0.99,
    inStock: true,
    genres: ["Classic Literature", "Fiction", "American Novel"]
};

const handleSubmitReview = () => {
    if (rating === 0) {
      alert("Please provide a rating before submitting.");
      return;
    }
    console.log("Submitted Review:", { rating, review });
    alert("Review submitted successfully!");
    setRating(0);
    setReview('');
};
    
const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
};

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 mt-10">
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Book Image Section */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img 
                src={book.coverImage}
                alt={book.title} 
                className="max-w-full h-[400px] object-cover rounded-lg shadow-lg"
                />
            
            {/* Favorite Button */}
              <button
                className={`absolute top-3 right-4 p-2 rounded-full border-2 transition-colors 
                  ${isFavorited ? 'bg-white border-gray-400' : 'bg-[#1E2751] border-[#1E2751]'}
                `}
                onClick={toggleFavorite}
              >
                <FaHeart
                  className={`h-6 w-6 transition-colors duration-200 
                    ${isFavorited ? 'text-red-500' : 'text-white'}
                  `}
                />
              </button>
            </div>
          </div>

          {/* Book Details Section */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
            <h2 className="text-xl text-gray-600 mb-4">{book.author}</h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    fill={i < Math.floor(book.rating) ? 'currentColor' : 'none'} 
                    className="w-5 h-5"
                  />
                ))}
              </div>
              <span className="text-gray-600">
                ({book.rating} | {book.totalReviews} reviews)
              </span>
            </div>

            {/* Book Info */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 mb-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-gray-500">Publisher</p>
                  <p className="font-semibold">{book.publisher}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ISBN</p>
                  <p className="font-semibold">{book.isbn}</p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">Genres</p>
                <div className="flex gap-2 mt-1">
                  {book.genres.map(genre => (
                    <span 
                      key={genre} 
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-4">{book.description}</p>

            {/* Purchase/Rental Options */}
            <div className="mb-4">
              <div className="flex gap-4 mb-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="purchase"
                    checked={selectedOption === 'purchase'}
                    onChange={() => setSelectedOption('purchase')}
                    className="text-blue-600"
                  />
                  <span>Purchase (${book.purchasePrice.toFixed(2)})</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="rent"
                    checked={selectedOption === 'rent'}
                    onChange={() => setSelectedOption('rent')}
                    className="text-blue-600"
                  />
                  <span>Rent (${book.rentalPricePerDay.toFixed(2)}/day)</span>
                </label>
              </div>

              {selectedOption === 'rent' && (
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="number"
                    min="1"
                    value={rentalDays}
                    onChange={(e) => setRentalDays(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 px-2 py-1 border rounded"
                  />
                  <span>Rental Days</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button className="flex items-center gap-2 bg-[#1E2751] text-white px-6 py-3 rounded-lg hover:bg-[#0e1e67] transition">
                  <ShoppingCart /> Add to Cart
                </button>
                <button className="flex items-center gap-2 border border-[#1E2751] text-[#1E2751] font-bold px-6 py-3 rounded-lg hover:bg-[#E5E7F3] transition">
                  Buy Now <ArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Rate & Review Section */}
        <div className="mt-12 bg-gray-100 p-6 rounded-lg shadow-lg border border-gray-300">
          <h2 className="text-2xl font-semibold mb-4 text-center">Rate & Review</h2>
          <div className="w-4/5 mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="https://via.placeholder.com/50"  
                alt="User Profile"
                className="w-12 h-12 rounded-full border border-gray-300"
              />
              <div className="flex flex-col ml-3">
                <p className="font-semibold">John Doe</p> 
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 cursor-pointer ${i < (hoverRating || rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                      fill={i < (hoverRating || rating) ? 'currentColor' : 'none'}
                      onMouseEnter={() => setHoverRating(i + 1)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(i + 1)}
                    />
                  ))}
                  <p className="text-sm text-gray-500 ml-2">({rating.toFixed(1)})</p>
                </div>
              </div>
            </div>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              placeholder="Write your review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <div className="text-right">
              <button
                onClick={handleSubmitReview}
                className="bg-[#1E2751] text-white px-6 py-3 rounded-lg hover:bg-[#0e1e67] transition"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>

        {/* Related Books Section */}
        <div className="mt-12 bg-gray-100 p-6 rounded-lg shadow-lg border border-gray-300">
          <h2 className="text-2xl font-semibold mb-4 text-center">Related Books</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <BookCard
                key={i}
                title={`Book Title ${i + 1}`}
                price={`NPR ${600 + i * 50}`}
                imageUrl={`https://placeimg.com/300/200/tech?${i}`}
                altText={`Book ${i}`}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailPage;
