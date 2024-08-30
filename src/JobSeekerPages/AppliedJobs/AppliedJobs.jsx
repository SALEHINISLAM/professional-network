import React from "react";
import PropTypes from "prop-types";
import useAppliedJobs from "../../hooks/useAppliedJobs";
import AppliedJobCard from "./AppliedJobCard";

const AppliedJobs = (props) => {
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
  return (
    <div>
      <h3 className="text-3xl font-bold container mx-auto pt-16">My Applied Jobs</h3>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-16">
        {appliedJobs
          ? appliedJobs.map((job, index) => (
              <AppliedJobCard
                key={index}
                job={job}
                price={parseInt(job.jobData.price)}
              />
            ))
          : "No jobs found"}
      </div>
    </div>
  );
};

AppliedJobs.propTypes = {};

export default AppliedJobs;
