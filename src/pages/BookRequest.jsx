import React, { useState } from "react";
import { Book, BookOpen, CheckCircle, Clock, FileText, Hash, HelpCircle, Send, User } from "lucide-react";
import axios from "axios"; // Import Axios
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const BookRequest = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    urgency: "normal",
    reason: "not-in-system",
    additionalInfo: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [requestId, setRequestId] = useState(null); // Store request ID from backend
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token"); // Get JWT token from localStorage
      const userId = localStorage.getItem("userId"); // Get userId from localStorage

      if (!token || !userId) {
        throw new Error("Please log in to submit a request");
      }

      // Include userId in the request body
      const response = await axios.post(
        "http://localhost:3000/api/book-request",
        {
          ...formData,
          userId, // Add userId to the payload
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include JWT token in headers
          },
        }
      );

      setRequestId(response.data.requestId); // Set requestId from response
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setCurrentStep(1);
        setRequestId(null);
        setFormData({
          title: "",
          author: "",
          isbn: "",
          urgency: "normal",
          reason: "not-in-system",
          additionalInfo: "",
        });
      }, 5000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Error submitting request");
    } finally {
      setLoading(false);
    }
  };

  const displayRequestId = requestId ? `#${requestId.slice(0, 6)}` : null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        {isSubmitted ? (
          <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-white to-[#1E2751]/10 rounded-2xl shadow-xl my-6">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-25"></div>
                <CheckCircle className="w-20 h-20 text-green-500 relative z-10" />
              </div>
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1E2751] to-purple-600 mb-4">
                Request Submitted!
              </h2>
              <p className="text-gray-700 mb-8 text-center text-lg">
                We've received your book request and notified the admin for approval. You'll be informed once a decision is made.
              </p>
              <div className="bg-white p-4 rounded-lg shadow-md w-64 text-center mb-6">
                <p className="text-sm text-gray-500 mb-1">Request ID:</p>
                <p className="text-xl font-mono font-bold" style={{ color: "#1E2751" }}>
                  {displayRequestId}
                </p>
              </div>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2 bg-[#1E2751] text-white rounded-full hover:bg-[#2A3A7A] transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#1E2751] focus:ring-offset-2"
              >
                New Request
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-white to-[#1E2751]/10 rounded-2xl shadow-xl my-6 border border-gray-300">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-[#1E2751] p-3 rounded-full shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1E2751] to-purple-600">
                    Request a Book
                  </h1>
                  <p className="text-gray-600">
                    Can't find what you're looking for? We'll help you get it!
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-between mb-8">
              <div className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= 1 ? "bg-[#1E2751] text-white" : "bg-gray-200 text-gray-600"
                  } shadow-md`}
                >
                  1
                </div>
                <div className={`h-1 w-12 ${currentStep >= 2 ? "bg-[#1E2751]" : "bg-gray-200"}`}></div>
              </div>
              <div className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= 2 ? "bg-[#1E2751] text-white" : "bg-gray-200 text-gray-600"
                  } shadow-md`}
                >
                  2
                </div>
                <div className={`h-1 w-12 ${currentStep >= 3 ? "bg-[#1E2751]" : "bg-gray-200"}`}></div>
              </div>
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full shadow-md"
                style={{
                  background: currentStep >= 3 ? "#1E2751" : "#e5e7eb",
                  color: currentStep >= 3 ? "white" : "#4b5563",
                }}
              >
                3
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <div className="space-y-6 transition-all duration-300">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Book className="w-5 h-5" style={{ color: "#1E2751" }} />
                    Basic Book Information
                  </h2>

                  <div className="group">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-[#1E2751] transition-colors"
                    >
                      Book Title*
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E2751] focus:border-[#1E2751] pl-12 transition-all shadow-sm hover:shadow-md disabled:opacity-50"
                        placeholder="Enter book title"
                      />
                      <div className="absolute left-3 top-3 bg-[#1E2751]/10 p-1 rounded-md">
                        <Book className="h-5 w-5" style={{ color: "#1E2751" }} />
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <label
                      htmlFor="author"
                      className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-[#1E2751] transition-colors"
                    >
                      Author*
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="author"
                        name="author"
                        required
                        value={formData.author}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E2751] focus:border-[#1E2751] pl-12 transition-all shadow-sm hover:shadow-md disabled:opacity-50"
                        placeholder="Enter author name"
                      />
                      <div className="absolute left-3 top-3 bg-[#1E2751]/10 p-1 rounded-md">
                        <User className="h-5 w-5" style={{ color: "#1E2751" }} />
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <label
                      htmlFor="isbn"
                      className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-[#1E2751] transition-colors"
                    >
                      ISBN (if known)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="isbn"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E2751] focus:border-[#1E2751] pl-12 transition-all shadow-sm hover:shadow-md disabled:opacity-50"
                        placeholder="e.g., 978-3-16-148410-0"
                      />
                      <div className="absolute left-3 top-3 bg-[#1E2751]/10 p-1 rounded-md">
                        <Hash className="h-5 w-5" style={{ color: "#1E2751" }} />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#1E2751] text-white font-medium rounded-lg hover:bg-[#2A3A7A] focus:outline-none focus:ring-2 focus:ring-[#1E2751] focus:ring-offset-2 transition-all transform hover:scale-[1.01] shadow-md disabled:opacity-50"
                    >
                      Continue
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6 transition-all duration-300">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" style={{ color: "#1E2751" }} />
                    Request Details
                  </h2>

                  <div className="group">
                    <label
                      htmlFor="urgency"
                      className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-[#1E2751] transition-colors"
                    >
                      How Urgent Is Your Request?
                    </label>
                    <div className="relative">
                      <select
                        id="urgency"
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E2751] focus:border-[#1E2751] pl-12 appearance-none transition-all shadow-sm hover:shadow-md disabled:opacity-50"
                      >
                        <option value="low">Not Urgent</option>
                        <option value="normal">Somewhat Urgent</option>
                        <option value="high">Very Urgent</option>
                      </select>
                      <div className="absolute left-3 top-3 bg-[#1E2751]/10 p-1 rounded-md">
                        <Clock className="h-5 w-5" style={{ color: "#1E2751" }} />
                      </div>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <label
                      htmlFor="reason"
                      className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-[#1E2751] transition-colors"
                    >
                      Reason for Request
                    </label>
                    <div className="relative">
                      <select
                        id="reason"
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E2751] focus:border-[#1E2751] pl-12 appearance-none transition-all shadow-sm hover:shadow-md disabled:opacity-50"
                      >
                        <option value="not-in-system">Book not in library system</option>
                        <option value="out-of-stock">Book currently out of stock</option>
                        <option value="new-release">New release not yet available</option>
                        <option value="other">Other reason</option>
                      </select>
                      <div className="absolute left-3 top-3 bg-[#1E2751]/10 p-1 rounded-md">
                        <HelpCircle className="h-5 w-5" style={{ color: "#1E2751" }} />
                      </div>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={loading}
                      className="w-1/2 flex items-center justify-center gap-2 px-6 py-3 bg-gray-300 text-gray-800 font-medium rounded-lg border border-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all disabled:opacity-50"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={loading}
                      className="w-1/2 flex items-center justify-center gap-2 px-6 py-3 bg-[#1E2751] text-white font-medium rounded-lg hover:bg-[#2A3A7A] focus:outline-none focus:ring-2 focus:ring-[#1E2751] focus:ring-offset-2 transition-all transform hover:scale-[1.01] shadow-md disabled:opacity-50"
                    >
                      Continue
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6 transition-all duration-300">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" style={{ color: "#1E2751" }} />
                    Additional Information
                  </h2>

                  <div className="bg-[#1E2751]/10 border-l-4 border-[#1E2751] p-4 mb-6 rounded-r-lg">
                    <p className="text-sm" style={{ color: "#1E2751" }}>
                      Please provide any additional details that might help us locate the book you're looking for.
                    </p>
                  </div>

                  <div className="group">
                    <label
                      htmlFor="additionalInfo"
                      className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-[#1E2751] transition-colors"
                    >
                      Additional Information
                    </label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      rows="4"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E2751] focus:border-[#1E2751] transition-all shadow-sm hover:shadow-md disabled:opacity-50"
                      placeholder="Any additional details about your request..."
                    ></textarea>
                  </div>

                  {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-r-lg mb-6">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}

                  <div className="flex gap-4 pt-6">
                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={loading}
                      className="w-1/2 flex items-center justify-center gap-2 px-6 py-3 bg-gray-300 text-gray-800 font-medium rounded-lg border border-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all disabled:opacity-50"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-1/2 flex items-center justify-center gap-2 px-6 py-3 bg-[#1E2751] text-white font-medium rounded-lg hover:bg-[#2A3A7A] focus:outline-none focus:ring-2 focus:ring-[#1E2751] focus:ring-offset-2 transition-all transform hover:scale-[1.01] shadow-md disabled:opacity-50"
                    >
                      <Send className="h-5 w-5" />
                      {loading ? "Submitting..." : "Submit Request"}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BookRequest;