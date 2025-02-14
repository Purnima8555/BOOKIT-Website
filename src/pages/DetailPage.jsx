import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, ArrowRight } from 'lucide-react';
import { FaHeart } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookCard from '../components/BookCard';

const DetailPage = () => {
  const { id } = useParams(); // Get the book ID from the URL parameters
  const [selectedOption, setSelectedOption] = useState('purchase');
  const [rentalDays, setRentalDays] = useState(7);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [book, setBook] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const description = book?.description || '';

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  // Fetch book details
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/books/${id}`)
      .then((response) => {
        setBook(response.data);
        getAverageRating(); // Fetch average rating when book details are fetched
      })
      .catch((error) => {
        console.error('Error fetching book details:', error);
      });
  }, [id]);

  // Fetch average rating for the book
  const getAverageRating = () => {
    axios
      .get(`http://localhost:3000/api/feedback/average-rating/${id}`) 
      .then((response) => {
        setAverageRating(response.data.averageRating);
      })
      .catch((error) => {
        console.error('Error fetching average rating:', error);
      });
  };

  // Fetch user details using userId from localStorage
  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Get userId from localStorage
    if (userId) {
      axios
        .get(`http://localhost:3000/api/customer/${userId}`)
        .then((response) => {
          setUser(response.data); // Set user info
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
    }
  }, []);

  const handleSubmitReview = () => {
  if (rating === 0) {
    alert("Please provide a rating before submitting.");
    return;
  }

  if (!user) {
    alert("User not found. Please log in first.");
    return;
  }

  const token = localStorage.getItem("token");
  
  if (!token) {
    alert("Authentication token not found. Please log in.");
    return;
  }

  const reviewData = {
    user_id: user._id,
    book_id: id,
    rating: rating,
    comment: review,
  };

  axios
    .post("http://localhost:3000/api/feedback", reviewData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      alert("Review submitted successfully!");
      setRating(0);
      setReview("");
      getAverageRating(); // Refresh average rating

      // Fetch reviews again to update the list
      axios
        .get(`http://localhost:3000/api/feedback/book/${id}`)
        .then((response) => {
          setReviews(response.data); // Update the reviews state with the new list
        })
        .catch((error) => {
          console.error("Error fetching reviews:", error);
        });
    })
    .catch((error) => {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    });
  };
  
  // Fetch reviews based on book ID
  useEffect(() => {
  axios
    .get(`http://localhost:3000/api/feedback/book/${id}`)
    .then((response) => {
      console.log(response.data); // Check what data you are receiving
      setReviews(response.data); // Set reviews from API response
    })
    .catch((error) => {
      console.error("Error fetching reviews:", error);
    });
  }, [id]);

  // Function to render stars based on rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} fill={i < rating ? 'orange' : 'none'} stroke="orange" className="w-5 h-5" />
    ));
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  if (!book || !user) {
    return <div>Loading...</div>;
  }

  const getUserName = (review) => {
  return review.user_id && review.user_id.username ? review.user_id.username : 'Anonymous';
};

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 mt-3">
        <div className="grid md:grid-cols-2 gap-4 mb-20">
          {/* Book Image Section */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={book.image ? `http://localhost:3000/book_images/${book.image}` : "/default-book-cover.jpg"}
                alt={book.title}
                className="max-w-full h-[450px] object-cover rounded-lg shadow-lg"
              />
            
              {/* Favorite Button */}
              <button
                className={`absolute top-3 right-4 p-2 rounded-full border-2 transition-colors
                  ${isFavorited ? 'bg-white border-gray-400' : 'bg-[#1E2751] border-[#1E2751]'}`}
                onClick={toggleFavorite}
              >
                <FaHeart
                  className={`h-6 w-6 transition-colors duration-200
                    ${isFavorited ? 'text-red-500' : 'text-white'}`}
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
              <div className="flex text-orange-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    fill={i < Math.floor(averageRating) ? 'currentColor' : 'none'}
                    className="w-5 h-5"
                  />
                ))}
              </div>
              <span className="text-gray-600">
                ({averageRating} | {book.totalReviews} reviews)
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
                  <p className="font-semibold">{book.ISBN}</p>
                </div>
              
              <div className="mt-2">
                <p className="text-sm text-gray-500">Genres</p>
                <div className="flex gap-2 mt-1">
                  {book.genre.map(genre => (
                    <span
                      key={genre}
                      className="bg-blue-200 font-semibold text-xs px-2 py-1 rounded text-blue-800"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
              {/* Availability Status */}
              <div className="mt-3 flex items-center">
                <p className="text-sm text-gray-500">Status:</p>
                  <span
                    className={`ml-2 text-xs font-semibold px-2 py-1 rounded ${
                    book.availability_status === "yes"
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                    }`}
                    >
                    {book.availability_status === "yes" ? "In Stock" : "Out of Stock"}
                  </span>

                  {/* Discount Tag */}
                  {book.hasDiscount && (
                    <span className="ml-3 text-xs font-semibold px-2 py-1 rounded bg-yellow-200 text-yellow-800">
                      {book.discount_percent}% Off
                    </span>
                  )}
              </div>
            </div>
          </div>

            {/* Description */}
            <div className="relative">
              <p
                className={`text-gray-700 overflow-hidden ${!isExpanded ? 'line-clamp-7' : ''}`}
                style={{ WebkitLineClamp: !isExpanded ? 7 : 'none', display: '-webkit-box', WebkitBoxOrient: 'vertical' }}
              >
                {description}
              </p>
              {/* Button to toggle full description */}
              {!isExpanded && description.length > 200 && (
                <div className="text-right">
                  <button
                    onClick={toggleDescription}
                    className="text-blue-600 text-xs mt-1 underline"
                  >
                    ...Show more
                  </button>
                </div>
              )}
              
              {isExpanded && (
                <div className="text-right">
                  <button
                    onClick={toggleDescription}
                    className="text-blue-600 text-xs mt-1 underline"
                  >
                    ...Show less
                  </button>
                </div>
              )}
            </div>

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
                  <span>Purchase (Rs {book.price})</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="rent"
                    checked={selectedOption === 'rent'}
                    onChange={() => setSelectedOption('rent')}
                    className="text-blue-600"
                  />
                  <span>Rent (Rs {book.rental_price}/day)</span>
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
                src={user.image ? `http://localhost:3000/profilePicture/${user.image}` : "/default-book-cover.jpg"}
                alt={'ProfilePic'}
                className="w-12 h-12 rounded-full border border-gray-300"
              />
              <div className="flex flex-col ml-3">
                <p className="font-semibold">{user?.username || "User"}</p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      fill={i < hoverRating ? 'orange' : 'none'}
                      stroke='orange'
                      className="w-6 h-6 cursor-pointer"
                      onMouseEnter={() => setHoverRating(i + 1)}
                      onMouseLeave={() => setHoverRating(rating)}
                      onClick={() => setRating(i + 1)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <textarea
              placeholder="Write your review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
            ></textarea>
            <button
              onClick={handleSubmitReview}
              className="bg-[#1E2751] text-white px-6 py-3 rounded-lg hover:bg-[#0e1e67] transition"
            >
              Submit Review
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="container mx-auto py-6 px-4" style={{ width: '90%', outline: '1px solid #E5E7EB', borderRadius: '8px' }}>
          <h2 className="text-xl font-bold text-gray-900 mb-6 mt-4">Customer Reviews:</h2> {/* Customer Reviews Label */}
            {reviews.map((review) => (
          <div key={review._id} className="border-b border-gray-200 pb-8 last:border-b-0">
            <div className="flex items-start">
              <img
                src={review.user_id?.image ? `http://localhost:3000/profilePicture/${review.user_id.image}` : "/default-profile.png"} // Use default if no avatar
                alt={review.user_id?.username || "User"}
                className="w-14 h-14 rounded-full mr-4"
              />
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="font-semibold text-lg text-gray-900 mr-3">{getUserName(review)}</h3>
                    <div className="flex">{renderStars(review.rating)}</div>
                </div>
                  <p className="text-gray-800 text-base">{review.comment}</p>
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailPage;
