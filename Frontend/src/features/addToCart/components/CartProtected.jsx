import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const CartProtected = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default CartProtected;
