import { Outlet } from "react-router";
import useAuth from "../features/auth/hooks/useAuth";
import { useEffect } from "react";

function App() {
  
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
