import React, { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useAllJobsJobSeeker = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { data, isLoading, error } = useQuery({
    queryKey: [user?.email, "JobSeekersJobs"],
    queryFn: async () => {
      if (!user?.email) {
        return { user: null, jobs: [] };
      }

      const userResult = await axiosPublic.get(`/user?email=${user?.email}`);
      const websiteUser = userResult.data;

      if (!websiteUser?._id) {
        console.log("from load job seeker job, showed for user not found");
        return { user: websiteUser, jobs: [] };
      }

      const jobResult = await axiosPublic.get(
        `/jobs/nonExpired/${websiteUser?._id}`
      );
      console.log(jobResult.data, "from job seeker all jobs ");
      const findAllJobs = jobResult.data;
      return { user: websiteUser, jobs: findAllJobs };
    },
  });
  return { user: data?.user, findJobs: data?.jobs, isLoading, error };
};

export default useAllJobsJobSeeker;
