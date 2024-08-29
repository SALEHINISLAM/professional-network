import React, { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useUserInfoFromMongodb = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { data: websiteUser, isLoading, refetch } = useQuery({
    queryKey: [user?.email, "websiteUser"],
    queryFn: async () => {
      if(!user?.email){
        return null
      }
      const result = await axiosPublic.get(`/user?email=${user?.email}`);
      return result.data;
    },
  });
  // if (isLoading) {
  //   return "loading"
  // }
  return [websiteUser,refetch, isLoading];
};

export default useUserInfoFromMongodb;
