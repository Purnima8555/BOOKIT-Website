import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Import Font Awesome icons

const ManageBooks = () => {
  const navigate = useNavigate(); // useNavigate should be inside the component

  // Sample data for books
  const [bookList, setBookList] = useState([
    {
      id: 1,
      title: "Harry Potter and the Sorcerer's Stone",
      image: "1736876601114-harrypotterphilosopherstone.jpg",
      author: "J.K. Rowling",
      genre: "Fiction",
      price: 1299,
      availability_status: true,
      rental_price: 35,
      publisher: "Bloomsbury",
      ISBN: "9780747532699",
      description: "A young wizard embarks on his journey.",
      available_stock: 5,
      discount: 0,
    },
  ]);

  // Function to delete a book
  const deleteBook = (id) => {
    const updatedBooks = bookList.filter((book) => book.id !== id);
    setBookList(updatedBooks);
  };

  return (
    <div className="p-8 bg-gray-50 flex-grow">
      {/* Books Management Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-semibold text-[#1E2751] mb-6">Manage Books</h3>

        {/* Book Table */}
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
              <tr key={book.id} className="border-t border-gray-200">
                <td className="px-6 py-4">{book.title}</td>
                <td className="px-6 py-4">{book.author}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-4 py-2 text-sm font-semibold rounded-full ${
                      book.availability_status ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                  >
                    {book.availability_status ? "Available" : "Checked Out"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {/* Edit Icon */}
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => alert("Edit functionality not implemented yet")}
                  >
                    <FaEdit className="text-xl" />
                  </button>

                  {/* Delete Icon */}
                  <button
                    onClick={() => deleteBook(book.id)}
                    className="ml-4 text-red-600 hover:text-red-800"
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
          onClick={() => navigate("/admin/add-book")} // Navigate to BookForm
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
        >
          Add New Book
        </button>
      </div>
    </div>
  );
};

export default ManageBooks;
