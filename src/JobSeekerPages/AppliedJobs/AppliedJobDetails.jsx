import React from 'react';
import useAppliedJobs from '../../hooks/useAppliedJobs';
import { Link, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";

const AppliedJobDetails = () => {
    const {id}=useParams()
    const { user, appliedJobs, isLoading, error } = useAppliedJobs();
  if (isLoading) {
    return <span className="loading">Loading...</span>;
  }
  if (error) {
    return <span>Error Handling Jobs , please try again later</span>;
  }
  if (!user) {
    return <span>No user available</span>;
  }
  const exactJob = appliedJobs?.find((job) => job._id === id);
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
        <div>
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
        className=" flex flex-col sm:flex-row gap-6 md:gap-12 lg:gap-16 justify-center items-center"
      >
        <Link to={"/dashboard/appliedJobs"}>
          <button className="btn btn-error">Go Back</button>
        </Link>
      </div>
    </div>
    );
};

export default AppliedJobDetails;