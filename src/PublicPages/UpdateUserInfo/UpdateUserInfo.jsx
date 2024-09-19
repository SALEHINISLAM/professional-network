import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../Providers/AuthProviders";
import { useFieldArray, useForm } from "react-hook-form";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useUserInfoFromMongodb from "../../hooks/useUserInfoFromMongodb";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { WorkSummaryChatSession } from "../../CVServiceApi/WorkSummery";
import { modules } from "../../SharedComponents/DashboardNavlink";

const UpdateUserInfo = (props) => {
  const { user } = useContext(AuthContext);
  const formField = {
    id: null,
    title: "",
    companyName: "",
    district: "",
    division: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    workSummery: "",
  };
  const [websiteUser, refetch, isLoading] = useUserInfoFromMongodb();
  const [selectedValue, setSelectedValue] = useState("");
  const [companyLogo, setCompanyLogo] = useState(null);
  const [IdCard, setIdCard] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [hasWorkExperience, setHasWorkExperience] = useState("no");
  const [workSummery, setWorkSummery] = useState("");
  const [experienceList, setExperienceList] = useState([formField]);
  const [educationalList, setEducationalList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);
  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      rating: "",
    },
  ]);
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
      companyName: "",
      designation: "",
      companyAddress: "",
      companyWebsite: "",
      contactNumber: "",
      userAddress: "",
      jobExperience: "",
      date: "",
      portfolio: "",
    },
  });

  useEffect(() => {
    if (websiteUser) {
      setSelectedValue(websiteUser.role || "");
      // default values for existing user
      setValue("name", user?.displayName);
      setValue("email", user?.email);
      setValue("companyName", websiteUser.companyName || "");
      setValue("designation", websiteUser.designation || "");
      setValue("companyAddress", websiteUser.companyAddress || "");
      setValue("companyWebsite", websiteUser.companyWebsite || "");
      setValue(
        "skills",
        websiteUser.skills || [
          {
            name: "",
            rating: "",
          },
        ]
      );
      setValue("contactNumber", websiteUser.contactNumber || "");
      setValue("userAddress", websiteUser.userAddress || "");
      setValue("date", websiteUser.date || "");
      setValue("portfolio", websiteUser.portfolio || "");
      setValue("experience", websiteUser.experience || [formField]);
      setValue(
        "education",
        websiteUser.education || [
          {
            universityName: "",
            degree: "",
            major: "",
            startDate: "",
            endDate: "",
            description: "",
          },
        ]
      );
      setValue("firstName", websiteUser.firstName || "")
      setValue("lastName",websiteUser.lastName || "")
      setValue("jobTitle", websiteUser.jobTitle || "")
      setValue("address", websiteUser.address || "")
      setValue("phone", websiteUser.phone || "")
      setValue("userEmail", websiteUser.userEmail || "")
      setValue("portfolio", websiteUser.portfolio || "")
      setValue("linkedIn", websiteUser.linkedIn ||"")
      setValue("facebook",websiteUser.facebook || "")
      setEducationalList(
        websiteUser.education || [
          {
            universityName: "",
            degree: "",
            major: "",
            startDate: "",
            endDate: "",
            description: "",
          },
        ]
      );
      setExperienceList(websiteUser.experience || [formField]);
      setSkillsList(
        websiteUser.skills || [
          {
            name: "",
            rating: "",
          },
        ]
      );
    }
  }, [websiteUser, user, setValue]);

  const GenerateWorkSummeryFromAI = async (e,index) => {
    if (!experienceList[index].title) {
      return Swal.fire("Please add position title");
    }
    const PROMPT = `Position Title: ${experienceList[index].title}. Based on this position title, provide 5-7 bullet points for my experience in a resume, in HTML format.`;
    console.log(PROMPT);
    try {
      const result = await WorkSummaryChatSession.sendMessage(PROMPT);
      const responseText = await result.response.text();
      console.log("AI Response:", responseText);
      setWorkSummery(responseText);
    } catch (error) {
      console.error("Error in AI generation:", error);
      Swal.fire("Error generating summery from AI");
    }
  };

  const handleSkillChange = (event, index) => {
    const { name, value } = event.target;
    const updatedSkillsList = [...skillsList];
    updatedSkillsList[index] = {
      ...updatedSkillsList[index],
      [name]: value,
    };
    setSkillsList(updatedSkillsList);
  };

  const handleExperienceChange = (index, event) => {
    const { name, value, type, checked } = event.target;
    const updatedExperienceList = [...experienceList];
    updatedExperienceList[index] = {
      ...updatedExperienceList[index],
      [name]: type === "checkbox" ? checked : value,
    };
    setExperienceList(updatedExperienceList);
  };

  const handleEducationChange = (event, index) => {
    const { name, value } = event.target;
    const updatedEducationList = [...educationalList];
    updatedEducationList[index] = {
      ...updatedEducationList[index],
      [name]: value,
    };
    setEducationalList(updatedEducationList);
  };

  const handleWorkSummery=(index)=>{
    const UpdateExperienceList=[...experienceList];
    UpdateExperienceList[index].workSummery=workSummery;
  }
  const handleAddNewExperience = () => {
    //e.preventDefault();
    setExperienceList([...experienceList, { ...formField }]);
  };

  const handleAddSkill = () => {
    //e.preventDefault();
    const updatedList = [
      ...skillsList,
      {
        name: "",
        rating: "",
      },
    ];
    setSkillsList(updatedList);
  };

  const handleRemoveExperience = (index) => {
    //e.preventDefault();
    const updatedExperienceList = experienceList.filter((_, i) => i !== index);
    setExperienceList(updatedExperienceList);
  };

  const handleAddEducation = () => {
    //e.preventDefault();
    const updatedList = [
      ...educationalList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ];
    setEducationalList(updatedList);
  };

  const handleRemoveEducation = (index) => {
    //e.preventDefault();
    const updatedList = educationalList.filter((_, i) => i !== index);
    setEducationalList(updatedList);
  };

  const handleRemoveSkill = (index) => {
    //e.preventDefault();
    const updatedList = skillsList.filter((_, i) => i !== index);
    setSkillsList(updatedList);
  };

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleSelect = (e) => {
    setSelectedValue(e.target.value);
    console.log(e.target.value);
  };

  const handleUploadImage = async (file) => {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "testImage");
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDNAME
        }/image/upload`,
        form
      );
      return response.data.secure_url;
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (data) => {
    //e.preventDefault()
    try {
      let logoUrl = websiteUser?.companyLogoUrl || "";
      let idCardUrl = websiteUser?.employerIdCardUrl || "";
      let userProfilePhoto = websiteUser?.userProfilePhotoURL || "";

      if (companyLogo) {
        logoUrl = await handleUploadImage(companyLogo);
      }
      if (IdCard) {
        idCardUrl = await handleUploadImage(IdCard);
      }
      if (profilePhoto) {
        userProfilePhoto = await handleUploadImage(profilePhoto);
      }

      const message = {
        ...data,
        role: selectedValue,
        employerIdCardUrl: idCardUrl,
        companyLogoUrl: logoUrl,
        userProfilePhotoURL: userProfilePhoto,
        experience: experienceList,
        skills: skillsList,
        education: educationalList,
        isAdviceUpdated:false
      };
      
      console.log(message);
      if (websiteUser?.role) {
        const response = await axiosPublic.put(
          `/userInfo/edit/${websiteUser._id}`,
          message,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.data.modifiedCount > 0) {
          Swal.fire("Your information updated successfully...");
          refetch(); // Refetch user info
        } else {
          Swal.fire("Something went wrong...");
        }
      } else {
        const res = await axiosPublic.post("/user", message);
        if (res.data.insertedId) {
          Swal.fire("Your information added successfully...");
          refetch(); // Refetch user info
        } else {
          Swal.fire("Something went wrong...");
        }
      }
    } catch (err) {
      console.log(err, "from update user");
    }
  };

  const handleWorkExperienceSelection = (e) => {
    setHasWorkExperience(e.target.value);
    console.log(hasWorkExperience);
  };

  return (
    <div className="max-w-sm mx-auto py-16">
      {!websiteUser?.role && (
        <select
          name="userRole"
          className="select select-primary w-full max-w-xs"
          onChange={handleSelect}
        >
          <option value={"default"}>Select one</option>
          <option value={"jobSeeker"}>Job Seeker</option>
          <option value={"employer"}>Employer (Job Provider)</option>
          <option value={"entrepreneur"}>Entrepreneur</option>
        </select>
      )}
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            defaultValue={user?.displayName}
            className="input input-bordered"
            readOnly
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            defaultValue={user?.email}
            className="input input-bordered"
            readOnly
          />
        </div>
        {(selectedValue === "employer" || websiteUser?.role === "employer") && (
          <>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Company Name</span>
              </label>
              <input
                type="text"
                placeholder="your company name"
                name="companyName"
                className="input input-bordered"
                required
                {...register("companyName")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Designation</span>
              </label>
              <input
                type="text"
                placeholder="CEO or HR or Others"
                name="designation"
                className="input input-bordered"
                required
                {...register("designation")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Company Address</span>
              </label>
              <textarea
                type="text"
                placeholder="Write full address here"
                name="companyAddress"
                className="textarea textarea-bordered"
                required
                {...register("companyAddress")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Company Website (if available)
                </span>
              </label>
              <input
                type="text"
                name="companyWebsite"
                placeholder="www.yourcompany.com"
                className="input input-bordered"
                {...register("companyWebsite")}
              />
            </div>
            {!websiteUser?.userProfilePhotoURL && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Profile Photo</span>
                </label>
                <input
                  type="file"
                  name="profilePhoto"
                  className="file-input file-input-bordered w-full max-w-xs"
                  required
                  onChange={(e) => handleFileChange(e, setProfilePhoto)}
                />
              </div>
            )}
            {!websiteUser?.companyLogoUrl && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Upload Your Company logo</span>
                </label>
                <input
                  type="file"
                  name="companyLogo"
                  className="file-input file-input-bordered w-full max-w-xs"
                  required
                  onChange={(e) => handleFileChange(e, setCompanyLogo)}
                />
              </div>
            )}
            {!websiteUser?.employerIdCardUrl && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Upload Your ID card card(It is required to verify yourself
                    as a representative of your company)
                  </span>
                </label>
                <input
                  type="file"
                  name="idCard"
                  className="file-input file-input-bordered w-full max-w-xs"
                  required
                  onChange={(e) => handleFileChange(e, setIdCard)}
                />
              </div>
            )}
          </>
        )}
        {(selectedValue === "jobSeeker" ||
          websiteUser?.role === "jobSeeker") && (
          <>
            <h1 className="font-bold text-3xl">Personal Information</h1>
            <div className="">
              <div className="form-control">
                <label className="label-text">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="first name"
                  className="input input-bordered"
                  {...register("firstName")}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label-text">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="last name"
                  className="input input-bordered"
                  {...register("lastName")}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label-text">Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  placeholder="programmer"
                  className="input input-bordered"
                  {...register("jobTitle")}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label-text">Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="address"
                  className="input input-bordered"
                  {...register("address")}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label-text">Phone</label>
                <input
                  type="number"
                  name="phone"
                  placeholder="+8801XXXXXXXXX"
                  className="input input-bordered"
                  {...register("phone")}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label-text">Email</label>
                <input
                  type="email"
                  name="userEmail"
                  placeholder="xyz@domain.com"
                  className="input input-bordered"
                  {...register("userEmail")}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label-text">Portfolio Website(Optional But IMPORTANT for Recruiter)</label>
                <input
                  type="text"
                  name="portfolio"
                  placeholder="domain.com"
                  className="input input-bordered"
                  {...register("portfolio")}
                  
                />
              </div>
              <div className="form-control">
                <label className="label-text">LinkedIn(Optional But IMPORTANT for Recruiter)</label>
                <input
                  type="text"
                  name="linkedIn"
                  placeholder="linkedin.com/xxxxx"
                  className="input input-bordered"
                  {...register("linkedIn")}
                />
              </div>
              <div className="form-control">
                <label className="label-text">Facebook(Optional But IMPORTANT for Recruiter)</label>
                <input
                  type="text"
                  name="facebook"
                  placeholder="facebook.com/xxxxxx"
                  
                  className="input input-bordered"
                  {...register("facebook")}
                />
              </div>
            </div>

            <h1 className="font-bold text-2xl">Work Experience</h1>
            <p>Do you have previous job experience?</p>
            <div className="my-4">
              <label className="label-text">
                <input
                  type="radio"
                  name="hasExperience"
                  value="yes"
                  checked={hasWorkExperience==="yes"}
                  onChange={handleWorkExperienceSelection}
                />{" "}
                Yes
              </label>
              <label className="ml-4">
                <input
                  type="radio"
                  name="hasExperience"
                  value="no"
                  checked={hasWorkExperience==="no"}
                  onChange={handleWorkExperienceSelection}
                />{" "}
                No
              </label>
            </div>
            {(hasWorkExperience === "yes" || experienceList.length > 0) && (
              <div>
                <p>{experienceList.length>0 ? "Edit your previous job experience":"Add your previous job experience"}</p>
                <div className="">
                  {Array.isArray(experienceList) &&
                    experienceList.length > 0 &&
                    experienceList.map((item, index) => (
                      <div key={index}>
                        <button
                          className="mt-6 btn btn-outline btn-error"
                          onClick={(e) =>{ e.stopPropagation();handleRemoveExperience(index)}}
                        >
                          - Remove
                        </button>
                        <div className="border p-3 my-5 rounded-lg">
                          <div className="w-full">
                            <label className="label-text">Position Title</label>
                            <input
                              name="title"
                              className="input input-bordered w-full"
                              value={item.title || ""}
                              onChange={(e) => handleExperienceChange(index, e)}
                            />
                          </div>
                          <div className="w-full">
                            <label className="label-text">Company Name</label>
                            <input
                              name="companyName"
                              className="input input-bordered w-full"
                              value={item.companyName || ""}
                              onChange={(e) => handleExperienceChange(index, e)}
                            />
                          </div>
                          <div>
                            <label className="label-text">District</label>
                            <input
                              name="district"
                              className="input input-bordered w-full"
                              value={item.district || ""}
                              onChange={(e) => handleExperienceChange(index, e)}
                            />
                          </div>
                          <div className="w-full">
                            <label className="label-text">Division</label>
                            <input
                              name="division"
                              className="input input-bordered w-full"
                              value={item.division || ""}
                              onChange={(e) => handleExperienceChange(index, e)}
                            />
                          </div>
                          <div className="w-full">
                            <label className="label-text">Start Date</label>
                            <input
                              name="startDate"
                              className="input input-bordered w-full"
                              type="date"
                              value={item.startDate || ""}
                              onChange={(e) => handleExperienceChange(index, e)}
                            />
                          </div>
                          <div className="w-full flex items-center justify-start my-3">
                            
                              <input
                                name="currentlyWorking"
                                type="checkbox"
                                className="checkbox"
                                checked={item.currentlyWorking || false}
                                onChange={(e) =>
                                  handleExperienceChange(index, e)
                                }
                              />{" "}
                              <label className="">
                              Currently Working Here
                            </label>
                          </div>
                          {!item.currentlyWorking && (
                            <div className="w-full">
                              <label className="label-text">End Date</label>
                              <input
                                name="endDate"
                                type="date"
                                className="input input-bordered w-full"
                                value={item.endDate || ""}
                                onChange={(e) =>
                                  handleExperienceChange(index, e)
                                }
                              />
                            </div>
                          )}
                          <div className=" my-4">
                            <label className="label-text">Work Summery</label>
                            <div className="flex justify-end">
                            <button
                            type="button"
                              className="btn btn-sm btn-secondary btn-outline"
                              onClick={(e) =>{e.stopPropagation()
                                ; GenerateWorkSummeryFromAI(e,index)}}
                            >
                              Write Work Summery With AI
                            </button></div>
                            <ReactQuill
                              theme="snow"
                              value={workSummery}
                              formats={[
                                "header",
                                "font",
                                "size",
                                "bold",
                                "italic",
                                "underline",
                                "strike",
                                "blockquote",
                                "list",
                                "bullet",
                                "indent",
                                "link",
                                "image",
                                "video",
                              ]}
                              placeholder="Write something about your work experience in this company..."
                              modules={modules}
                              onChange={(content)=>{setWorkSummery(content);handleWorkSummery(index)}}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="flex justify-between">
                  <button
                  type="button"
                    onClick={(e)=>{e.stopPropagation();handleAddNewExperience()}}
                    className="text-primary btn btn-outline"
                  >
                    + Add
                  </button>
                </div>
                {/* education */}
                <div className="mt-8">
                  <h1 className="text-2xl font-bold">
                    Educational Info
                  </h1>
                  {educationalList.map((item, index) => (
                    <div className="">
                      <button
                      type="button"
                        className="mt-6 btn btn-outline btn-error"
                        onClick={(e) =>{e.stopPropagation(); handleRemoveEducation(index)}}
                      >
                        - Remove
                      </button>
                      <div className="">
                        <div className="w-full">
                          <label className="label-text">
                            Institute/University
                          </label>
                          <input
                            className="input input-bordered w-full"
                            name="universityName"
                            value={item?.universityName || ""}
                            onChange={(e) => handleEducationChange(e, index)}
                            placeholder="BUET"
                          />
                        </div>
                        <div className="">
                          <label className="label-text">Degree</label>
                          <input
                            name="degree"
                            value={item?.degree || ""}
                            className="input input-bordered w-full"
                            onChange={(e) => handleEducationChange(e, index)}
                            placeholder="B.Sc in Engineering"
                          />
                        </div>
                        <div className="">
                          <label className="label-text">Major</label>
                          <input
                            className="input input-bordered w-full"
                            name="major"
                            value={item?.major || ""}
                            onChange={(e) => handleEducationChange(e, index)}
                            placeholder="Civil Engineering"
                          />
                        </div>
                        <div>
                          <div className="">
                            <label className="label-text">Start Date</label>
                            <input
                              name="startDate"
                              type="date"
                              className="input input-bordered w-full"
                              value={item?.startDate || ""}
                              onChange={(e) => handleEducationChange(e, index)}
                              placeholder="mm-dd-yyyy"
                            />
                          </div>
                          <div className="">
                            <label className="label-text text-right justify-end">
                              End Date(If currently studying then give the
                              approximate date)
                            </label>
                            <input
                              name="endDate"
                              type="date"
                              value={item?.endDate || ""}
                              className="input input-bordered w-full"
                              onChange={(e) => handleEducationChange(e, index)}
                              placeholder="mm-dd-yyyy"
                            />
                          </div>
                        </div>
                        <div className="">
                          <label className="label-text">
                            Short description (Highlight your learning,
                            achievements etc)
                          </label>
                          <textarea
                            name="description"
                            type="text"
                            className="textarea textarea-bordered w-full"
                            value={item?.description || ""}
                            onChange={(e) => handleEducationChange(e, index)}
                            placeholder="projects, activities etc"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                  type="button"
                    onClick={(e)=>{e.stopPropagation();handleAddEducation()}}
                    className="text-primary btn btn-outline"
                  >
                    + Add
                  </button>
                </div>
                {/* skills */}
                <h2 className="text-2xl font-bold">Find skills those you may know </h2>
                <div className="">
                  {skillsList.map((skill, index) => (
                    <div className="border my-4 rounded-sm p-3">
                      <button
                        className="mt-6 btn btn-error btn-outline"
                        onClick={(e) => {e.stopPropagation();handleRemoveSkill(index)}}
                      >
                        - Remove
                      </button>
                      <div className="">
                        <div className="">
                          <label className="label-text">Skill</label>
                          <input
                            name="name"
                            type="text"
                            className="input input-bordered w-full"
                            value={skill?.name || ""}
                            onChange={(e) => handleSkillChange(e, index)}
                            placeholder="React"
                          />
                        </div>
                        <div className="">
                          <label className="label-text">
                            Rating of this skill according to you (Out of 100)
                          </label>
                          <input
                            name="rating"
                            type="number"
                            className="input input-bordered w-full"
                            value={skill?.rating || ""}
                            onChange={(e) => handleSkillChange(e, index)}
                            placeholder="85"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={(e)=>{e.stopPropagation();handleAddSkill()}}
                    className="text-primary btn btn-outline"
                  >
                    + Add
                  </button>
                </div>
              </div>
            )}
            {!websiteUser?.userProfilePhotoURL && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Profile Photo</span>
                </label>
                <input
                  type="file"
                  name="profilePhoto"
                  className="file-input file-input-bordered w-full max-w-xs"
                  required
                  onChange={(e) => handleFileChange(e, setProfilePhoto)}
                />
              </div>
            )}
          </>
        )}
        {(selectedValue === "entrepreneur" ||
          websiteUser?.role === "entrepreneur") && (
          <>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Startup Name</span>
              </label>
              <input
                type="text"
                placeholder="your startup name"
                name="companyName"
                className="input input-bordered"
                required
                {...register("companyName")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Designation</span>
              </label>
              <input
                type="text"
                placeholder="CEO or CTO or Others"
                name="designation"
                className="input input-bordered"
                required
                {...register("designation")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Startup Address</span>
              </label>
              <textarea
                type="text"
                placeholder="Write full address here"
                name="companyAddress"
                className="textarea textarea-bordered"
                required
                {...register("companyAddress")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Startup Website (if available)
                </span>
              </label>
              <input
                type="text"
                name="companyWebsite"
                placeholder="www.yourstartup.com"
                className="input input-bordered"
                {...register("companyWebsite")}
              />
            </div>
            {!websiteUser?.userProfilePhotoURL && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Profile Photo</span>
                </label>
                <input
                  type="file"
                  name="profilePhoto"
                  className="file-input file-input-bordered w-full max-w-xs"
                  required
                  onChange={(e) => handleFileChange(e, setProfilePhoto)}
                />
              </div>
            )}
            {!websiteUser?.companyLogoUrl && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Upload Your Startup's logo</span>
                </label>
                <input
                  type="file"
                  name="companyLogo"
                  className="file-input file-input-bordered w-full max-w-xs"
                  required
                  onChange={(e) => handleFileChange(e, setCompanyLogo)}
                />
              </div>
            )}
          </>
        )}
        <div className="form-control mt-6">
          <button className="btn btn-primary" type="submit">
            {websiteUser ? "Update Information" : "Add Information"}
          </button>
        </div>
      </form>
    </div>
  );
};

UpdateUserInfo.propTypes = {};

export default UpdateUserInfo;
