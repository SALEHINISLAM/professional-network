import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useLoadApplicants from "../../hooks/useLoadapplicants";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";

const SeeAllCandidate = (props) => {
  const { id } = useParams();
  const { user, jobsWithApplicants, isLoading, error } = useLoadApplicants();
  const [applicants, setApplicants] = useState([]);
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
  useEffect(() => {
    const loadApplicants = async () => {
      if (!jobsWithApplicants || isLoading || !id) {
        return;
      }
      const job = jobsWithApplicants.find((job) => job._id === id);
      if (!job || !job.applicantIds || job.applicantIds.length === 0) {
        setApplicants([]);
        return;
      }
      try {
        const applicantDetails = await Promise.all(
          job.applicantIds.map(async (applicantId) => {
            const result = await axiosPublic.get(`/user/${applicantId}`);
            return result.data;
          })
        );
        setApplicants(applicantDetails);
      } catch (error) {
        console.log(error);
      }
    };
    loadApplicants();
  }, [jobsWithApplicants, id, axiosPublic, isLoading]);
  return (
    <div>
      <h2 className="container mx-auto text-4xl font-semibold py-8">
        All Applicants
      </h2>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-16">
        {applicants
          ? applicants.map((applicant, index) => (
              <>
                <div
                  key={index}
                  className="card lg:card-side bg-[#f3f3f3] shadow-xl"
                >
                  <figure>
                    <img
                      src={
                        applicant
                          ? applicant?.userResumeURL
                          : "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
                      }
                      alt="Album"
                    />
                  </figure>
                  <div className="card-body">
                    <div className="flex justify-center items-center w-full">
                      <img
                        src={
                          applicant
                            ? applicant?.userProfilePhotoURL
                            : "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
                        }
                        alt=""
                        className="w-12 h-12 rounded-full"
                      />
                    </div>
                    <h2 className="card-title">
                      {applicant && applicant?.name}
                    </h2>
                    <p>
                      Skills:{" "}
                      {applicant &&
                        applicant.skills.map((skill) => skill.name).join(" , ")}
                    </p>
                  </div>
                </div>
              </>
            ))
          : ""}
      </div>
    </div>
  );
};

SeeAllCandidate.propTypes = {};

export default SeeAllCandidate;
