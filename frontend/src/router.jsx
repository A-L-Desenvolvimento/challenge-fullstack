import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./components/AuthLayout.jsx";
import Login from "./views/login.jsx";
import Register from "./views/register.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import Products from "./views/products.jsx";
import FormProduct from "./views/formProduct.jsx";
import ShowProduct from "./views/showProduct.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Products />,
      },
      {
        path: "/products/create",
        element: (
          <PrivateRoute>
            <FormProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/products/edit" + "/:id",
        element: (
          <PrivateRoute>
            <FormProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/products/show" + "/:id",
        element: <ShowProduct />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
