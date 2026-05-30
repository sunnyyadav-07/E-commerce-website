import { RouterProvider } from "react-router";
import { router } from "./app.route";
import { useEffect } from "react";
import useAuth from "../features/auth/hooks/useAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { handleGetMe } = useAuth();
  useEffect(() => {
    (async () => {
      await handleGetMe();
    })();
  }, []);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </>
  );
}

export default App;
