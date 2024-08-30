import React from "react";
import PropTypes from "prop-types";
import { MdWorkHistory } from "react-icons/md";
import { IoMdPeople } from "react-icons/io";
import { FaMoneyBillWave } from "react-icons/fa";
import "react-tabs/style/react-tabs.css";
import useLoadApplicants from "../../hooks/useLoadapplicants";
import { Player } from "@lottiefiles/react-lottie-player";

const EmployerHome = (props) => {
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

  const handleDueAmount = (jobs) => {
    const totalDue = jobs.reduce((acc, job) => {
      return acc + parseInt(job.jobData.price);
    }, 0);
    return totalDue;
  };

  const handleCountApplicants = (jobs) => {
    const totalApplicants = jobs.reduce((acc, job) => {
      return acc + parseInt(job.numberOfApplications);
    }, 0);
    return totalApplicants;
  };
  //https://d1jj76g3lut4fe.cloudfront.net/saved_colors/98631/3dmdV77PclkcKkEA.json
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 container mx-auto">
      <div className="lg:col-span-2">
      <Player
        
        src={
          "https://d1jj76g3lut4fe.cloudfront.net/saved_colors/98631/3dmdV77PclkcKkEA.json"
        }
        loop
        autoplay
      /></div>
      <div className="container py-8 mx-auto gap-8 lg:gap-16 grid grid-cols-1 ">
        <div className="bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] rounded-xl p-4 text-white font-bold text-center flex flex-col justify-center items-center">
          <h1 className="text-4xl lg:text-6xl">
            {jobsWithApplicants ? jobsWithApplicants?.length : 0}
          </h1>
          <h3 className="text-2xl lg:text-3xl flex justify-center items-center gap-2">
            <MdWorkHistory />
            Posted Jobs
          </h3>
        </div>
        <div className="bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] rounded-xl p-4 text-white font-bold text-center flex flex-col justify-center items-center">
          <h1 className="text-4xl lg:text-6xl">
            {jobsWithApplicants
              ? handleCountApplicants(jobsWithApplicants)
              : "0"}
          </h1>
          <h3 className="text-2xl lg:text-3xl flex justify-center items-center gap-2">
            <IoMdPeople />
            Applicants Applied
          </h3>
        </div>
        <div className="bg-gradient-to-r from-[#FE4880] to-[#FECDE9] rounded-xl p-4 text-white font-bold text-center flex flex-col justify-center items-center">
          <h1 className="text-4xl lg:text-6xl">
            ${jobsWithApplicants ? handleDueAmount(jobsWithApplicants) : "0"}
          </h1>
          <h3 className="text-2xl lg:text-3xl flex justify-center items-center gap-2">
            <FaMoneyBillWave />
            Due Amount
          </h3>
        </div>
      </div>
    </div>
  );
};

EmployerHome.propTypes = {};

export default EmployerHome;
