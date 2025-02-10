import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginRegister from "./pages/LoginRegister.jsx";
import Homepage from "./pages/HomePage.jsx";
import CartPage from "./pages/CartPage.jsx";
import FavoritesPage from "./pages/Favorite.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Admin from "./pages/Admin.jsx";
import Dashboard from "./pages/Dashboard.jsx"; // Import Dashboard
import Users from "./pages/Users.jsx";
import Orders from "./pages/Order.jsx";
import ManageBooks from "./pages/ManageBooks.jsx";
import Requests from "./pages/Requests.jsx";
import Settings from "./pages/Settings.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import BookForm from "./pages/BookForm.jsx";
import BookForm2 from "./pages/BookForm2.jsx";

const router = createBrowserRouter([
  {
    path: "/loginRegister",
    element: <LoginRegister />,
  },
  {
    path: "/forgotpwd",
    element: <ForgotPassword />,
  },
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/favorite",
    element: <FavoritesPage />,
  },
  {
    path: "/category",
    element: <CategoryPage />,
  },
  {
    path: "/contact-us",
    element: <ContactUs />,
  },
  {
    path: "/book/:bookId",
    element: <DetailPage />,
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "manage-books",
        element: <ManageBooks />,
      },
      {
        path: "requests",
        element: <Requests />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
      path: "add-book",
      element: <BookForm />,
      },
      {
      path: "update-book/:id",
      element: <BookForm2 />,
      },
    ],
  },
]);

// Initialize the QueryClient
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
