import { ArrowLeft, Trash2, CreditCard, Calendar, Lock, ChevronDown, ChevronUp } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { useLocation, useNavigate } from "react-router-dom";

const BuyNow = () => {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isCheckoutPopupOpen, setIsCheckoutPopupOpen] = useState(false);
  const [popupPaymentMethod, setPopupPaymentMethod] = useState("card");
  const [isOrderSummaryVisible, setIsOrderSummaryVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const buyData = location.state || {};

  useEffect(() => {
    const fetchBookDetails = async () => {
      const { book_id, quantity, type, rentalDays } = buyData;

      if (!book_id) {
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/api/books/${book_id}`);
        const book = response.data;

        const cartItem = {
          _id: `${book_id}-${Date.now()}`,
          book_id: {
            _id: book._id,
            title: book.title,
            author: book.author,
            image: book.image,
          },
          purchasePrice: book.price,
          rentalPrice: book.rental_price,
          quantity: quantity || 1,
          type: type || "purchase",
          rentalDays: type === "rental" ? rentalDays || 7 : undefined,
        };

        setCartItems([cartItem]);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [buyData]);

  const calculateItemPrice = (item) => {
    if (item.type === "purchase") {
      return item.purchasePrice;
    } else {
      return item.rentalPrice * (item.rentalDays / 7);
    }
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item._id !== id));
  };

  const handleContinueShopping = () => {
    const { book_id } = buyData;
    if (book_id) {
      navigate(`/book/${book_id}`);
    } else {
      navigate("/");
    }
  };

  const handleCheckout = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      alert("Please log in to proceed with checkout.");
      return;
    }

    const orderData = {
      user_id: userId,
      items: cartItems.map(item => ({
        book_id: item.book_id._id,
        quantity: item.quantity,
        type: item.type,
        rentalDays: item.rentalDays,
      })),
      deliveryFee: cartItems.length > 0 ? 100 : 0,
      total: subtotal + (cartItems.length > 0 ? 100 : 0),
      paymentMethod: paymentMethod === "cod" ? "cod" : popupPaymentMethod,
    };

    if (paymentMethod === "online") {
      setIsCheckoutPopupOpen(true);
    } else {
      try {
        const response = await axios.post("http://localhost:3000/api/orders", orderData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert(`Order placed successfully! Payment Status: ${response.data.paymentStatus}`);
        navigate("/genre", { state: { orderId: response.data.order_id, paymentStatus: response.data.paymentStatus } });
      } catch (error) {
        console.error("Error placing order:", error);
        alert(`Failed to place order: ${error.response?.data?.message || "Please try again."}`);
      }
    }
  };

  const handlePaymentSubmission = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const orderData = {
      user_id: userId,
      items: cartItems.map(item => ({
        book_id: item.book_id._id,
        quantity: item.quantity,
        type: item.type,
        rentalDays: item.rentalDays,
      })),
      deliveryFee: cartItems.length > 0 ? 100 : 0,
      total: subtotal + (cartItems.length > 0 ? 100 : 0),
      paymentMethod: popupPaymentMethod === "card" ? "online" : "esewa",
    };

    try {
      const response = await axios.post("http://localhost:3000/api/orders", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(`Order placed successfully! Payment Status: ${response.data.paymentStatus}`);
      setIsCheckoutPopupOpen(false);
      navigate("/genre", { state: { orderId: response.data.order_id, paymentStatus: response.data.paymentStatus } });
    } catch (error) {
      console.error("Error placing order:", error);
      alert(`Failed to place order: ${error.response?.data?.message || "Please try again."}`);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + calculateItemPrice(item) * item.quantity, 0);
  const deliveryFee = cartItems.length > 0 ? 100 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={handleContinueShopping}
              className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Continue Shopping
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-grow space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">Buy Now</h1>
                <span className="text-gray-500">{cartItems.length} item</span>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600">No item selected.</p>
                  <p className="text-gray-500 mt-2">
                    Please select a book to buy now!
                  </p>
                  <button
                    onClick={() => navigate("/")}
                    className="mt-4 bg-[#1E2751] hover:bg-[#2E4A78] text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Shop Now
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:border-blue-100 transition-all duration-300"
                  >
                    <div className="flex gap-6">
                      <div className="relative group">
                        <img
                          src={`http://localhost:3000/book_images/${item.book_id.image}`}
                          alt={item.book_id.title}
                          className="w-28 h-40 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex-1 flex gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800">{item.book_id.title}</h3>
                          <p className="text-gray-600 mt-1">by {item.book_id.author}</p>
                          <p className="text-gray-600 mt-2">
                            Purchase Price: Rs {item.purchasePrice.toFixed(0)}
                          </p>
                          <p className="text-gray-600 mt-1">
                            Rental Price: Rs {item.rentalPrice.toFixed(0)}/week
                          </p>
                        </div>
                        <div className="flex flex-col gap-4 w-1/3">
                          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <p className="text-gray-600">
                              Status: {item.type === "purchase" ? "Purchase" : "Rent"}
                            </p>
                            <p className="text-gray-600 mt-1">
                              {item.type === "purchase"
                                ? `Quantity: ${item.quantity}`
                                : `Rental Weeks: ${Math.round(item.rentalDays / 7)}`}
                            </p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <p className="text-gray-800 font-semibold">
                              Total: Rs {(calculateItemPrice(item) * item.quantity).toFixed(0)}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item._id)}
                          className="p-2 hover:bg-red-50 rounded-full transition-colors group self-start"
                        >
                          <Trash2 className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="lg:w-96">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 sticky top-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>Rs {subtotal.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery Fee</span>
                      <span>Rs {deliveryFee.toFixed(0)}</span>
                    </div>
                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex justify-between text-xl font-bold text-gray-800">
                        <span>Total</span>
                        <span>Rs {total.toFixed(0)}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label htmlFor="payment-method" className="block text-gray-700 font-semibold mb-2">
                        Payment Method
                      </label>
                      <select
                        id="payment-method"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
                      >
                        <option value="cod">Cash on Delivery</option>
                        <option value="online">Online Payment</option>
                      </select>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-[#1E2751] hover:bg-[#2E4A78] text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                    >
                      Checkout Now
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Checkout Popup for Online Payment */}
      {isCheckoutPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 mt-10 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md h-[605px] overflow-y-auto">
            {/* Header */}
            <div className="p-4 text-white" style={{ backgroundColor: "#1E2751" }}>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Complete Your Purchase</h2>
                <button
                  onClick={() => setIsCheckoutPopupOpen(false)}
                  className="text-white hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Hidable Order Summary */}
            <div className="p-4 border-b">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">Order Summary</h3>
                <button
                  onClick={() => setIsOrderSummaryVisible(!isOrderSummaryVisible)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  {isOrderSummaryVisible ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
              {isOrderSummaryVisible && (
                <>
                  {cartItems.map(item => (
                    <div key={item._id} className="flex justify-between mb-2">
                      <span>{item.book_id.title}</span>
                      <span>Rs {(calculateItemPrice(item) * item.quantity).toFixed(0)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between mb-2">
                    <span>Delivery Fee</span>
                    <span>Rs {deliveryFee.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>Rs {total.toFixed(0)}</span>
                  </div>
                </>
              )}
            </div>

            {/* Payment Method Selection */}
            <div className="p-4 border-b">
              <h3 className="font-semibold text-lg mb-2">Payment Method</h3>
              <div className="flex space-x-2 mb-4">
                <button
                  className={`px-4 py-2 border rounded ${popupPaymentMethod === "card" ? "bg-blue-50 border-[#1E2751]" : "bg-white"}`}
                  onClick={() => setPopupPaymentMethod("card")}
                >
                  <div className="flex items-center">
                    <CreditCard size={18} className="mr-2" />
                    Credit Card
                  </div>
                </button>
                <button
                  className={`px-4 py-2 border rounded ${popupPaymentMethod === "esewa" ? "bg-blue-50 border-[#1E2751]" : "bg-white"}`}
                  onClick={() => setPopupPaymentMethod("esewa")}
                >
                  <div className="flex items-center">
                    <span className="font-bold text-green-600">eSewa</span>
                  </div>
                </button>
              </div>

              {/* Credit Card Form */}
              {popupPaymentMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded"
                        placeholder="1234 5678 9012 3456"
                      />
                      <CreditCard size={18} className="absolute right-3 top-3 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full px-4 py-2 border rounded"
                          placeholder="MM/YY"
                        />
                        <Calendar size={18} className="absolute right-3 top-3 text-gray-400" />
                      </div>
                    </div>
                    <div className="w-1/3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded"
                        placeholder="123"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded"
                      placeholder="John Smith"
                    />
                  </div>
                </div>
              )}

              {/* eSewa QR Code */}
              {popupPaymentMethod === "esewa" && (
                <div className="text-center p-4">
                  <p className="mb-2">Scan the QR code below with eSewa to complete your payment:</p>
                  <img
                    src="/src/assets/images/QR.png"
                    alt="eSewa QR Code"
                    className="mx-auto w-40 h-40"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="p-4">
              {popupPaymentMethod === "card" && (
                <>
                  <button
                    onClick={handlePaymentSubmission}
                    className="w-full bg-[#1E2751] hover:bg-[#2E4A78] text-white py-3 px-4 rounded font-medium flex items-center justify-center"
                  >
                    <Lock size={16} className="mr-2" />
                    Pay Rs {total.toFixed(0)} Securely
                  </button>
                  <div className="mt-4 text-center text-sm text-gray-500 flex items-center justify-center">
                    <Lock size={14} className="mr-1" />
                    Your payment information is secure
                  </div>
                </>
              )}
              {popupPaymentMethod === "esewa" && (
                <button
                  onClick={handlePaymentSubmission}
                  className="w-full bg-[#1E2751] hover:bg-[#2E4A78] text-white py-3 px-4 rounded font-medium"
                >
                  Confirm Payment via eSewa
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BuyNow;