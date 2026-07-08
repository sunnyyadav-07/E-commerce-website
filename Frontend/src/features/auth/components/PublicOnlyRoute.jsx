import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import Loading from "../../shared/components/Loading";

const PublicOnlyRoute = () => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  if (loading) return <Loading />;

  if (user) {
    if (user.role === "seller") {
      return <Navigate to="/seller/dashboard" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicOnlyRoute;
