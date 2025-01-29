import React, { useState } from "react";

// Sample data for settings (You can replace this with real data from an API or state)
const initialSettings = {
  fullName: "John Doe",
  username: "admin",
  email: "admin@example.com",
  contactNo: "123-456-7890",
  role: "Admin",
  address: "123 Main Street",
};

const Settings = () => {
  const [settings, setSettings] = useState(initialSettings);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  // Handle delete account action
  const handleDeleteAccount = () => {
    // Add logic to delete account (e.g., making an API call)
    alert("Account deleted!");
  };

  return (
    <div className="p-8 bg-gray-50 flex-grow">
      {/* Settings Management Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 w-3/4 mx-auto"> {/* Adjusted width here */}
        <h3 className="text-2xl font-semibold text-[#1E2751] mb-6">Settings</h3>

        {/* Account Settings Form */}
        <div className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={settings.fullName}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
            />
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={settings.username}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={settings.email}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
            />
          </div>

          {/* Contact No. */}
          <div>
            <label htmlFor="contactNo" className="block text-sm font-semibold text-gray-700">
              Contact No.
            </label>
            <input
              type="text"
              id="contactNo"
              name="contactNo"
              value={settings.contactNo}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
            />
          </div>

          {/* Role Dropdown */}
          <div>
            <label htmlFor="role" className="block text-sm font-semibold text-gray-700">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={settings.role}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-semibold text-gray-700">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={settings.address}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
              rows="4"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            className="px-6 py-3 bg-[#1E2751] text-white font-semibold rounded-lg shadow-md hover:bg-[#1E2751]">
            Save Changes
          </button>
        </div>

        {/* Delete Account Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleDeleteAccount}
            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
