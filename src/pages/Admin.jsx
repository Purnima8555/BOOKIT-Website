import React from "react";
import { Outlet, Link } from "react-router-dom";
import { FaChartPie, FaBook, FaUser, FaTruck, FaBell, FaCog, FaSignOutAlt } from "react-icons/fa";

const Admin = () => {
  return (
    <div className="flex h-screen bg-gradient-to-r from-gray-100 via-white to-gray-100">
      {/* Sidebar */}
      <div className="w-72 bg-[#1E2751] text-white flex flex-col shadow-lg">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-700 flex items-center space-x-4">
          <img
            src="/src/assets/images/no_bg_logo.png" // Replace with your logo path
            alt="BookIt Logo"
            className="w-20 h-17 rounded-full border-2 border-white"
          />
          <h1 className="text-2xl font-bold tracking-wide">BookIt!</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-grow px-6 py-4">
          <ul className="space-y-4">
            <li className="flex items-center py-2 px-4 bg-[#223963] rounded-lg cursor-pointer hover:bg-[#2E4A78]">
              <FaChartPie className="text-lg mr-3" />
              <Link to="dashboard" className="text-lg">
                Dashboard
              </Link>
            </li>
            <li className="flex items-center py-2 px-4 hover:bg-[#2E4A78] rounded-lg cursor-pointer">
              <FaBook className="text-lg mr-3" />
              <Link to="manage-books" className="text-lg">
                Manage Books
              </Link>
            </li>
            <li className="flex items-center py-2 px-4 hover:bg-[#2E4A78] rounded-lg cursor-pointer">
              <FaUser className="text-lg mr-3" />
              <Link to="users" className="text-lg">
                Users
              </Link>
            </li>
            <li className="flex items-center py-2 px-4 hover:bg-[#2E4A78] rounded-lg cursor-pointer">
              <FaTruck className="text-lg mr-3" />
              <Link to="orders" className="text-lg">
                Orders
              </Link>
            </li>
            <li className="flex items-center py-2 px-4 hover:bg-[#2E4A78] rounded-lg cursor-pointer">
              <FaBell className="text-lg mr-3" />
              <Link to="requests" className="text-lg">
                Requests
              </Link>
            </li>
            <li className="flex items-center py-2 px-4 hover:bg-[#2E4A78] rounded-lg cursor-pointer">
              <FaCog className="text-lg mr-3" />
              <Link to="settings" className="text-lg">
                Settings
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="px-6 py-4">
          <button className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg text-white font-semibold flex items-center justify-center shadow-md">
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col overflow-hidden"> {/* Added overflow-hidden */}
        {/* Top Bar */}
        <div className="bg-white shadow-md p-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-[#1E2751]">
            Welcome Back, Admin
          </h2>
          <div className="flex items-center space-x-6">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 p-3 rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751] text-gray-800 placeholder-gray-500"
            />
            <img
              src="https://via.placeholder.com/40"
              alt="Admin Avatar"
              className="w-12 h-12 rounded-full shadow-md"
            />
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="p-8 flex-grow overflow-y-auto"> {/* Added overflow-y-auto */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
