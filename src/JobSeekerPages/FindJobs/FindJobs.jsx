import React from "react";
import PropTypes from "prop-types";
import useAllJobsJobSeeker from "../../hooks/useAllJobsJobSeeker";
import JobSeekerJobCard from "./JobSeekerJobCard";

const FindJobs = (props) => {
  const { user, findJobs, isLoading, error } = useAllJobsJobSeeker();
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
      <h3 className="container mx-auto text-4xl pt-12 font-bold">
        Jobs awaiting for you
      </h3>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-16">
        {findJobs
          ? findJobs.map((job, index) => (
              <JobSeekerJobCard
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

FindJobs.propTypes = {};

export default FindJobs;
