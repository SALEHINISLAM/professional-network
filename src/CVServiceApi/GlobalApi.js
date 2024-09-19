import useAxiosPublic from "../hooks/useAxiosPublic";

const axiosPublic=useAxiosPublic()
/**
 * 
 * https://www.googleapis.com/books/v1/volumes?q=nextJS
 * 
 * const youtubeApiKey = import.meta.env.VITE_APP_ID; // Replace with your YouTube API key
      const youtubeResponse = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            part: "snippet",
            q: query,
            key: youtubeApiKey,
            maxResults: 4,
            type: "video",
          },
        }
      );
 */
const createNewResume=(data)=>axiosPublic.post('/user-resumes',data)
const GetUserResumes=(userEmail)=>{
    return axiosPublic.get(`/user-resumes?email=${userEmail}`);
}
const UpdateResumeDetails=(id,data)=>{
return axiosPublic.put(`/user-resumes/${id}`,data)
}

const SeeResume=(id)=>{
return axiosPublic.get(`/user-resumes/${id}`)
}
export default{
    createNewResume,
    GetUserResumes, 
    UpdateResumeDetails,
    SeeResume
}