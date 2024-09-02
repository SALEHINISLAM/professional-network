import axios from 'axios';
import React from 'react';

const axiosPublic=axios.create({
    baseURL:'http://localhost:5001/'
    //baseURL:'https://professional-network-server.onrender.com/'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;