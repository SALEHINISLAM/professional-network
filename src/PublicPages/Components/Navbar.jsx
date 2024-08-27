import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const NavOptions = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li className="lg:hidden">
        <NavLink to={"/login"}>Login</NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 container mx-auto h-16 pt-4">
        <div className="navbar-start h-16">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {NavOptions}
            </ul>
          </div>
          {/* 
 */}
          <a className="btn btn-ghost text-xl h-full" href="/">
            <img src="https://i.ibb.co/wzQv92d/pnlogo.jpg" alt="" className="h-full w-full"/>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{NavOptions}</ul>
        </div>
        <div className="navbar-end hidden lg:flex">
          <a className="btn" href="/login">Get Started</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
