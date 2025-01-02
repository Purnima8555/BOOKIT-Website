import { ArrowLeft, MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import React, { useState } from "react";
import "../App.css";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      cover: "/api/placeholder/120/180",
      basePrice: 24.99,
      purchasePrice: 24.99,
      rentalPrice: 4.99,
      type: "purchase",
      quantity: 1,
      rentalDays: 30,
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      cover: "/api/placeholder/120/180",
      basePrice: 19.99,
      purchasePrice: 19.99,
      rentalPrice: 3.99,
      type: "rental",
      quantity: 1,
      rentalDays: 90,
    },
  ]);

  const calculateItemPrice = (item) => {
    if (item.type === "purchase") {
      return item.purchasePrice;
    } else {
      return (item.rentalPrice * (item.rentalDays / 30));
    }
  };

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      )
    );
  };

  const updateType = (id, type) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, type } : item
      )
    );
  };

  const updateRentalDays = (id, days) => {
    const numDays = parseInt(days) || 0;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, rentalDays: Math.max(1, numDays) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + calculateItemPrice(item) * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

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

              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:border-blue-100 transition-all duration-300">
                  <div className="flex gap-6">
                    <div className="relative group">
                      <img
                        src={item.cover}
                        alt={item.title}
                        className="w-28 h-40 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                          <p className="text-gray-600 mt-1">{item.author}</p>
                          
                          <div className="mt-2">
                            <p className="text-gray-600">
                              Purchase price: <span className="font-semibold text-gray-800">${item.purchasePrice.toFixed(2)}</span>
                            </p>
                            <p className="text-gray-600">
                              Rental price: <span className="font-semibold text-gray-800">${item.rentalPrice.toFixed(2)}/month</span>
                            </p>
                          </div>
                          
                          <div className="mt-4 space-y-3">
                            <div className="flex gap-4">
                              <label className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  checked={item.type === "purchase"}
                                  onChange={() => updateType(item.id, "purchase")}
                                  className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-gray-700">Purchase</span>
                              </label>
                              <label className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  checked={item.type === "rental"}
                                  onChange={() => updateType(item.id, "rental")}
                                  className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-gray-700">Rent</span>
                              </label>
                            </div>
                            
                            {item.type === "rental" && (
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  value={item.rentalDays}
                                  onChange={(e) => updateRentalDays(item.id, e.target.value)}
                                  min="1"
                                  className="w-20 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <span className="text-gray-600">days</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 hover:bg-red-50 rounded-full transition-colors group"
                        >
                          <Trash2 className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="hover:text-blue-600 transition-colors"
                          >
                            <MinusCircle className="h-5 w-5" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="hover:text-blue-600 transition-colors"
                          >
                            <PlusCircle className="h-5 w-5" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-800">
                            ${(calculateItemPrice(item) * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-600">
                            {item.type === "rental" ? `$${calculateItemPrice(item).toFixed(2)} × ${item.quantity}` : `$${item.purchasePrice.toFixed(2)} × ${item.quantity}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:w-96">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-800">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                    Checkout Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;