import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useUserInfoFromMongodb from "../../hooks/useUserInfoFromMongodb";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const EntrepreneurInvestment = () => {
  const [websiteUser, refetch, isLoading] = useUserInfoFromMongodb();
  if (isLoading) {
    return <span className="loading"></span>;
  }
  const axiosSecure = useAxiosSecure();
  const [investmentProposal, setInvestmentProposal] = useState("");
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
  const handleSaveInvestment = async () => {
    const fullProposal = {
      userId:websiteUser?._id,
      investmentProposal: investmentProposal,
    };
    const response = await axiosSecure.post(
      `/postInvestment/${websiteUser?._id}`,
      fullProposal
    );
    console.log(response.data);
    if (response.data.insertedId) {
      Swal.fire("Investment Proposal Posted Successfully");
    }
    refetch();
  };
  return (
    <div className="container mx-auto space-y-10 py-20">
      <h2 className="text-3xl font-bold">
        Write your Future Investment Proposal
      </h2>
      <ReactQuill
        theme="snow"
        value={investmentProposal}
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
        onChange={setInvestmentProposal}
      />
      <button
        className="btn btn-primary"
        onClick={() => handleSaveInvestment()}
      >
        Save and Post Proposal
      </button>
    </div>
  );
};

export default EntrepreneurInvestment;
