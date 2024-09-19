import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useUserInfoFromMongodb from "../../hooks/useUserInfoFromMongodb";
import Swal from "sweetalert2";
import { careerAdviceChatSession } from "../../CVServiceApi/CareerAdvice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import axios from "axios";
import { BiBook, BiVideo } from "react-icons/bi";
import SuggestedBook from "./SuggestedBook";
import SuggestedVideo from "./SuggestedVideo";

const CareerAdvice = (props) => {
  const [websiteUser, refetch, isLoading] = useUserInfoFromMongodb();
  const [suggestedBooks, setSuggestedBooks] = useState([]);
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [loading,setLoading]=useState(false)
  const [see,setSee]=useState(false)
  const YTApi = import.meta.env.VITE_Google_Search_API;
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const axiosPublic = useAxiosPublic();
  const [careerAdvice, setCareerAdvice] = useState("");
  if (isLoading) {
    return <span className="loading"></span>;
  }

  const GenerateAdviceFromAI = async () => {
    const prompt = `I have a user with the username ${websiteUser.name}. ${
      websiteUser.skills && "They possess the following skills:"
    } ${
      websiteUser.skills &&
      websiteUser.skills.map((skill) => skill.name).join(" , ")
    }.
  Based on these ${
    websiteUser.skills && "skills ,"
  } can you provide tailored career advice? Please suggest the best job roles, industries, or areas for growth, and any recommendations for further skill development to advance their career.
  Write it in html format so that i can copy it to any text editor`;
    try {
      const result = await careerAdviceChatSession.sendMessage(prompt);
      const responseText = await result.response.text();
      console.log("advice" + responseText);
      setCareerAdvice(responseText);
      const response = await axiosPublic.put(
        `/userInfo/edit/${websiteUser._id}`,
        { careerAdvice: responseText, isAdviceUpdated: true },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.data.modifiedCount > 0) {
        Swal.fire("Your advice is ready");
        refetch();
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Something went wrong. Please try again later...");
    }
  };

  useEffect(() => {
    if (websiteUser.careerAdvice && websiteUser.isAdviceUpdated) {
      setCareerAdvice(websiteUser.careerAdvice);
    } else {
      GenerateAdviceFromAI();
    }
  }, [websiteUser]);

  const handleOnSubmitSkill = async (data, e) => {
    e.preventDefault();
    setSee(false)
    setLoading(true)
    const learningSkill = data.learningSkill;
    console.log(data.learningSkill);
    const books = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${learningSkill}`
    );
    console.log(books);
    setSuggestedBooks(books.data.items);
    const youtubeVideo = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: learningSkill,
          key: YTApi,
          maxResults: 10,
          type: "video",
        },
      }
    );
    console.log(youtubeVideo);
    const videoData = youtubeVideo.data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description:item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));
    setSuggestedVideos(videoData)
    console.log(videoData)
    setLoading(false)
    setSee(true)
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl mt-10 font-extrabold">My Career Advice</h1>
      <p className="my-6">
        Get the best career advice from AI Career advisor...
      </p>
      {(careerAdvice.length > 0) ? (
        <div className="">
          <ReactQuill
            theme="snow"
            value={careerAdvice}
            readOnly={true}
            placeholder="my career advice"
            modules={{ toolbar: false }}
          />
          <h3 className="text-center text-xl font-bold mt-10">
            Search Skill What Do You Want to learn
          </h3>
          <form
            className="card-body"
            onSubmit={handleSubmit(handleOnSubmitSkill)}
          >
            <div className="form-control">
              <label>
                <span className="label-text">Search Skill</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Ex: NextJS"
                name="learningSkill"
                {...register("learningSkill")}
                required
              />
              <div className="form-control mt-5">
                <button className="btn btn-error btn-outline" type="submit">
                  Search For Learning Resource
                </button>
              </div>
            </div>
          </form>
          {
            loading && <span className="loading"></span>
          }
          <div className={see===false? "hidden" :"flex flex-col gap-8"} hidden={see===false}>
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-semibold flex text-center">
                <BiBook/> You can read these books 
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-3">
                {suggestedBooks.map((item,index)=><SuggestedBook key={index} book={item}/>)}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-semibold flex items-center">
              <BiVideo/> You can watch these videos 
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                {suggestedVideos.map((item,index)=><SuggestedVideo key={index} video={item}/>)}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <span className="loading loading-spinner loading-xs"></span>
          <span className="loading loading-spinner loading-sm"></span>
          <span className="loading loading-spinner loading-md"></span>
          <span className="loading loading-spinner loading-lg"></span>
        </>
      )}
    </div>
  );
};

CareerAdvice.propTypes = {};

export default CareerAdvice;
