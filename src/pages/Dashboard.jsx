import React from "react";

const Dashboard = () => {
  return (
    <div className="p-8 bg-gray-50 flex-grow">
      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-gradient-to-r from-[#1E2751] to-[#223963] text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold">Total Books</h3>
          <p className="text-3xl font-bold mt-4">1,234</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold">Active Users</h3>
          <p className="text-3xl font-bold mt-4">567</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold">Pending Requests</h3>
          <p className="text-3xl font-bold mt-4">42</p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-[#1E2751] mb-6">Recent Activity</h3>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <ul className="divide-y divide-gray-200">
            <li className="py-4 flex justify-between items-center">
              <p className="text-gray-700">
                User <span className="font-bold">John Doe</span> requested <span className="font-bold">"Atomic Habits"</span>.
              </p>
              <span className="text-sm text-gray-500">2 hrs ago</span>
            </li>
            <li className="py-4 flex justify-between items-center">
              <p className="text-gray-700">
                New book <span className="font-bold">"The Great Gatsby"</span> added.
              </p>
              <span className="text-sm text-gray-500">1 day ago</span>
            </li>
            <li className="py-4 flex justify-between items-center">
              <p className="text-gray-700">
                User <span className="font-bold">Jane Smith</span> reviewed <span className="font-bold">"1984"</span>.
              </p>
              <span className="text-sm text-gray-500">3 days ago</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
