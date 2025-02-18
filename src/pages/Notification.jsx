import React, { useState, useEffect } from "react";
import { Bell, CheckCircle, AlertCircle, Clock, Info } from "lucide-react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case "alert": // Map "error" to "alert"
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      case "reminder": // Map "warning" to "reminder"
        return <Clock className="w-6 h-6 text-yellow-500" />;
      case "info":
        return <Info className="w-6 h-6 text-blue-500" />;
      default:
        return <Bell className="w-6 h-6 text-gray-500" />;
    }
  };

  const getGradient = (type) => {
    switch (type) {
      case "success":
        return "bg-gradient-to-r from-green-50 to-emerald-50";
      case "alert":
        return "bg-gradient-to-r from-red-50 to-rose-50";
      case "reminder":
        return "bg-gradient-to-r from-yellow-50 to-amber-50";
      case "info":
        return "bg-gradient-to-r from-blue-50 to-sky-50";
      default:
        return "bg-gradient-to-r from-gray-50 to-slate-50";
    }
  };

  const getBorder = (type) => {
    switch (type) {
      case "success":
        return "border-l-4 border-green-500";
      case "alert":
        return "border-l-4 border-red-500";
      case "reminder":
        return "border-l-4 border-yellow-500";
      case "info":
        return "border-l-4 border-blue-500";
      default:
        return "border-l-4 border-gray-500";
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId"); // Get userId for debugging
        if (!token) {
          throw new Error("Please log in to view notifications");
        }

        console.log("Fetching notifications for userId:", userId); // Debug log

        const response = await axios.get("http://localhost:3000/api/notifications/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API Response:", response.data); // Debug log

        const mappedNotifications = response.data.map((notif) => ({
          id: notif._id,
          type: notif.type === "warning" ? "reminder" : notif.type === "error" ? "alert" : notif.type,
          title: getTitle(notif.type, notif.message),
          message: notif.message,
          time: formatTime(notif.createdAt),
          unread: !notif.read,
        }));

        setNotifications(mappedNotifications);
      } catch (err) {
        console.error("Error fetching notifications:", err.response || err); // Debug log
        setError(err.response?.data?.message || err.message || "Error fetching notifications");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const getTitle = (type, message) => {
    switch (type) {
      case "success":
        return "Success";
      case "warning":
        return "Reminder";
      case "error":
        return "Alert";
      case "info":
        return "Request Update";
      default:
        return message.split(" ")[0];
    }
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

  const markAsRead = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token || !userId) {
      throw new Error("Please log in to mark notifications as read");
    }

    const response = await axios.patch(
      `http://localhost:3000/api/notifications/${id}`,
      { read: true, userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Mark as read response:", response.data); // Debug log

    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, unread: false } : notif))
    );
  } catch (err) {
    console.error("Error marking notification as read:", err);
    setError(err.response?.data?.message || "Failed to mark as read");
  }
};

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#1E2751] to-blue-600 bg-clip-text text-transparent">
                  Notifications
                </h1>
                {unreadCount > 0 && (
                  <span className="bg-gradient-to-r from-[#1E2751] to-blue-500 text-white text-sm px-3 py-1 rounded-full animate-pulse">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <Bell className="w-7 h-7 text-[#1E2751]" />
            </div>

            {loading ? (
              <p className="text-center text-gray-600 text-lg">Loading notifications...</p>
            ) : error ? (
              <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-r-lg">
                <p className="text-red-700">{error}</p>
              </div>
            ) : notifications.length === 0 ? (
              <p className="text-center text-gray-600 text-lg">No notifications found.</p>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`${getGradient(notification.type)} ${getBorder(notification.type)}
                      rounded-lg shadow-md transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl`}
                  >
                    <div className="p-4 sm:p-6 relative">
                      <div className="flex items-start gap-4">
                        <div className="mt-1 transform transition-transform duration-300 hover:rotate-12">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <h2 className="font-semibold text-gray-900 text-lg sm:text-xl">
                                {notification.title}
                              </h2>
                              {notification.unread && (
                                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                              )}
                            </div>
                            <span className="text-sm text-gray-500">{notification.time}</span>
                          </div>
                          <p className="text-gray-600 mt-2 text-sm sm:text-base leading-relaxed">
                            {notification.message}
                          </p>
                          {notification.unread && (
                            <div className="text-right mt-3">
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-blue-600 text-sm font-medium px-3 py-1 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
                              >
                                Mark as Read
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotificationPage;