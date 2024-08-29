import React from "react";
import DashboardNavbar from "../../UserDashboard/DashboardNavbar";
import useUserInfoFromMongodb from "../../hooks/useUserInfoFromMongodb";
import { Link } from "react-router-dom";

const JobSeekerHome = () => {
   const [websiteUser,refetch, isLoading]=useUserInfoFromMongodb()
  return (
    <div>
      <div className="card card-side bg-base-100 shadow-xl container mx-auto">
        <figure>
          <img
            src={websiteUser?.role? websiteUser.
                userProfilePhotoURL :"https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"}
            alt="avatar or logo"
            className="w-24 h-24 rounded"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Welcome {websiteUser?.name}</h2>
          <p>Many jobs are waiting for you. <Link to={'/dashboard/findJobs'}>Click here</Link>  to discover...</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Watch</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerHome;
