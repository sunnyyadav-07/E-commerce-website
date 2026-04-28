import { createBrowserRouter, Outlet } from "react-router";
import Register from "../features/auth/pages/Register.jsx";
import Login from "../features/auth/pages/Login.jsx";
import SelectRole from "../features/auth/pages/SelectRole.jsx";
import CreateProduct from "../features/products/pages/Seller/CreateProduct.jsx";
import SellerDashboard from "../features/products/pages/Seller/SellerDashboard.jsx";
import Protected from "../features/auth/components/Protected.jsx";
import App from "./App.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "select-role", element: <SelectRole /> },
      {
        path: "seller",
        element: (
          <Protected>
            <Outlet />
          </Protected>
        ),
        children: [
          {
            path: "create-product",
            element: <CreateProduct />,
          },
          {
            path: "dashboard",
            element: <SellerDashboard />,
          },
        ],
      },
    ],
  },
]);
