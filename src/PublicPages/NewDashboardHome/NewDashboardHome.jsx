import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserInfoFromMongodb from "../../hooks/useUserInfoFromMongodb";

const NewDashboardHome = () => {
  const [websiteUser, refetch, isLoading] = useUserInfoFromMongodb();
  const navigate=useNavigate();
  if (isLoading) {
    <span className="loading"></span>
  }

  useEffect(()=>{
    if (websiteUser) {
      if (websiteUser.role) {
        navigate(`/dashboard/${websiteUser.role}Home`);
      }
    }
  },[websiteUser, navigate])

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">Please Update your info...</p>
            <Link to={'/dashboard/updateuser'}>
              <button className="btn btn-primary">Add your Info</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDashboardHome;
