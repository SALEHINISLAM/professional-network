import React, { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Providers/AuthProviders";

const useAllAdminLoadJobs = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data, isLoading, error } = useQuery({
    queryKey: [user?.email, "AdminJobs"],
    queryFn: async () => {
      const result = await axiosSecure.get("/allJobs");
      console.log('Fetched jobs data:', result.data); 
      return result.data;
    },
    enabled: !!user?.email,
  });

  return { allJobs: data, isLoading, error }; 
};

export default useAllAdminLoadJobs;