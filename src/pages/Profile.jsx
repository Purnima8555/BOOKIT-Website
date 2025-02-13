import React, { useState } from 'react';
import {
  User, Package, BookOpen, Heart, CreditCard,
  Settings, LogOut, Clock, ChevronRight
} from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/api/placeholder/150/150",
    joinDate: "January 2024",
    address: "123 Book Street, Reading City, 12345",
    phone: "+1 234 567 8900",
    currentlyReading: 2,
    totalRented: 15,
    totalPurchased: 8
  };

  const recentOrders = [
    {
      id: "#ORD-2024-001",
      date: "Feb 12, 2024",
      type: "Purchase",
      items: ["The Great Gatsby", "1984"],
      total: 45.98,
      status: "Delivered"
    },
    {
      id: "#ORD-2024-002",
      date: "Feb 10, 2024",
      type: "Rental",
      items: ["Dune"],
      total: 12.99,
      status: "Active"
    }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-medium">{user.joinDate}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-4">Shipping Address</h3>
              <p>{user.address}</p>
              <button className="text-blue-600 text-sm mt-2">Edit Address</button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-4">Reading Statistics</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{user.currentlyReading}</p>
                  <p className="text-sm text-gray-600">Currently Reading</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{user.totalRented}</p>
                  <p className="text-sm text-gray-600">Total Rented</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{user.totalPurchased}</p>
                  <p className="text-sm text-gray-600">Total Purchased</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'orders':
        return (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <h3 className="font-semibold mb-4">Recent Orders</h3>
              <div className="space-y-4">
                {recentOrders.map(order => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{order.id}</span>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Date: {order.date}</p>
                      <p>Type: {order.type}</p>
                      <p>Items: {order.items.join(", ")}</p>
                      <p>Total: ${order.total}</p>
                    </div>
                    <button className="text-blue-600 text-sm mt-2 flex items-center">
                      View Details <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full"
              />
              <div className="ml-4">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-sm">
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center px-4 py-3 text-sm ${
                      activeTab === 'profile' 
                        ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <User className="w-5 h-5 mr-3" />
                    Profile
                  </button>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full flex items-center px-4 py-3 text-sm ${
                      activeTab === 'orders' 
                        ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Package className="w-5 h-5 mr-3" />
                    Orders
                  </button>
                  <button className="w-full flex items-center px-4 py-3 text-sm text-gray-600 hover:bg-gray-50">
                    <BookOpen className="w-5 h-5 mr-3" />
                    Currently Reading
                  </button>
                  <button className="w-full flex items-center px-4 py-3 text-sm text-gray-600 hover:bg-gray-50">
                    <Heart className="w-5 h-5 mr-3" />
                    Wishlist
                  </button>
                  <button className="w-full flex items-center px-4 py-3 text-sm text-gray-600 hover:bg-gray-50">
                    <CreditCard className="w-5 h-5 mr-3" />
                    Payment Methods
                  </button>
                  <button className="w-full flex items-center px-4 py-3 text-sm text-gray-600 hover:bg-gray-50">
                    <Settings className="w-5 h-5 mr-3" />
                    Settings
                  </button>
                  <button className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50">
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;