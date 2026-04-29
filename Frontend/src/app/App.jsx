import { RouterProvider } from "react-router";
import { router } from "./app.route";
import { useEffect } from "react";
import useAuth from "../features/auth/hooks/useAuth";


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
    </>
  );
}

export default App;
