import React, { useState } from "react";

// Sample data for books (You can replace this with real data from an API or state)
const books = [
  { 
    id: 1, title: "Harry Potter and the Sorcerer's Stone", 
    image: "1736876601114-harrypotterphilosopherstone.jpg", 
    author: "J.K. Rowling", genre: "Fiction", price: 1299, 
    availability_status: true, rental_price: 35, publisher: "Bloomsbury", 
    ISBN: "9780747532699", description: "A young wizard embarks on his journey.", 
    available_stock: 5, discount: 0
  },
  // Add other books here
];

const ManageBooks = () => {
  const [bookList, setBookList] = useState(books);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  // Function to open the edit modal
  const editBook = (id) => {
    const bookToEdit = bookList.find((book) => book.id === id);
    setCurrentBook(bookToEdit);
    setIsModalOpen(true);
  };

  // Function to handle the form submission
  const handleSaveChanges = () => {
    const updatedBooks = bookList.map((book) =>
      book.id === currentBook.id ? currentBook : book
    );
    setBookList(updatedBooks);
    setIsModalOpen(false);
  };

  // Handle changes in the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDiscountChange = (e) => {
    const { value } = e.target;
    setCurrentBook((prev) => ({
      ...prev,
      discount: value === "yes" ? 10 : 0, // Example: 10% discount
    }));
  };

  // Handle discount fields visibility
  const handleDiscountDetailsChange = (e) => {
    const { name, value } = e.target;
    setCurrentBook((prev) => ({
      ...prev,
      discountDetails: {
        ...prev.discountDetails,
        [name]: value,
      },
    }));
  };

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
                  <button
                    onClick={() => editBook(book.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBook(book.id)}
                    className="ml-4 text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Book Button */}
      <div className="mt-6 flex justify-end">
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
          Add New Book
        </button>
      </div>

      {/* Edit Book Modal */}
      {isModalOpen && currentBook && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-1/3 relative max-h-[90vh] overflow-y-auto">
            {/* Cross icon to close the modal */}
            <button
              className="absolute top-2 right-2 text-xl text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>

            <h2 className="text-2xl font-semibold mb-6">Edit Book</h2>

            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={currentBook.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input
                  type="text"
                  name="image"
                  value={currentBook.image}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Author</label>
                <input
                  type="text"
                  name="author"
                  value={currentBook.author}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={currentBook.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Discount</label>
                <div className="flex items-center">
                  <label className="mr-4">
                    <input
                      type="radio"
                      name="discount"
                      value="yes"
                      onChange={handleDiscountChange}
                      checked={currentBook.discount > 0}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="discount"
                      value="no"
                      onChange={handleDiscountChange}
                      checked={currentBook.discount === 0}
                    />
                    No
                  </label>
                </div>
              </div>

              {/* Show discount fields if "Yes" is selected */}
              {currentBook.discount > 0 && (
                <div className="mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Discount Type</label>
                    <input
                      type="text"
                      name="type"
                      value={currentBook.discountDetails?.type || ""}
                      onChange={handleDiscountDetailsChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">Discount Value (%)</label>
                    <input
                      type="number"
                      name="value"
                      value={currentBook.discountDetails?.value || ""}
                      onChange={handleDiscountDetailsChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={currentBook.discountDetails?.startDate || ""}
                      onChange={handleDiscountDetailsChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={currentBook.discountDetails?.endDate || ""}
                      onChange={handleDiscountDetailsChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleSaveChanges}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBooks;
