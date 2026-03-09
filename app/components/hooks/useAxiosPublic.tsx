"use client";

import axios from "axios";

const axiosPublic = axios.create({
  // আপনার সার্ভারের বেস ইউআরএল এখানে দিন
  baseURL: "http://localhost:8000", 
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;