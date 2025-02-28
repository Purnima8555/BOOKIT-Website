import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const BookForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: [],
    price: '',
    rental_price: '',
    publisher: '',
    ISBN: '',
    description: '',
    series: '',
    isAvailable: 'no',
    available_stock: '',
    hasDiscount: 'no',
    discount_type: '',
    discount_percent: '',
    discount_start: '',
    discount_end: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);

  const genres = [
    "Art & Photography", "Biography", "Business", "Children", "Drama",
    "Educational", "Fantasy", "Horror", "Mystery", "Romance", "Science", "Self-help"
  ];
  
  const genreOptions = genres.map(g => ({ value: g, label: g }));
  
  const handleGenreChange = (selectedOptions) => {
    setFormData(prev => ({
      ...prev,
      genre: selectedOptions.map(option => option.value)
    }));
  };

  const handleInputChange = (e) => {
  const { name, value } = e.target;

  setFormData(prev => {
    const updatedData = { ...prev, [name]: value };

    // Always recalculate rental_price when price changes
    if (name === 'price') {
      const priceValue = parseFloat(value);
      if (!isNaN(priceValue)) {
        updatedData.rental_price = Math.round(priceValue * 0.05);
      }
    }

    return updatedData;
  });
};

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      if (key === 'image' && value) {
        formDataToSend.append('file', value);
      } else if (key === 'genre') {
        formDataToSend.append('genre', JSON.stringify(value));
      } else {
        formDataToSend.append(key, value);
      }
    }

    try {
      const response = await axios.post('http://localhost:3000/api/books', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log(response.data);
      alert('Book added successfully');
      setFormData({
        title: '',
        author: '',
        genre: [],
        price: '',
        rental_price: '',
        publisher: '',
        ISBN: '',
        description: '',
        series: '',
        isAvailable: 'no',
        available_stock: '',
        hasDiscount: 'no',
        discount_type: '',
        discount_percent: '',
        discount_start: '',
        discount_end: '',
        image: null
      });
      setImagePreview(null);
    } catch (error) {
      console.error(error);
      alert('Error adding book');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-3/4 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-[#1E2751] mb-6">Book Detail Form:</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-48 h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
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

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full mt-2 p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="w-full mt-2 p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
                required
              />
            </div>

            {/* Genre Multi-Select */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Genre</label>
            <Select
              options={genreOptions}
              isMulti
              value={genreOptions.filter(option => formData.genre.includes(option.value))}
              onChange={handleGenreChange}
              className="mt-2"
            />
          </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Publisher</label>
              <input
                type="text"
                name="publisher"
                value={formData.publisher}
                onChange={handleInputChange}
                className="w-full mt-2 p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">ISBN</label>
              <input
                type="text"
                name="ISBN"
                value={formData.ISBN}
                onChange={handleInputChange}
                className="w-full mt-2 p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Series</label>
              <input
                type="text"
                name="series"
                value={formData.series}
                onChange={handleInputChange}
                className="w-full mt-2 p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Price (Rs.)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full mt-2 p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
                required
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Rental Price (Rs./day)</label>
              <input
                type="number"
                name="rental_price"
                value={formData.rental_price}
                onChange={handleInputChange}
                className="w-full mt-2 p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
                required
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className="w-full mt-2 p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
              required
            />
          </div>

          {/* Availability Status */}
          <div className="space-y-4">
            <div>
              <p className="block text-sm font-semibold text-gray-700">Availability Status</p>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="isAvailable"
                    value="yes"
                    checked={formData.isAvailable === 'yes'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="isAvailable"
                    value="no"
                    checked={formData.isAvailable === 'no'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {formData.isAvailable === 'yes' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700">Available Stock</label>
                <input
                  type="number"
                  name="available_stock"
                  value={formData.available_stock}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
                  required
                  min="0"
                />
              </div>
            )}
          </div>

          {/* Discount */}
          <div className="space-y-4">
            <div>
              <p className="block text-sm font-semibold text-gray-700">Discount Available</p>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasDiscount"
                    value="yes"
                    checked={formData.hasDiscount === 'yes'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasDiscount"
                    value="no"
                    checked={formData.hasDiscount === 'no'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {formData.hasDiscount === 'yes' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Discount Occasion</label>
                    <input
                      type="text"
                      name="discount_type"
                      value={formData.discount_type}
                      onChange={handleInputChange}
                      className="w-full mt-2 p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Discount Percentage</label>
                    <input
                      type="number"
                      name="discount_percent"
                      value={formData.discount_percent}
                      onChange={handleInputChange}
                      className="w-full mt-2 p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
                      required
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Discount Start Date</label>
                    <input
                      type="date"
                      name="discount_start"
                      value={formData.discount_start}
                      onChange={handleInputChange}
                      className="w-full mt-2 p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Discount End Date</label>
                    <input
                      type="date"
                      name="discount_end"
                      value={formData.discount_end}
                      onChange={handleInputChange}
                      className="w-full mt-2 p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2751]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#1E2751] text-white px-6 py-2 rounded-md hover:bg-[#1E2751]"
            >
              Submit Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
