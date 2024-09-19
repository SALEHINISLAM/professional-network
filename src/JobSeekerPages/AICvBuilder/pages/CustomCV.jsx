import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { chatSession } from "../../../CVServiceApi/AIModel";
import ReactQuill, { Quill } from "react-quill";
import { SketchPicker } from "react-color";
import useUserInfoFromMongodb from "../../../hooks/useUserInfoFromMongodb";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import PreviewCV from "../PreviewCV";

const CustomCV = (props) => {
  const [websiteUser, refetch, isLoading] = useUserInfoFromMongodb();
  if (isLoading) {
    return <span className="loading"></span>;
  }
  const axiosPublic = useAxiosPublic();
  const [title, setTitle] = useState("");
  const [aiGeneratedSummery, setAiGeneratedSummery] = useState(null);
  const [summery, setSummery] = useState(aiGeneratedSummery);
  const [themeColor, setThemeColor] = useState("#ffffff");
  const [showCV, setShowCV] = useState(false);
  const generateSummeryFromAI = async (jobTitle) => {
    const prompt = `Job Title : ${jobTitle}. Depends on job title give me summery for my resume within 4-5 lines in JSON format with field experience level and summery with experience level for Fresher , Mid-Level, Experienced`;
    console.log(prompt);
    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    setAiGeneratedSummery(JSON.parse(result.response.text()));
  };
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
  const handleCreateCV = async () => {
    const CVInfo = {
      themeColor: themeColor,
      title: title,
      CVSummery: summery,
    };
    console.log(CVInfo);
    const response = await axiosPublic.put(
      `/userInfo/edit/${websiteUser._id}`,
      CVInfo,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.data.modifiedCount > 0) {
      Swal.fire("Your information updated successfully...");
      refetch(); // Refetch user info
      setShowCV(true);
    } else {
      Swal.fire("Something went wrong...");
    }
  };
  useEffect(() => {
    setTitle(websiteUser.title || "");
    setSummery(websiteUser.summery || null);
    setThemeColor(websiteUser.themeColor || "#ffffff");
  }, [websiteUser]);
  return (
    <div className="container mx-auto">
      <h1 className="text-5xl font-extrabold text-center my-10">My CV</h1>
      <h2 className="text-xl font-bold">Choose theme color for your CV</h2>
      <SketchPicker
        color={themeColor}
        onChangeComplete={(color) => setThemeColor(color.hex)}
      />
      <h1 className="text-xl font-bold mt-6">Which Title Choose Match You?</h1>
      <input
        type="text"
        name="jobTitle"
        required
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Ex: Full-Stack-Developer"
        className="input input-bordered m-4 max-w-xs"
        defaultValue={websiteUser?.title}
      />
      <button
        className="btn btn-ghost btn-sm"
        onClick={() => generateSummeryFromAI(title)}
      >
        Create Summery For Your CV
      </button>
      {aiGeneratedSummery && (
        <div>
          <ReactQuill
            theme="snow"
            defaultValue={websiteUser?.summery}
            value={summery}
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
            placeholder="Write something about yourself..."
            modules={modules}
            onChange={(content) => {
              setSummery(content);
            }}
          />
          <h2 className="font-bold text-lg">Suggestions</h2>

          {aiGeneratedSummery?.summaries.map((item, index) => (
            <div
              className="border rounded-lg p-4 hover:shadow-md hover:scale-105 transition-all"
              key={index}
              onClick={() => setSummery(item.summery)}
            >
              <h2>Level: {item.experience}</h2>
              <p>{item.summery}</p>
            </div>
          ))}
        </div>
      )}
      {summery?.length > 0 && (
        <button
          className="btn btn-outline btn-primary"
          onClick={() => handleCreateCV()}
        >
          Create CV
        </button>
      )}
      <div className="max-w-3xl mx-auto">{showCV && <PreviewCV show={true}/>}</div>
    </div>
  );
};

CustomCV.propTypes = {};

export default CustomCV;
