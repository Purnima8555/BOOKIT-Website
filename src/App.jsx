import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin from "./pages/admin/Admin.jsx";
import BookForm from "./pages/admin/BookForm.jsx";
import BookForm2 from "./pages/admin/BookForm2.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import ManageBooks from "./pages/admin/ManageBooks.jsx";
import Orders from "./pages/admin/Order.jsx";
import Requests from "./pages/admin/Requests.jsx";
import UserForm from "./pages/admin/UserForm.jsx";
import Users from "./pages/admin/Users.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import LoginRegister from "./pages/auth/LoginRegister.jsx";
import TermsAndConditions from "./pages/auth/TermsandCondition.jsx";
import BestSellersPage from "./pages/BestSeller.jsx";
import BookRequest from "./pages/BookRequest.jsx";
import CartPage from "./pages/CartPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import FavoritesPage from "./pages/Favorite.jsx";
import Homepage from "./pages/HomePage.jsx";
import NewArrivalsPage from "./pages/NewArrival.jsx";
import NotificationPage from "./pages/Notification.jsx";
import Profile from "./pages/Profile.jsx";
import BuyNow from "./pages/BuyNow.jsx";

const router = createBrowserRouter([
  {
    path: "/loginRegister",
    element: <LoginRegister />,
  },
  {
    path: "/password-reset",
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
    path: "/buy",
    element: <BuyNow />,
  },
  {
    path: "/favorite",
    element: <FavoritesPage />,
  },
  {
    path: "/genre",
    element: <CategoryPage />,
  },
  {
    path: "/genre/:genre",
    element: < CategoryPage />
  },
  {
    path: "/book/:id",
    element: <DetailPage />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/newArrivals",
    element: <NewArrivalsPage />,
  },
  {
    path: "/bestSeller",
    element: <BestSellersPage />,
  },
  {
    path: "/notifications",
    element: <NotificationPage />,
  },
  {
    path: "/terms-and-conditions",
    element: <TermsAndConditions />,
  },
  {
    path: "/bookRequest",
    element: <BookRequest />,
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
        path: "userForm",
        element: <UserForm />,
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
