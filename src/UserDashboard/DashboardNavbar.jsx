import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useUserInfoFromMongodb from "../hooks/useUserInfoFromMongodb";
import { adminNavLink, employerNavlink, entrepreneurNavlink, jobSeekerNavlink } from "../SharedComponents/DashboardNavlink";
import { AuthContext } from "../Providers/AuthProviders";
import useAdmin from "../hooks/useAdmin";

const DashboardNavbar = () => {
  const [isAdmin]=useAdmin()
  console.log('from dash nav', isAdmin)
  const { logOut } = useContext(AuthContext);
  const [websiteUser, refetch] = useUserInfoFromMongodb();
  const navigate = useNavigate();
  console.log(websiteUser);
  if (websiteUser === "loading") {
    return <span className="loading"></span>;
  }

  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(websiteUser);
    console.log(websiteUser?.role);
  }, [websiteUser]);

  const handleLogOut = async () => {
    await logOut();
    refetch();
    return navigate("/");
  };
  return (
    <div className="navbar bg-base-100 container mx-auto h-20 pt-3">
      <div className="flex-1 h-full">
        <a className="btn btn-ghost text-xl h-full" href={`/dashboard/${websiteUser?.role}Home`}>
          <img
            src="https://i.ibb.co/wzQv92d/pnlogo.jpg"
            alt=""
            className="h-full w-full"
          />
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
                alt="user"
                src={
                  websiteUser
                    ? websiteUser?.userProfilePhotoURL
                    : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow uppercase"
          >
            <li>Hi {user?.name}</li>
            {user?.role === "employer" && employerNavlink}
            {user?.role === "jobSeeker" && jobSeekerNavlink}
            {user?.role==="entrepreneur" && entrepreneurNavlink}
            {isAdmin && adminNavLink}
            <li>
              <NavLink to={"/dashboard/updateuser"}>Add or Edit Profile</NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard/invest"}>Invest</NavLink>
            </li>
            <li>
              <button onClick={() => handleLogOut()}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
