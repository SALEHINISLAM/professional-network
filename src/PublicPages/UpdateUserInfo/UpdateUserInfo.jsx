import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../Providers/AuthProviders";
import { useForm } from "react-hook-form";
import axios from "axios";

const UpdateUserInfo = (props) => {
  const { user } = useContext(AuthContext);
  const [selectedValue, setSelectedValue] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [companyLogoURL, setCompanyLogoURL] = useState(null);
  const handleFileChange = async (e, setFile) => {
    const file = e.target.files[0];
    setFile(file);
    await handleUploadImage(companyLogo);
  };
  const handleSelect = (e) => {
    console.log(e.target.value);
    setSelectedValue(e.target.value);
  };
  const handleUploadImage = async (file) => {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "testImage");
    try {
      //https://api.cloudinary.com/v1_1/dsxboutys/image/upload
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDNAME
        }/image/upload`,
        form
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const message = { ...data, name: user?.displayName, email: user?.email };
    console.log(message);
  };
  return (
    <div>
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
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            defaultValue={user?.displayName}
            name="name"
            placeholder="name"
            className="input input-bordered"
            required
            readOnly
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            defaultValue={user?.email}
            name="email"
            className="input input-bordered"
            required
            readOnly
          />
        </div>
        {selectedValue === "employer" && (
          <>
            {/* <div className="form-control">
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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Upload Your Company logo</span>
              </label>
              <input
                type="file"
                name="companyLogo"
                className="file-input file-input-bordered w-full max-w-xs"
                required
                {...register("companyLogo")}
              />
            </div> */}
            <div className="form-control">
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
                {...register("idCard")}
                onChange={(e) => handleFileChange(e, setCompanyLogo)}
              />
            </div>
          </>
        )}

        {/* <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
        </div> */}
        <div className="form-control mt-6">
          <button className="btn btn-primary" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

UpdateUserInfo.propTypes = {};

export default UpdateUserInfo;
