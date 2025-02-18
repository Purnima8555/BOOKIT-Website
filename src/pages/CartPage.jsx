import { ArrowLeft, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart items on mount
  useEffect(() => {
    const fetchCart = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        setError("Please log in to view your cart.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/api/cart/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(response.data || []); // Ensure empty array if no data
      } catch (err) {
        if (err.response && err.response.status === 404) {
          // Handle 404 as an empty cart
          setCartItems([]);
        } else {
          setError(err.response?.data?.message || "Error fetching cart items");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const calculateItemPrice = (item) => {
    if (item.type === "purchase") {
      return item.purchasePrice;
    } else {
      return item.rentalPrice * (item.rentalDays / 7); // Price per week × weeks
    }
  };

  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/cart/remove/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems((items) => items.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + calculateItemPrice(item) * item.quantity, 0);
  const deliveryFee = cartItems.length > 0 ? 100 : 0; // No fee if cart is empty
  const total = subtotal + deliveryFee;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow py-12">
          <div className="max-w-6xl mx-auto px-4 text-center">Loading cart...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow py-12">
          <div className="max-w-6xl mx-auto px-4 text-center text-red-500">{error}</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <button className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Continue Shopping
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-grow space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
                <span className="text-gray-500">{cartItems.length} items</span>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600">Your cart is empty.</p>
                  <p className="text-gray-500 mt-2">
                    Start adding books to your cart now!
                  </p>
                  <button
                    onClick={() => window.location.href = "/"} // Redirect to homepage
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
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
                        {/* Left Container: Book Details */}
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
                        {/* Right Containers: Status & Total */}
                        <div className="flex flex-col gap-4 w-1/3">
                          {/* Status and Quantity/Weeks Container */}
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
                          {/* Total Price Container */}
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
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                      Checkout Now
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;