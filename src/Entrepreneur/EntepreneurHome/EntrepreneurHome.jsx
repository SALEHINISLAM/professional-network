import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";
import { MdWorkHistory } from "react-icons/md";
import useLoadApplicants from "../../hooks/useLoadapplicants";
import { FaMoneyBillWave } from "react-icons/fa";

const EntrepreneurHome = () => {
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
  return (
    <div>
      <div className="flex flex-col lg:flex-row container mx-auto gap-8 p-4 justify-center items-center">
        <div className="lg:w-1/2 space-y-16">
          <h3 className="text-xl font-semibold ">
            Hi {user?.name} you are here, many talent are wanted to work with you. Post job to hire now !!!
          </h3>
          <div className="bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] rounded-xl p-4 text-white font-bold text-center flex flex-col justify-center items-center">
            <h1 className="text-4xl lg:text-6xl">
              {jobsWithApplicants? handleCountApplicants(jobsWithApplicants): "0"}
            </h1>
            <h3 className="text-2xl lg:text-3xl flex justify-center items-center gap-2">
              <MdWorkHistory />
              Applicants Applied
            </h3>
          </div>
          <div className="bg-gradient-to-r from-[#D3A256] to-[#FDE8C0]  rounded-xl p-4 text-white font-bold text-center flex flex-col justify-center items-center">
            <h1 className="text-4xl lg:text-6xl">
              ${jobsWithApplicants? handleDueAmount(jobsWithApplicants) :  "0"}
            </h1>
            <h3 className="text-2xl lg:text-3xl flex justify-center items-center gap-2">
            <FaMoneyBillWave />
              Due Amounts
            </h3>
          </div>
        </div>
        <div>
          <Player
            src="https://d1jj76g3lut4fe.cloudfront.net/saved_colors/98631/pPeJzvdpgMzgLYFx.json"
            loop
            autoplay
          />
        </div>
      </div>
    </div>
  );
};

export default EntrepreneurHome;
