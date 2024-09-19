import React from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import useAllJobsJobSeeker from "../../hooks/useAllJobsJobSeeker";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const JoDetailsPageForJobSeeker = (props) => {
  const { id } = useParams();
  const { user, findJobs, isLoading, error } = useAllJobsJobSeeker();
  const axiosPublic = useAxiosPublic();
  if (isLoading) {
    return <span className="loading">Loading...</span>;
  }
  if (error) {
    return <span>Error Handling Jobs , please try again later</span>;
  }
  if (!user) {
    return <span>No user available</span>;
  }
  const exactJob = findJobs?.find((job) => job._id === id);
  console.log(exactJob, "from job details");
  const handleApplyNow = async (userId, jobId) => {
    console.log(userId, jobId);
    if (!user.CVSummery) {
      return Swal.fire("Please complete your CV");
    }
    const response = await axiosPublic.post(`/user/${userId}/job/${jobId}`);
    console.log(response.data);
    if (response.data.insertedId) {
      Swal.fire("Your application is successful...");
    }else{
        Swal.fire("something went wrong...")
    }
  };
  return (
    <div>
      <h2 className="container mx-auto text-4xl font-semibold py-8">
        Job Details
      </h2>
      <div
        hidden={!exactJob}
        className="pb-16 grid grid-cols-1 lg:grid-cols-3 gap-8 container mx-auto"
      >
        <div className="lg:col-span-2">
          <ReactQuill
            value={exactJob?.finalJobPost}
            readOnly={true}
            theme="snow"
            modules={{ toolbar: false }}
          />
        </div>
        <div className="">
          <img
            src={exactJob?.jobData.companyLogoUrl}
            alt=""
            className="w-full"
          />
          <p>
            Company:{" "}
            <span className="uppercase font-medium">
              {exactJob?.jobData.companyName}
            </span>
          </p>
          <br />
          <p>Salary: {exactJob?.jobData.salary}$</p>
          <br />
          <p>Position: {exactJob?.jobData.numberOfPosition}</p>
          <br />
          <p>
            Required Skills:
            <ul className="list-disc pl-6 uppercase font-medium">
              {exactJob?.jobData.skills.map((skill, index) => (
                <li key={index}>{skill.name}</li>
              ))}
            </ul>
          </p>
          <br />
          <p>
            Employment Type:{" "}
            <span className="uppercase font-medium">
              {exactJob?.jobData.employmentType}
            </span>
          </p>
          <p>
            Job Location:{" "}
            <span className="uppercase font-medium">
              {exactJob?.jobData.jobLocation}
            </span>
          </p>
        </div>
      </div>
      <div
        hidden={!exactJob}
        className="pb-20 flex flex-col sm:flex-row gap-6 md:gap-12 lg:gap-16 justify-center items-center"
      >
        <button
          className="btn btn-primary"
          onClick={() => handleApplyNow(user?._id, exactJob?._id)}
        >
          Apply Now
        </button>
        <Link to={"/dashboard/findJobs"}>
          <button className="btn btn-error">Go Back</button>
        </Link>
      </div>
    </div>
  );
};

JoDetailsPageForJobSeeker.propTypes = {};

export default JoDetailsPageForJobSeeker;
