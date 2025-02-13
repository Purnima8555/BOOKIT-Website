import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import Select from 'react-select';

const BookForm2 = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    console.log("Book ID from useParams:", id); // Log the ID

    const [book, setBook] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [newImage, setNewImage] = useState(null);

    const genreOptions = [
    { value: 'Art & Photography', label: 'Art & Photography' },
    { value: 'Biography', label: 'Biography' },
    { value: 'Business', label: 'Business' },
    { value: 'Children', label: 'Children' },
    { value: 'Drama', label: 'Drama' },
    { value: 'Educational', label: 'Educational' },
    { value: 'Fantasy', label: 'Fantasy' },
    { value: 'Horror', label: 'Horror' },
    { value: 'Mystery', label: 'Mystery' },
    { value: 'Romance', label: 'Romance' },
    { value: 'Science', label: 'Science' },
    { value: 'Self-help', label: 'Self-help' }
];
    
    useEffect(() => {
        if (!id) {
            console.error("Book ID is missing!");
            return;
        }

        axios.get(`http://localhost:3000/api/books/${id}`)
        .then(response => {
            console.log("Fetched Book:", response.data);

            const book = response.data;

            // Format dates if they exist
            if (book.discount_start) {
                book.discount_start = format(new Date(book.discount_start), "MM/dd/yyyy");
            }
            if (book.discount_end) {
                book.discount_end = format(new Date(book.discount_end), "MM/dd/yyyy");
            }

            setBook(book);
        })
    }, [id]);

    // Handle form submission to update book
    const handleSubmit = async (e) => {
    e.preventDefault();

    // If there's a new image to upload, include it in the form data
    const formData = new FormData();
    formData.append("title", book.title);
    formData.append("author", book.author);
    formData.append("genre", book.genre);
    formData.append("publisher", book.publisher);
    formData.append("ISBN", book.ISBN);
    formData.append("series", book.series);
    formData.append("price", book.price);
    formData.append("rental_price", book.rental_price);
    formData.append("description", book.description);
    formData.append("availability_status", book.availability_status);
    formData.append("available_stock", book.available_stock);
    formData.append("hasDiscount", book.hasDiscount);
    formData.append("discount_type", book.discount_type);
    formData.append("discount_percent", book.discount_percent);
    formData.append("discount_start", book.discount_start);
    formData.append("discount_end", book.discount_end);
    
    if (newImage) {
        formData.append("file", newImage); // Add the new image to the form data if it exists
    }

    try {
        const response = await axios.put(`http://localhost:3000/api/books/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data", // Ensure the correct content type for form data
            },
        });

        console.log("Book updated:", response.data);
        alert('Book updated successfully');
        navigate('/admin/manage-books'); // Navigate to another route (e.g., book listing page)
    } catch (error) {
        console.error("Error updating book:", error);
    }
};

    // Handle genre change
    const handleGenreChange = (selectedGenres) => {
        // Extract the values of the selected genres
        const genres = selectedGenres ? selectedGenres.map((option) => option.value) : [];
        setBook((prevBook) => ({
            ...prevBook,
            genre: genres,
        }));
    };

    // Handle input change and update state
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value, // Dynamically update the correct field
        }));
    };

    const handleDiscountChange = (e) => {
        setBook({ ...book, hasDiscount: e.target.value === "yes" });
    };

    // Handle image change
    const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
    setNewImage(file);
    setImagePreview(URL.createObjectURL(file)); // Show preview
    }
};
    
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            {book ? (
                <div className="bg-white rounded-xl shadow-lg p-6 w-3/4 mx-auto">
                    <h1 className="text-2xl font-semibold text-center text-[#1E2751] mb-6">Edit Book Information</h1>
                    {/* Update Book Form */}
                    <form onSubmit={handleSubmit}>
                        {/* Image Upload Section */}
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-48 h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                                {imagePreview || book.image ? (
                                <img src={
                                    imagePreview
                                    ? imagePreview
                                    : `http://localhost:3000/book_images/${book.image}`
                                }
                                alt="Book Cover"
                                className="w-full h-full object-cover"
                                />
                                ) : (
                                    <div className="text-center p-4">
                                        <p className="text-gray-500">Upload Book Cover</p>
                                        <p className="text-sm text-gray-400">(Max size: 5MB)</p>
                                    </div>
                                )}
                            </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="image-upload"
                                    />
                                <label
                                    htmlFor="image-upload"
                                    className="bg-blue-50 text-blue-600 px-4 py-2 rounded-md cursor-pointer hover:bg-blue-100"
                                >
                                Choose Image
                                </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700" htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={book.title}
                                onChange={handleInputChange}
                                className="w-full mt-2 p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
                                placeholder="Enter book title"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700" htmlFor="author">Author:</label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                value={book.author}
                                onChange={handleInputChange}
                                className="w-full mt-2 p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
                                placeholder="Enter author's name"
                            />
                        </div>
                        {/* Genre Multi-Select Dropdown */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700">Genre:</label>
                                <Select
                                    options={genreOptions}
                                    isMulti
                                    value={genreOptions.filter(option => book.genre.includes(option.value))}
                                    onChange={handleGenreChange}
                                    className="mt-2"
                                />
                            </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700" htmlFor="publisher">Publisher:</label>
                            <input
                                type="text"
                                id="publisher"
                                name="publisher"
                                value={book.publisher}
                                onChange={handleInputChange}
                                className="w-full mt-2 p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
                                placeholder="Enter book publisher"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700" htmlFor="publisher">ISBN:</label>
                            <input
                                type="text"
                                id="ISBN"
                                name="ISBN"
                                value={book.ISBN}
                                onChange={handleInputChange}
                                className="w-full mt-2 p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
                                placeholder="Enter book ISBN"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700" htmlFor="publisher">Series:</label>
                            <input
                                type="text"
                                id="series"
                                name="series"
                                value={book.series}
                                onChange={handleInputChange}
                                className="w-full mt-2 p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
                                placeholder="Enter book series"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700" htmlFor="price">Price (Rs.):</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={book.price}
                                onChange={handleInputChange}
                                className="w-full mt-2 p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
                                placeholder="Enter book price"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700" htmlFor="rental_price">Rental Price (Rs./day):</label>
                            <input
                                type="number"
                                id="rental_price"
                                name="rental_price"
                                value={book.rental_price}
                                onChange={handleInputChange}
                                className="w-full mt-2 p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
                                placeholder="Enter book rental price"
                            />
                        </div>
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700" htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                value={book.description}
                                onChange={handleInputChange}
                                className="w-full mt-2 p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
                                placeholder="Enter book description"
                            />
                        </div>
                        {/* Availability Status */}
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700">Availability Status</label>
                            <div className="flex gap-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="availability_status"
                                        value="yes"
                                        checked={book.availability_status === 'yes'}
                                        onChange={handleInputChange}
                                        className="mr-2"
                                    />
                                    Yes
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="availability_status"
                                        value="no"
                                        checked={book.availability_status === 'no'}
                                        onChange={handleInputChange}
                                        className="mr-2"
                                    />
                                    No
                                </label>
                            </div>
                        </div>

                        {/* Conditionally render available stock input */}
                        {book.availability_status === 'yes' && (
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700" htmlFor="available_stock">Available Stock</label>
                                <input
                                    type="number"
                                    id="available_stock"
                                    name="available_stock"
                                    value={book.available_stock}
                                    onChange={handleInputChange}
                                    className="w-full mt-2 p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
                                    required
                                    min="0"
                                />
                            </div>
                        )}
                        {/* Discount Section */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700">Apply Discount?</label>
                    <div className="mt-2 flex space-x-4">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="hasDiscount"
                                value="yes"
                                checked={book.hasDiscount === true}
                                onChange={handleDiscountChange}
                                className="mr-2"
                            />
                            Yes
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="hasDiscount"
                                value="no"
                                checked={book.hasDiscount === false}
                                onChange={handleDiscountChange}
                                className="mr-2"
                            />
                            No
                        </label>
                    </div>

                    {/* Show discount fields only if 'Yes' is selected */}
                    {book.hasDiscount && (
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700">Discount Type:</label>
                                <input
                                    type="text"
                                    name="discount_type"
                                    value={book.discount_type}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700">Discount Percent:</label>
                                <input
                                    type="number"
                                    name="discount_percent"
                                    value={book.discount_percent}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700">Discount Start:</label>
                                <input
                                    type="text"
                                    name="discount_start"
                                    value={book.discount_start || ""}
                                    onChange={handleInputChange}
                                    placeholder="mm/dd/yyyy"
                                    className="w-full p-2 border rounded-md bg-gray-200 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700">Discount End:</label>
                                <input
                                    type="text"
                                    name="discount_end"
                                    value={book.discount_end || ""}
                                    onChange={handleInputChange}
                                    placeholder="mm/dd/yyyy"
                                    className="w-full p-2 border rounded-md bg-gray-200 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
                                />
                            </div>
                        </div>
                    )}
                </div>

                        <button
                            type="submit"
                            className="bg-[#1E2751] text-white px-6 py-2 rounded-md hover:bg-[#1E2751] mt-10"
                        >
                            Update Book
                        </button>
                    </form>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default BookForm2;
