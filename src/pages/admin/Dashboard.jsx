import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [bookCount, setBookCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [pendingRequestCount, setPendingRequestCount] = useState(0); // New state for pending requests
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token || role !== "Admin") {
          throw new Error("Please log in as an admin to view dashboard activity");
        }

        // Fetch all data concurrently
        const [notifResponse, bookCountResponse, customerCountResponse, pendingRequestResponse] = await Promise.all([
          axios.get("http://localhost:3000/api/notifications/all", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:3000/api/books/count", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:3000/api/customer/count", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:3000/api/book-request/pending/count", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        console.log("Admin notifications response:", notifResponse.data);
        console.log("Book count response:", bookCountResponse.data);
        console.log("Customer count response:", customerCountResponse.data);
        console.log("Pending request count response:", pendingRequestResponse.data);

        setNotifications(notifResponse.data);
        setBookCount(bookCountResponse.data.count);
        setCustomerCount(customerCountResponse.data.count);
        setPendingRequestCount(pendingRequestResponse.data.count);
      } catch (err) {
        console.error("Error fetching dashboard data:", err.response || err);
        setError(err.response?.data?.message || err.message || "Error fetching activity");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const extractUsernameFromMessage = (message) => {
    const match = message.match(/User: (\w+),/);
    return match ? match[1] : "Unknown User";
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now - time;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  };

  return (
    <div className="p-8 bg-gray-50 flex-grow">
      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-gradient-to-r from-[#1E2751] to-[#223963] text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold">Total Books</h3>
          <p className="text-3xl font-bold mt-4">{loading ? "..." : bookCount}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold">Active Users</h3>
          <p className="text-3xl font-bold mt-4">{loading ? "..." : customerCount}</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold">Pending Requests</h3>
          <p className="text-3xl font-bold mt-4">{loading ? "..." : pendingRequestCount}</p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-[#1E2751] mb-6">Recent Activity</h3>
        <div className="bg-white rounded-xl shadow-lg p-6">
          {loading ? (
            <p className="text-center text-gray-600">Loading recent activity...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : notifications.length === 0 ? (
            <p className="text-center text-gray-600">No recent activity found.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {notifications.map((notif) => (
                <li key={notif._id} className="py-4 flex justify-between items-center">
                  <p className="text-gray-700">
                    User{" "}
                    <span className="font-bold">{extractUsernameFromMessage(notif.message)}</span>{" "}
                    requested{" "}
                    <span className="font-bold">"{notif.relatedId?.title || "Unknown Book"}"</span>.
                  </p>
                  <span className="text-sm text-gray-500">{formatTime(notif.createdAt)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;