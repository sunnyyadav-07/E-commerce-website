import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const PublicOnlyRoute = () => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  if (loading) return <h1>Loading...</h1>;

  if (user) {
    if (user.role === "seller") {
      return <Navigate to="/seller/dashboard" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicOnlyRoute;
