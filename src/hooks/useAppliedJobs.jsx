import React, { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useAppliedJobs = () => {
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
        `/jobs/applied/${websiteUser?._id}`
      );
      console.log(jobResult.data, "from job seeker applied jobs ");
      const appliedJobs = jobResult.data;
      return { user: websiteUser, jobs: appliedJobs };
    },
  });
  return { user: data?.user, appliedJobs: data?.jobs, isLoading, error };
};

export default useAppliedJobs;
