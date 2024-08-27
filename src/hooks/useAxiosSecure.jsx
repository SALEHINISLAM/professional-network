import axios from "axios";
import React,{ useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";

const axiosSecure=axios.create({
    baseURL:'http://localhost:5001'
});
const useAxiosSecure = () => {
    const navigate=useNavigate();
    const {logOut}=useContext(AuthContext)
    axiosSecure.interceptors.request.use(
        function(config){
            const token=localStorage.getItem("access-token")
            console.log(token, "from axios config")
            config.headers.authorization=`Carrier ${token}`;
            return config;
        },
        function(error){
            return Promise.reject(error)
        }
    );
    axiosSecure.interceptors.response.use(
        function (response) {
          return response;
        },
        async(err) => {
          const status = err.response.status;
          console.log("error in the interceptors RESPONSE", err);
          if (status===401 || status===403) {
            await logOut();
            navigate('/login')
          }
          return Promise.reject(err);
        }
      );
    return axiosSecure;
};

export default useAxiosSecure;