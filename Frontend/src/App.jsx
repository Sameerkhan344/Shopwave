import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import RegisterPage from "./pages/RegisterPage";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import DashboardLayout from "./pages/Admin/DashboardLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Order from "./pages/Admin/Order";
import Users from "./pages/Admin/Users";
import Products from "./pages/Admin/Products";
// import Navbar from "./components/Navbar";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MainLayouts from "./layouts/MainLayouts";
import Profile from "./pages/Profile";
import Categories from "./pages/Admin/Categories";
import UpdateCategory from "./pages/Admin/UpdateCategory";
import AddProduct from "./pages/Admin/AddProduct";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

const routes = createBrowserRouter([
  //public routes with Navbar
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/shop", element: <Shop /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/profile", element: <Profile /> },
      { path: "/products/:productId", element: <ProductDetails /> },
      { path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <Checkout /> },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },

  //these are Admin Routes ⏬
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "order",
        element: <Order />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/add",
        element: <AddProduct />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "categories/update/:slug",
        element: <UpdateCategory />,
      },
      {
        path: "products/update/:productId",
        element: <UpdateProduct />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
};

export default App;
