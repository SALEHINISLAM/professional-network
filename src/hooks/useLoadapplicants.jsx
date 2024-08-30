import React, { useContext } from "react";
import PropTypes from "prop-types";
import useAxiosSecure from './useAxiosSecure'
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Providers/AuthProviders";
const useLoadApplicants = (props) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, error } = useQuery({
    queryKey: [user?.email, "JobSeekersJobs"],
    queryFn: async () => {
      if (!user?.email) {
        return { user: null, jobs: [] };
      }

      const userResult = await axiosSecure.get(`/user?email=${user?.email}`);
      const websiteUser = userResult.data;

      if (!websiteUser?._id) {
        console.log("from load job employer , showed for user not found");
        return { user: websiteUser, jobs: [] };
      }

      const jobResult = await axiosSecure.get(
        `/employer/${websiteUser?._id}/jobsWithApplicants`
      );
      console.log(jobResult.data, "from job seeker applied jobs ");
      const appliedJobs = jobResult.data;
      return { user: websiteUser, jobs: appliedJobs };
    },
  });
  return { user: data?.user, jobsWithApplicants: data?.jobs, isLoading, error };
};

useLoadApplicants.propTypes = {};

export default useLoadApplicants;
