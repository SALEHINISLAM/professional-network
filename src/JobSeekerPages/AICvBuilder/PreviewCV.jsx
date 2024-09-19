import React, { useEffect } from "react";
import PropTypes from "prop-types";
import useUserInfoFromMongodb from "../../hooks/useUserInfoFromMongodb";
import { useNavigate } from "react-router-dom";

const PreviewCV = ({show}) => {
  const [websiteUser, refetch, isLoading] = useUserInfoFromMongodb();
  if (isLoading) {
    return <span className="loading"></span>;
  }
  const navigate=useNavigate();
  useEffect(() => {
    refetch();
    if (!websiteUser.CVSummery) {
      return navigate('/dashboard/editCV')
    }
  }, []);
  return (
    <div className="container mx-auto max-w-4xl">
      <h1 hidden={!show}>
        The final version of your CV is Here. This CV will see your recruiter.
      </h1>
      <div className="mt-16">
        <h2 className="font-bold text-xl text-center uppercase">
          {websiteUser?.firstName} {websiteUser?.lastName}
        </h2>
        <h4 className="text-center font-medium text-sm">
          {websiteUser?.jobTitle}
        </h4>
        <h3 className="text-center font-normal text-xs">
          {websiteUser?.address}
        </h3>
        <div className=" flex justify-around">
          <h3 className="font-normal text-xs">{websiteUser?.phone}</h3>
          <h3 className="font-normal text-xs">
            <a href={`mailto:${websiteUser?.email}`}>{websiteUser?.email}</a>
          </h3>
        </div>
        <div className=" flex justify-around">
          <h3 className="font-normal text-xs">
            <a href={`${websiteUser?.facebook}`}>{websiteUser?.facebook}</a>
          </h3>
          <h3 className="font-normal text-xs">
            <a href={`${websiteUser?.linkedIn}`}>{websiteUser?.linkedIn}</a>
          </h3>
        </div>
        <hr
          className="border-4 my-2"
          style={{
            borderColor: websiteUser?.themeColor,
          }}
        />
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: websiteUser?.CVSummery }}
        ></div>
        <div className="my-6" hidden={websiteUser?.experience?.length === 0}>
          <h2 className="text-center font-bold text-sm mb-2">
            Professional Experience
          </h2>
          <hr className={`border-4 border-[${websiteUser?.themeColor}]`} />
          {websiteUser &&
            websiteUser.experience?.map((exp, index) => (
              <div key={index} className="my-5">
                <h2 className="text-sm font-bold">{exp?.title}</h2>
                <h2 className="text-xs flex justify-between">
                  {exp?.companyName}, {exp?.district}, {exp?.division}
                  <span>
                    {exp?.startDate} to{" "}
                    {exp?.currentlyWorking ? "Present" : exp?.endDate}
                  </span>
                </h2>
                <div
                  className="text-xs my-2"
                  dangerouslySetInnerHTML={{ __html: exp?.workSummery }}
                ></div>
              </div>
            ))}
        </div>
        <div className="my-6">
          <h2 className="text-center font-bold text-sm mb-2">Education</h2>
          <hr className={`border-4 border-[${websiteUser?.themeColor}]`} />
          {websiteUser?.education?.map((edu, index) => (
            <div className="my-5" key={index}>
              <h2 className="text-sm font-bold">{edu?.universityName}</h2>
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
          <h2 className="text-center font-bold text-sm mb-2">Skills</h2>
          <hr className={`border-4 border-[${websiteUser?.themeColor}]`} />
          <div className="grid grid-cols-2 gap-8">
            {websiteUser?.skills?.map((skill, index) => (
              <div
                className="my-5 flex justify-between items-center"
                key={index}
              >
                <h2 className="text-sm font-bold">{skill?.name}</h2>
                <div className="h-2 w-28 bg-gray-100">
                  <div
                    style={{
                      width: skill?.rating + "%",
                      height: "100%",
                      backgroundColor: websiteUser?.themeColor,
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
  );
};

PreviewCV.propTypes = {};

export default PreviewCV;
