import React from "react";
import { Outlet } from "react-router-dom";
import EmployerNavbar from "../EmployerPages/Components/EmployerNavbar";
import Footer from "../PublicPages/Components/Footer";

const EmployerPages = () => {
  return (
    <>
      <EmployerNavbar />
      <h2 className="text-center text-5xl font-extrabold">
        Employer Dashboard
      </h2>
      <Outlet />
      <Footer/>
    </>
  );
};

export default EmployerPages;
