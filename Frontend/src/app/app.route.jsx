import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register.jsx";
import Login from "../features/auth/pages/Login.jsx";
import SelectRole from "../features/auth/pages/SelectRole.jsx";
import CreateProduct from "../features/products/pages/Seller/CreateProduct.jsx";
import SellerDashboard from "../features/products/pages/Seller/SellerDashboard.jsx";

export const router = createBrowserRouter([
  { path: "/", element: <h1>Hello world</h1> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/select-role", element: <SelectRole /> },
  {
    path: "/seller",
    children: [
      { path: "create-product", element: <CreateProduct /> },
      { path: "dashboard", element: <SellerDashboard /> },
    ],
  },
]);
