import { Outlet, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import Loading from "../../features/shared/components/Loading";
const Protected = () => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const location = useLocation();
  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" state={{from:location}} replace />;
  return <Outlet />;
};

export default Protected;
