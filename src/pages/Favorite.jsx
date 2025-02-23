import axios from 'axios';
import { Book, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (!userId || !token) {
        setError('Please log in to view favorites');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/api/favorites/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const formattedFavorites = response.data.map(fav => ({
          id: fav._id,
          title: fav.book_id.title,
          author: fav.book_id.author,
          cover: fav.book_id.image ? `http://localhost:3000/book_images/${fav.book_id.image}` : '/default-book-cover.jpg',
          price: fav.book_id.price,
          isAvailable: fav.book_id.availability_status === 'yes',
        }));

        setFavorites(formattedFavorites);
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setFavorites([]);
          setLoading(false);
        } else {
          console.error('Error fetching favorites:', err);
          setError('Failed to load favorites. Please try again.');
          setLoading(false);
        }
      }
    };

    fetchFavorites();
  }, []);

  const removeFromFavorites = async (id) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('Please log in to remove favorites');
      return;
    }

    try {
      await axios.delete(
        `http://localhost:3000/api/favorites/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFavorites(favorites.filter((book) => book.id !== id));
    } catch (err) {
      console.error('Error removing favorite:', err);
      alert('Failed to remove favorite. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-6 flex justify-center items-center">
          <p className="text-xl text-gray-600">Loading favorites...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-6 flex justify-center items-center">
          <p className="text-xl text-red-500">{error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg pt-4 px-8 pb-8">
          <div className="flex items-center gap-3 mb-8 border-b pb-6">
            <Heart className="text-red-500 w-8 h-8" />
            <h1 className="text-3xl font-bold text-gray-800">My Favorites</h1>
          </div>

          <div className="grid gap-6">
            {favorites.map((book) => (
              <div
                key={book.id}
                className="flex gap-6 p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-gray-700"
              >
                <div className="relative group">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-[140px] h-[200px] object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{book.title}</h2>
                    <p className="text-gray-600 text-lg mb-2">{book.author}</p>
                    <p className="text-xl font-semibold text-gray-600">Rs {book.price}</p>
                  </div>

                  <div className="flex gap-4 mt-4">
                    {book.isAvailable ? (
                      <button className="flex items-center gap-2 bg-[#1E2751] text-white px-6 py-3 rounded-lg hover:bg-[#0e1e67] transition-colors duration-300 shadow-sm">
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </button>
                    ) : (
                      <button
                        className="flex items-center gap-2 bg-gray-200 text-gray-600 px-6 py-3 rounded-lg cursor-not-allowed"
                        disabled
                      >
                        <Book className="w-5 h-5" />
                        Not Available
                      </button>
                    )}
                    <button
                      onClick={() => removeFromFavorites(book.id)}
                      className="flex items-center gap-2 border-2 border-red-500 text-red-500 px-6 py-3 rounded-lg hover:bg-red-50 transition-colors duration-300"
                    >
                      <Trash2 className="w-5 h-5" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {favorites.length === 0 && (
            <div className="text-center py-16">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-500">
                Your favorites list is empty. Start browsing to add some books!
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FavoritesPage;