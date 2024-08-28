import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../PublicPages/Components/Footer";
import DashboardNavbar from "../UserDashboard/DashboardNavbar";

const Dashboard = () => {
  return (
    <>
      <DashboardNavbar />
      <h2 className="text-center text-5xl font-extrabold">
        Dashboard
      </h2>
      <Outlet />
      <Footer/>
    </>
  );
};

export default Dashboard;
