import React from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const EmployerAppliedJobCard = ({ job, price }) => {
  const { jobData,numberOfApplications } = job;
  const bgColor = {
    1: "bg-blue-100",
    5: "bg-green-100",
    10: "bg-yellow-100",
  };
  const cardClasses = ("card shadow-xl", bgColor[price]);
  return (
    <div>
      <div className={cardClasses}>
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
            <button className="btn btn-error">Applicants: {numberOfApplications}</button>
            <Link to={`/dashboard/seeAllCandidate/${job._id}`}>
            <button className="btn btn-primary">See All Candidate</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

EmployerAppliedJobCard.propTypes = {
  job: PropTypes.object,
  price: PropTypes.number
};

export default EmployerAppliedJobCard;
