import React, { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Providers/AuthProviders";

const useLoadAllUserForAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [user?.email, "AdminUsers"],
    queryFn: async () => {
      const result = await axiosSecure.get('/users');
      console.log('Fetched user data:', result.data); 
      return result.data;
    },
    enabled: !!user?.email,
  });

  return { allUsers: data, isLoading, error,refetch }; 
};

export default useLoadAllUserForAdmin;