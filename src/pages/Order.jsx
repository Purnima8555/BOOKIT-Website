import React from "react";

const Orders = () => {
  // Sample data for orders (You can replace this with real data from an API or state)
  const orders = [
    { id: 1, orderId: "ORD001", user: "John Doe", status: "Shipped", date: "2025-01-10" },
    { id: 2, orderId: "ORD002", user: "Jane Smith", status: "Processing", date: "2025-01-11" },
    { id: 3, orderId: "ORD003", user: "Mike Johnson", status: "Delivered", date: "2025-01-12" },
    { id: 4, orderId: "ORD004", user: "Emma Wilson", status: "Cancelled", date: "2025-01-13" },
  ];

  return (
    <div className="p-8 bg-gray-50 flex-grow">
      {/* Orders List Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-semibold text-[#1E2751] mb-6">Orders</h3>

        {/* Order Table */}
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Order ID</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">User</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Date</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-gray-200">
                <td className="px-6 py-4">{order.orderId}</td>
                <td className="px-6 py-4">{order.user}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-4 py-2 text-sm font-semibold rounded-full ${
                      order.status === "Shipped"
                        ? "bg-green-500 text-white"
                        : order.status === "Processing"
                        ? "bg-yellow-500 text-white"
                        : order.status === "Delivered"
                        ? "bg-blue-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800">View</button>
                  <button className="ml-4 text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Order Button */}
      <div className="mt-6 flex justify-end">
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
          Add New Order
        </button>
      </div>
    </div>
  );
};

export default Orders;
