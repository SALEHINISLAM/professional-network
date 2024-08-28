import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../Providers/AuthProviders";
import { useFieldArray, useForm } from "react-hook-form";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useUserInfoFromMongodb from "../../hooks/useUserInfoFromMongodb";

const UpdateUserInfo = (props) => {
  const { user } = useContext(AuthContext);
  const [websiteUser, refetch, isLoading] = useUserInfoFromMongodb();
  const [selectedValue, setSelectedValue] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [IdCard, setIdCard] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [resume, setResume] = useState(null);
  const axiosPublic = useAxiosPublic();

  if (isLoading) {
    return <span className="loading"></span>
  }
  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
      companyName: websiteUser?.companyName || "",
      designation: websiteUser?.designation || "",
      companyAddress: websiteUser?.companyAddress || "",
      companyWebsite: websiteUser?.companyWebsite || "",
      skills: websiteUser?.skills || [{ name: "" }],
      contactNumber: websiteUser?.contactNumber || "",
      userAddress: websiteUser?.userAddress || "",
      jobExperience: websiteUser?.jobExperience || "",
      date: websiteUser?.date || "",
      portfolio: websiteUser?.portfolio || ""
    }
  });

  useEffect(() => {
    if (websiteUser) {
      setSelectedValue(websiteUser.role);
      // default values for existing user
      setValue("name", user?.displayName)
      setValue("email", user?.email)
      setValue("companyName", websiteUser.companyName);
      setValue("designation", websiteUser.designation);
      setValue("companyAddress", websiteUser.companyAddress);
      setValue("companyWebsite", websiteUser.companyWebsite);
      setValue("skills", websiteUser.skills || [{ name: "" }]);
      setValue("contactNumber", websiteUser.contactNumber);
      setValue("userAddress", websiteUser.userAddress);
      setValue("jobExperience", websiteUser.jobExperience);
      setValue("date", websiteUser.date);
      setValue("portfolio", websiteUser.portfolio);
    }
  }, [websiteUser,user, setValue]);

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleSelect = (e) => {
    setSelectedValue(e.target.value);
    console.log(e.target.value)
  };

  const handleUploadImage = async (file) => {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "testImage");
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDNAME}/image/upload`,
        form
      );
      return response.data.secure_url;
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (data) => {
    try {
      let logoUrl = websiteUser?.companyLogoUrl || "";
      let idCardUrl = websiteUser?.employerIdCardUrl || "";
      let userProfilePhoto = websiteUser?.userProfilePhotoURL || "";
      let userResumeURL = websiteUser?.userResumeURL || "";

      if (companyLogo) {
        logoUrl = await handleUploadImage(companyLogo);
      }
      if (IdCard) {
        idCardUrl = await handleUploadImage(IdCard);
      }
      if (profilePhoto) {
        userProfilePhoto = await handleUploadImage(profilePhoto);
      }
      if (resume) {
        userResumeURL = await handleUploadImage(resume);
      }

      const message = {
        ...data,
        role: selectedValue,
        employerIdCardUrl: idCardUrl,
        companyLogoUrl: logoUrl,
        userProfilePhotoURL: userProfilePhoto,
        userResumeURL: userResumeURL,
      };

      if (websiteUser?.role) {
        const response = await axiosPublic.put(`/userInfo/edit/${websiteUser._id}`, message, {
          headers: { "Content-Type": "application/json" }
        });
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

  const { fields, append, remove } = useFieldArray({ control, name: "skills" });

  return (
    <div>
      {!websiteUser?.role && (
        <select name="userRole" className="select select-primary w-full max-w-xs" onChange={handleSelect}>
          <option value={"default"}>Select one</option>
          <option value={"jobSeeker"}>Job Seeker</option>
          <option value={"employer"}>Employer (Job Provider)</option>
          <option value={"entrepreneur"}>Entrepreneur</option>
        </select>
      )}
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label"><span className="label-text">Name</span></label>
          <input type="text" defaultValue={user?.displayName} className="input input-bordered" readOnly />
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Email</span></label>
          <input type="email" defaultValue={user?.email} className="input input-bordered" readOnly />
        </div>
        {(selectedValue === "employer" || websiteUser?.role ==='employer') && (
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
            {!websiteUser?.userProfilePhotoURL && <div className="form-control">
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
            </div>}
             {!websiteUser?.companyLogoUrl && <div className="form-control">
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
            </div>}
            {!websiteUser?.employerIdCardUrl && <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Upload Your ID card card(It is required to verify yourself as
                  a representative of your company)
                </span>
              </label>
              <input
                type="file"
                name="idCard"
                className="file-input file-input-bordered w-full max-w-xs"
                required
                onChange={(e) => handleFileChange(e, setIdCard)}
              />
            </div>}
          </>
        )}
        {(selectedValue === "jobSeeker" || websiteUser?.role=== "jobSeeker") && (
          <>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Skills</span>
              </label>
              {fields.map((field, index) => (
                <div className="flex items-center" key={field.id}>
                  <input
                    type="text"
                    placeholder="Enter a skill"
                    className="input input-bordered mr-2"
                    required
                    {...register(`skills.${index}.name`)}
                  />
                  <button
                    type="button"
                    className="btn"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn"
                onClick={() => append({ name: "" })}
              >
                Add Skills
              </button>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Contact Number</span>
              </label>
              <input
                type="number"
                name="contactNumber"
                placeholder="contact number"
                className="input input-bordered"
                required
                {...register("contactNumber")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <textarea
                name="userAddress"
                placeholder="user address"
                className="textarea textarea-bordered"
                required
                {...register("userAddress")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Job Experience(Write in Details)
                </span>
              </label>
              <textarea
                name="jobExperience"
                placeholder="job experience"
                className="textarea textarea-bordered"
                required
                {...register("jobExperience")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date Of Birth</span>
              </label>
              <input
                type="date"
                name="date"
                placeholder="11-27-2003"
                className="input input-bordered"
                required
                {...register("date")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Portfolio Website (Optional)</span>
              </label>
              <input
                type="text"
                name="portfolio"
                placeholder="www.portfolio.com"
                className="input input-bordered"
                {...register("portfolio")}
              />
            </div>
        {!websiteUser?.userProfilePhotoURL && <div className="form-control">
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
          </div>}
            {!websiteUser?.userResumeURL && <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Upload Your Resume in Picture Format
                </span>
              </label>
              <input
                type="file"
                name="userResume"
                className="file-input file-input-bordered w-full max-w-xs"
                required
                onChange={(e) => handleFileChange(e, setResume)}
              />
            </div>}
          </>
        )}
        {(selectedValue === "entrepreneur" ||websiteUser?.role=== "entrepreneur") && (
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
            {!websiteUser?.userProfilePhotoURL &&<div className="form-control">
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
            </div>}
            {!websiteUser?.companyLogoUrl && <div className="form-control">
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
            </div>}
          </>
        )}
        <div className="form-control mt-6">
          <button className="btn btn-primary" type="submit">{websiteUser ? "Update Information" : "Add Information"}</button>
        </div>
      </form>
    </div>
  );
};

UpdateUserInfo.propTypes = {};

export default UpdateUserInfo;