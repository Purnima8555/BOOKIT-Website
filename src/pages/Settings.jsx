import React, { useState } from "react";

// Sample data for settings (You can replace this with real data from an API or state)
const initialSettings = {
  username: "admin",
  email: "admin@example.com",
  password: "",
  notifications: true,
};

const Settings = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  // Handle password change
  const handlePasswordChange = () => {
    if (newPassword === confirmPassword) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        password: newPassword,
      }));
      setNewPassword("");
      setConfirmPassword("");
      alert("Password updated successfully!");
    } else {
      alert("Passwords do not match.");
    }
  };

  // Handle notifications toggle
  const handleNotificationsToggle = () => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      notifications: !prevSettings.notifications,
    }));
  };

  return (
    <div className="p-8 bg-gray-50 flex-grow">
      {/* Settings Management Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-semibold text-[#1E2751] mb-6">Settings</h3>

        {/* Account Settings Form */}
        <div className="space-y-6">
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

          <div>
            <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mt-2 p-3 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-2 p-3 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
            />
          </div>

          <div className="flex items-center mt-6">
            <input
              type="checkbox"
              id="notifications"
              checked={settings.notifications}
              onChange={handleNotificationsToggle}
              className="h-5 w-5 text-[#1E2751] border-gray-300 rounded"
            />
            <label htmlFor="notifications" className="ml-3 text-sm font-semibold text-gray-700">
              Enable Notifications
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handlePasswordChange}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
