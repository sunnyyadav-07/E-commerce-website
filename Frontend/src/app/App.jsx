import { RouterProvider } from "react-router";
import { router } from "../routes/app.route";
import { useEffect } from "react";
import useAuth from "../features/auth/hooks/useAuth";
import { Toaster } from "react-hot-toast";

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
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
