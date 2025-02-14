import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin from "./pages/admin/Admin.jsx";
import BookForm from "./pages/admin/BookForm.jsx";
import BookForm2 from "./pages/admin/BookForm2.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import ManageBooks from "./pages/admin/ManageBooks.jsx";
import Orders from "./pages/admin/Order.jsx";
import Requests from "./pages/admin/Requests.jsx";
import Settings from "./pages/admin/Settings.jsx";
import Users from "./pages/admin/Users.jsx";
import LoginRegister from "./pages/auth/LoginRegister.jsx";
import CartPage from "./pages/CartPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import FavoritesPage from "./pages/Favorite.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import Homepage from "./pages/HomePage.jsx";
import Profile from "./pages/Profile.jsx";

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
    path: "/book/:id",
    element: <DetailPage />,
  },
  {
    path: "profile",
    element: <Profile />,
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
