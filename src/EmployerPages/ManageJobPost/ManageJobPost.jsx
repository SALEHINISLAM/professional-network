import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ManageJobPost = (props) => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto grid grid-cols-1 py-16 gap-8 md:grid-cols-2">
      <div className="card bg-base-100 image-full shadow-xl">
        <figure>
          <img
            src="https://i.ibb.co/1RPp2Tz/entrepreneur-working-company-marketing-strategy.jpg"
            alt="Shoes"
            className="h-full w-full"
          />
        </figure>
        <div className=" py-10 px-4 card-body  justify-center items-center flex flex-col gap-6">
          <h2 className="card-title text-4xl font-bold">Add New Job</h2>
          <p>Find the talented people now to build your dream company...</p>
          <div className="card-actions">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/dashboard/postNewJob")}
            >
              Post Job
            </button>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 image-full shadow-xl">
        <figure>
          <img
            src="https://i.ibb.co/ZXQJwZP/9384987-4171364.jpg"
            alt="Shoes"
            className="h-full w-full"
          />
        </figure>
        <div className=" py-10 px-4 card-body  justify-center items-center flex flex-col gap-6">
          <h2 className="card-title text-4xl font-bold">
            View Previously Added Jobs
          </h2>
          <p>See the jobs you have added...</p>
          <div className="card-actions">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/dashboard/pastJobs")}
            >
              Past Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ManageJobPost.propTypes = {};

export default ManageJobPost;
