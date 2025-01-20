import React, { useState } from "react";

// Sample data for requests (You can replace this with real data from an API or state)
const requests = [
  { id: 1, user: "John Doe", bookTitle: "The Great Gatsby", requestDate: "2025-01-01", status: "Pending" },
  { id: 2, user: "Jane Smith", bookTitle: "1984", requestDate: "2025-01-02", status: "Approved" },
  { id: 3, user: "Mike Johnson", bookTitle: "To Kill a Mockingbird", requestDate: "2025-01-03", status: "Rejected" },
  { id: 4, user: "Emma Wilson", bookTitle: "Pride and Prejudice", requestDate: "2025-01-04", status: "Pending" },
];

const Requests = () => {
  const [requestList, setRequestList] = useState(requests);

  // Function to approve a request
  const approveRequest = (id) => {
    const updatedRequests = requestList.map((request) =>
      request.id === id ? { ...request, status: "Approved" } : request
    );
    setRequestList(updatedRequests);
  };

  // Function to reject a request
  const rejectRequest = (id) => {
    const updatedRequests = requestList.map((request) =>
      request.id === id ? { ...request, status: "Rejected" } : request
    );
    setRequestList(updatedRequests);
  };

  return (
    <div className="p-8 bg-gray-50 flex-grow">
      {/* Requests Management Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-semibold text-[#1E2751] mb-6">Manage Requests</h3>

        {/* Requests Table */}
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">User</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Book Title</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Request Date</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requestList.map((request) => (
              <tr key={request.id} className="border-t border-gray-200">
                <td className="px-6 py-4">{request.user}</td>
                <td className="px-6 py-4">{request.bookTitle}</td>
                <td className="px-6 py-4">{request.requestDate}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-4 py-2 text-sm font-semibold rounded-full ${
                      request.status === "Pending"
                        ? "bg-yellow-500 text-white"
                        : request.status === "Approved"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {request.status === "Pending" && (
                    <>
                      <button
                        onClick={() => approveRequest(request.id)}
                        className="text-green-600 hover:text-green-800 mr-4"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectRequest(request.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Request Button (if applicable) */}
      <div className="mt-6 flex justify-end">
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
          Add New Request
        </button>
      </div>
    </div>
  );
};

export default Requests;
