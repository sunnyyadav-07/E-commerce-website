import React from "react";
import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default AppLayout;
