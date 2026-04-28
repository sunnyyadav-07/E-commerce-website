import { Outlet } from "react-router";
import useAuth from "../features/auth/hooks/useAuth";
import { useEffect } from "react";

function App() {
  const { handleGetMe } = useAuth();
  useEffect(() => {
    (async () => {
      await handleGetMe();
    })();
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
