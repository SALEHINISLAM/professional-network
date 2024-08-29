import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProviders';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useLoadAllJobsEmployer = () => {

  const {user}=useContext(AuthContext)
  const axiosPublic=useAxiosPublic();
  const {data, isLoading, error}=useQuery({
    queryKey:[user?.email, "employerJobs"],
    queryFn: async()=>{
      if (!user?.email) {
        return {user:null, jobs:[]}
      }

      const userResult=await axiosPublic.get(`/user?email=${user?.email}`)
      const websiteUser=userResult.data;

      if (!websiteUser?._id) {
        console.log(websiteUser._id, "from load employer job")
        return {user: websiteUser, jobs:[]}
      }

      const jobResult=await axiosPublic.get(`/pastJob/${websiteUser._id}`);
      console.log(jobResult.data,"from employer all jobs ")
      const allJobs=jobResult.data;
      return {user:websiteUser, jobs: allJobs}
    }
  })
  return {user:data?.user, jobs:data?.jobs, isLoading, error}
};

export default useLoadAllJobsEmployer;