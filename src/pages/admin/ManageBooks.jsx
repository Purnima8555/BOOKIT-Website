import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";

const API_URL = "http://localhost:3000/api/books";

const ManageBooks = () => {
  const navigate = useNavigate();
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(API_URL);
      setBookList(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const deleteBook = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    
    try {
      await axios.delete(`${API_URL}/${id}`);
      setBookList(bookList.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-50 flex-grow">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-semibold text-[#1E2751] mb-6">Manage Books</h3>

        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Title</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Author</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookList.map((book) => (
              <tr key={book._id} className="border-t border-gray-200">
                <td className="px-6 py-4">{book.title}</td>
                <td className="px-6 py-4">{book.author}</td>
                <td className="px-6 py-4">
                  <span className={`px-4 py-2 text-sm font-semibold rounded-full ${
                    book.availability_status ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  }`}>
                    {book.availability_status ? "Available" : "Checked Out"}
                  </span>
                </td>
                <td className="px-6 py-4 flex">
                  {/* Edit Button */}
                  <button
                    className="text-blue-600 hover:text-blue-800 mr-4"
                    onClick={() => navigate(`/admin/update-book/${book._id}`)}
                  >
                    <FaEdit className="text-xl" />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteBook(book._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrashAlt className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Book Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => navigate("/admin/add-book")}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
        >
          Add New Book
        </button>
      </div>
    </div>
  );
};

export default ManageBooks;
