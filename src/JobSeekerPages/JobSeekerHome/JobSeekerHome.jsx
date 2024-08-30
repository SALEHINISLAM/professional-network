import React from "react";
import { Link } from "react-router-dom";
import useAppliedJobs from "../../hooks/useAppliedJobs";
import { MdWorkHistory } from "react-icons/md";
import { Player } from "@lottiefiles/react-lottie-player";

const JobSeekerHome = () => {
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
      <div className="flex flex-col lg:flex-row container mx-auto gap-8 p-4 justify-center items-center">
        <div className="lg:w-1/2 space-y-16">
          <h3 className="text-xl font-semibold ">Hi {user?.name} you are here, many employer are awaiting for you !!!</h3>
          <div className="bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] rounded-xl p-4 text-white font-bold text-center flex flex-col justify-center items-center">
          <h1 className="text-4xl lg:text-6xl">
            {
              appliedJobs ? appliedJobs.length:'0'
            }
          </h1>
          <h3 className="text-2xl lg:text-3xl flex justify-center items-center gap-2">
            <MdWorkHistory />
            Applied Jobs
          </h3>
        </div>
        </div>
        <div className="">
          <Player
          src="https://d1jj76g3lut4fe.cloudfront.net/saved_colors/98631/PGcXYnpizSdq2TiS.json"
          loop
          autoplay
          />
        </div>
      </div>
    </div>
  );
};
//src="https://d1jj76g3lut4fe.cloudfront.net/saved_colors/98631/PGcXYnpizSdq2TiS.json"
export default JobSeekerHome;
