import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFieldArray, useForm } from "react-hook-form";
import useUserInfoFromMongodb from "../../hooks/useUserInfoFromMongodb";
import { text } from "@cloudinary/url-gen/qualifiers/source";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const PostJob = (props) => {
  const [websiteUser, refetch, isLoading] = useUserInfoFromMongodb();
  const [finalJobPost, setFinalJobPost] = useState("");
  const [employerProvidedData, setEmployerProvidedData] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: "skills" });
  if (isLoading) {
    return <span className="loading"></span>;
  }
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const axiosPublic = useAxiosPublic();

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const onSubmit = async (data) => {
    const message = {
      ...data,
      companyName: websiteUser?.companyName,
      companyAddress: websiteUser?.companyAddress,
      companyLogoUrl: websiteUser?.companyLogoUrl,
      employerId: websiteUser?._id,
    };
    setEmployerProvidedData(message);
    console.log(message);
    const prompt = `
    Rewrite the following job post in a professional and engaging way :
    Job Title:${data.jobTitle}
    Number of Positions: ${data.numberOfPosition}
    Employment Type:${data.employmentType}
    Required Skills: ${data.skills.map((skill) => skill.name).join(",")}
    Job Description: ${data.jobDescription || "N/A"}
    Salary: ${data.salary}
    Job Location: ${data.jobLocation}
    Additional Requirement: ${data.jobRequirement}
    Application Deadline:${data.applicationDeadline}
    Company Name:${websiteUser?.companyName}
    Make sure to emphasize the importance of the role , the required skills and the benefits of working with the company. 
    Please provide full post in html formate only so that I can paste it in website .
    `;
    console.log("Our Prompt", prompt);
    try {
      const result = await model.generateContent(prompt);
      console.log("gemini response", result);
      console.log(result.response.text());
      setFinalJobPost(result?.response?.text());
    } catch (err) {
      console.log(err);
    }
  };
  const handleSave = async () => {
    console.log("final content", finalJobPost);
    const fullJobPost = {
      jobData: employerProvidedData,
      finalJobPost: finalJobPost,
    };
    const response = await axiosPublic.post("/jobPost", fullJobPost);
    console.log(response.data);
    if (response.data.insertedId) {
      Swal.fire("Job posted Successfully...");
      refetch();
    }
  };
  return (
    <div>
      <form
        className="card-body max-w-lg mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl font-bold">Post New Job</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Hiring for</span>
          </label>
          <input
            type="text"
            name="jobTitle"
            placeholder="CEO, CTO, CMO, HR, Intern or other"
            className="input input-bordered"
            required
            {...register("jobTitle")}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Position</span>
          </label>
          <input
            type="text"
            name="numberOfPosition"
            placeholder="1/2/3/4 or others"
            className="input input-bordered"
            required
            {...register("numberOfPosition")}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Employment Type</span>
          </label>
          <select
            className="select select-bordered w-full max-w-xs"
            name="employmentType"
            {...register("employmentType", {
              validate: (value) =>
                value !== "default" || "Please select a job type",
            })}
          >
            <option value={"default"}>Select One</option>
            <option value={"partTime"}>Part Time</option>
            <option value={"fullTime"}>Full Time</option>
            <option value={"contractual"}>Contractual</option>
            <option value={"internship"}>Internship</option>
          </select>
          {errors.employmentType && (
            <p role="alert" className="text-error">
              {errors.employmentType.message}
            </p>
          )}
        </div>
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
          <label>
            <span className="label-text">Description (Optional)</span>
          </label>
          <textarea
            name="jobDescription"
            placeholder="job description"
            className="textarea textarea-bordered"
            {...register("jobDescription")}
          />
        </div>
        <div className="form-control">
          <label className="label-text">Salary</label>
          <input
            type="text"
            required
            name="salary"
            placeholder="salary"
            className="input input-bordered"
            {...register("salary")}
          />
        </div>
        <div className="form-control">
          <label className="label-text">Location</label>
          <input
            type="text"
            required
            name="jobLocation"
            placeholder="remote or enter specific location"
            className="input input-bordered"
            {...register("jobLocation")}
          />
        </div>
        <div className="form-control">
          <label className="label-text">Requirement(Optional)</label>
          <textarea
            name="jobRequirement"
            placeholder="briefly describe the special requirement"
            className="textarea textarea-bordered"
            {...register("jobRequirement")}
          />
        </div>
        <div className="form-control">
          <label className="label-text">Application Deadline</label>
          <input
            type="date"
            name="applicationDeadline"
            placeholder="mm-dd-yyyy"
            className="textarea textarea-bordered"
            required
            {...register("applicationDeadline")}
          />
        </div>
        <div className="form-control">
          <label className="label-text">Select suitable pricing</label>
          <select
            className="select select-bordered w-full max-w-xs"
            name="price"
            {...register("price", {
              validate: (value) =>
                value !== "default" || "Please select a job type",
            })}
          >
            <option value={"default"}>Select your plan</option>
            <option value={"1"}>1$ Basic</option>
            <option value={"5"}>
              5$ Standard (Show job in our main stream media)
            </option>
            <option value={"10"}>
              10$ Grand(Show your job in top of the page, mail probable talent
              and show in our main stream media)
            </option>
          </select>
          {errors.price && (
            <p role="alert" className="text-error">
              {errors.price.message}
            </p>
          )}
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary" type="submit">
            Generate Job Post with AI
          </button>
        </div>
      </form>

      {/* todo: disabled when ai generated text is empty */}
      <div className="mt-8 container mx-auto px-3">
        <h3 className="text-4xl font-semibold">Edit Job Post</h3>
        <ReactQuill
          theme="snow"
          value={finalJobPost}
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
          placeholder="Write something amazing..."
          modules={modules}
          onChange={setFinalJobPost}
        />
        <button className="btn btn-error" onClick={handleSave}>
          Post the Job
        </button>
      </div>
    </div>
  );
};

PostJob.propTypes = {};

export default PostJob;
