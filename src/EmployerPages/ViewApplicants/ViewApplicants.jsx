import React from "react";
import PropTypes from "prop-types";
import useLoadApplicants from "../../hooks/useLoadapplicants";
import EmployerAppliedJobCard from "./EmployerApplicantJobCard";

const ViewApplicants = (props) => {
  const { user, jobsWithApplicants, isLoading, error } = useLoadApplicants();
  if (isLoading) {
    return <span className="loading">Loading...</span>;
  }
  if (error) {
    return <span>Error Handling Jobs , please try again later</span>;
  }
  if (!user) {
    return <span>No user available</span>;
  }
  return (
    <div>
      <h2 className="container mx-auto text-4xl pt-12 font-bold">
        Job wise applicants
      </h2>
      
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-16'>
      {jobsWithApplicants
        ? jobsWithApplicants.map((job, index) => (
            <EmployerAppliedJobCard key={index} job={job} price={parseInt(job.jobData.price)}/>
          ))
        : "No jobs Found"}</div>
    </div>
  );
};

ViewApplicants.propTypes = {};

export default ViewApplicants;
