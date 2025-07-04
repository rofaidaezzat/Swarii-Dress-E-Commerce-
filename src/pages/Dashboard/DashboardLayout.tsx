import React from "react";
import SidebarWithHeader from "./components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <SidebarWithHeader />
      <Outlet />
    </>
  );
};

export default DashboardLayout;
