"use client";

import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:8000/api",
});

// সরাসরি ইন্টারসেপ্টর ব্যবহার করুন (useEffect ছাড়া)
axiosPublic.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.authorization = token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;