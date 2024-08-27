import React from "react";
import { NavLink } from "react-router-dom";

const EmployerNavbar = () => {
    const EmployerOptions=<>
    <li>
        <NavLink to={'/employer/home'}>
            Employer Home
        </NavLink>
    </li>
    {/* view all job and create new job */}
    <li>
        <NavLink to={'/employer/job'}>
            Manage job posts
        </NavLink>
    </li>
    {/* all application and job specific application */}
    <li>
        <NavLink to={'/employer/applicants'}>
            View Applicants
        </NavLink>
    </li>
    {/* edit */}
    <li>
        <NavLink to={'/employer/profile'}>
            Company Profile
        </NavLink>
    </li>
    {/* accessible by all type of user */}
    <li>
        <NavLink to={'/help'}>
            Help
        </NavLink>
    </li>
    </>
  return (
    <div className="navbar bg-base-100 container mx-auto h-20 pt-3">
      <div className="flex-1 h-full">
      <a className="btn btn-ghost text-xl h-full" href="/employer/home">
            <img src="https://i.ibb.co/wzQv92d/pnlogo.jpg" alt="" className="h-full w-full"/>
          </a>
      </div>
      <div className="flex-none">
        {/*  */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow uppercase"
          >
            {EmployerOptions}
            <li>
                <button>
                    Logout
                </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmployerNavbar;
