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
    return <span>Error Handling Candidates , please try again later</span>;
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
                  className="card lg:card-side bg-[#f3f3f3] shadow-xl p-4"
                >
                  <figure>
                    <div className="mx-auto max-w-3xl">
                      <div className="mt-16">
                        <h2 className="font-bold text-xl text-center uppercase">
                          {applicant?.firstName} {applicant?.lastName}
                        </h2>
                        <h4 className="text-center font-medium text-sm">
                          {applicant?.jobTitle}
                        </h4>
                        <h3 className="text-center font-normal text-xs">
                          {applicant?.address}
                        </h3>
                        <div className=" flex justify-around">
                          <h3 className="font-normal text-xs">
                            {applicant?.phone}
                          </h3>
                          <h3 className="font-normal text-xs">
                            <a href={`mailto:${applicant?.email}`}>
                              {applicant?.email}
                            </a>
                          </h3>
                        </div>
                        <div className=" flex justify-around">
                          <h3 className="font-normal text-xs">
                            <a href={`${applicant?.facebook}`}>
                              {applicant?.facebook}
                            </a>
                          </h3>
                          <h3 className="font-normal text-xs">
                            <a href={`${applicant?.linkedIn}`}>
                              {applicant?.linkedIn}
                            </a>
                          </h3>
                        </div>
                        <hr
                          className="border-4 my-2"
                          style={{
                            borderColor: applicant?.themeColor,
                          }}
                        />
                        <div
                          className="text-sm"
                          dangerouslySetInnerHTML={{
                            __html: applicant?.CVSummery,
                          }}
                        ></div>
                        <div
                          className="my-6"
                          hidden={applicant?.experience?.length === 0}
                        >
                          <h2 className="text-center font-bold text-sm mb-2">
                            Professional Experience
                          </h2>
                          <hr
                            className={`border-4 border-[${applicant?.themeColor}]`}
                          />
                          {applicant &&
                            applicant.experience?.map((exp, index) => (
                              <div key={index} className="my-5">
                                <h2 className="text-sm font-bold">
                                  {exp?.title}
                                </h2>
                                <h2 className="text-xs flex justify-between">
                                  {exp?.companyName}, {exp?.district},{" "}
                                  {exp?.division}
                                  <span>
                                    {exp?.startDate} to{" "}
                                    {exp?.currentlyWorking
                                      ? "Present"
                                      : exp?.endDate}
                                  </span>
                                </h2>
                                <div
                                  className="text-xs my-2"
                                  dangerouslySetInnerHTML={{
                                    __html: exp?.workSummary,
                                  }}
                                ></div>
                              </div>
                            ))}
                        </div>
                        <div className="my-6">
                          <h2 className="text-center font-bold text-sm mb-2">
                            Education
                          </h2>
                          <hr
                            className={`border-4 border-[${applicant?.themeColor}]`}
                          />
                          {applicant?.education?.map((edu, index) => (
                            <div className="my-5" key={index}>
                              <h2 className="text-sm font-bold">
                                {edu?.universityName}
                              </h2>
                              <h2 className="text-xs flex justify-between">
                                {edu?.degree} in {edu?.major}
                                <span>
                                  {edu?.startDate}-
                                  {edu?.currentlyStudying
                                    ? "Currently Studying here"
                                    : edu.endDate}
                                </span>
                              </h2>
                              <p className="text-xs my-2">{edu?.description}</p>
                            </div>
                          ))}
                        </div>
                        <div className="my-6">
                          <h2 className="text-center font-bold text-sm mb-2">
                            Skills
                          </h2>
                          <hr
                            className={`border-4 border-[${applicant?.themeColor}]`}
                          />
                          <div className="grid grid-cols-2 gap-8">
                            {applicant?.skills?.map((skill, index) => (
                              <div
                                className="my-5 flex justify-between items-center"
                                key={index}
                              >
                                <h2 className="text-sm font-bold">
                                  {skill?.name}
                                </h2>
                                <div className="h-2 w-28 bg-gray-100">
                                  <div
                                    style={{
                                      width: skill?.rating + "%",
                                      height: "100%",
                                      backgroundColor: applicant?.themeColor,
                                    }}
                                    className="border-2"
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
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
