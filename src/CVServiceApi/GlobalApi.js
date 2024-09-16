import useAxiosPublic from "../hooks/useAxiosPublic";

const axiosPublic=useAxiosPublic()

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