import React from "react";

const Users = () => {
  // Sample data for users (You can replace this with real data from an API or state)
  const users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", status: "Inactive" },
    { id: 3, name: "Mike Johnson", email: "mike.johnson@example.com", status: "Active" },
    { id: 4, name: "Emma Wilson", email: "emma.wilson@example.com", status: "Inactive" },
  ];

  return (
    <div className="p-8 bg-gray-50 flex-grow">
      {/* Users List Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-semibold text-[#1E2751] mb-6">Users</h3>

        {/* User Table */}
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-gray-200">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-4 py-2 text-sm font-semibold rounded-full ${
                      user.status === "Active" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800">View</button>
                  <button className="ml-4 text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Button */}
      <div className="mt-6 flex justify-end">
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
          Add New User
        </button>
      </div>
    </div>
  );
};

export default Users;
