import React, { useState } from 'react';
import { Bell, CheckCircle, AlertCircle, Clock, Info } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Purchase Successful',
      message: 'Your purchase of "The Great Gatsby" has been confirmed. Order #12345',
      time: '2 minutes ago',
      unread: true,
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Rental Due Soon',
      message: 'Your rental of "1984" is due in 2 days. Please return or extend your rental.',
      time: '1 hour ago',
      unread: true,
    },
    {
      id: 3,
      type: 'alert',
      title: 'Late Return Notice',
      message: 'Your rental of "To Kill a Mockingbird" is overdue. Please return it to avoid additional charges.',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 4,
      type: 'info',
      title: 'New Book Available',
      message: 'A book from your wishlist "Dune" is now available for purchase or rental.',
      time: '1 day ago',
      unread: false,
    }
  ]);

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'alert':
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      case 'reminder':
        return <Clock className="w-6 h-6 text-yellow-500" />;
      case 'info':
        return <Info className="w-6 h-6 text-blue-500" />;
      default:
        return <Bell className="w-6 h-6 text-gray-500" />;
    }
  };

  const getGradient = (type) => {
    switch (type) {
      case 'success':
        return 'bg-gradient-to-r from-green-50 to-emerald-50';
      case 'alert':
        return 'bg-gradient-to-r from-red-50 to-rose-50';
      case 'reminder':
        return 'bg-gradient-to-r from-yellow-50 to-amber-50';
      case 'info':
        return 'bg-gradient-to-r from-blue-50 to-sky-50';
      default:
        return 'bg-gradient-to-r from-gray-50 to-slate-50';
    }
  };

  const getBorder = (type) => {
    switch (type) {
      case 'success':
        return 'border-l-4 border-green-500';
      case 'alert':
        return 'border-l-4 border-red-500';
      case 'reminder':
        return 'border-l-4 border-yellow-500';
      case 'info':
        return 'border-l-4 border-blue-500';
      default:
        return 'border-l-4 border-gray-500';
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, unread: false } : notif
    ));
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Notifications
                </h1>
                {unreadCount > 0 && (
                  <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm px-3 py-1 rounded-full animate-pulse">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <Bell className="w-6 h-6 text-purple-600" />
            </div>

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
                          <span className="text-sm text-gray-500">
                            {notification.time}
                          </span>
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
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotificationPage;