import React from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const JobCard = ({ job }) => {
  const { jobData, finalJobPost } = job;
  const handleShowJobPost=(jobpost)=>{
    Swal.fire({
        html:jobpost
    })
  }
  return (
    <div>
      <div className="card bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src={
              job
                ? jobData.companyLogoUrl
                : "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            }
            alt="company logo"
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title font-semibold">
            {jobData.companyName} is Hiring for {jobData.jobTitle}
          </h2>
          <p>Number of Position: {jobData.numberOfPosition}</p>
          <p hidden={jobData.skills.length === 0}>
            Required Skill:{" "}
            {jobData.skills.map((skill) => skill.name).join(",")}
          </p>
          <p>Salary: {jobData.salary} $</p>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={()=>handleShowJobPost(finalJobPost)}>See Details Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

JobCard.propTypes = {
  job: PropTypes.object,
};

export default JobCard;
