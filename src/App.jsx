import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginRegister from "./pages/LoginRegister.jsx";
import Homepage from "./pages/HomePage.jsx";
import CartPage from "./pages/CartPage.jsx";
import FavoritesPage from "./pages/Favorite.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";

const router = createBrowserRouter([
  {
    path: "/loginRegister",
    element: <LoginRegister />,
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
