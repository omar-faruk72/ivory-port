"use client";

import { createContext, useContext, useEffect, useState } from "react";
import useAxiosPublic from "../components/hooks/useAxiosPublic";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  // পেজ লোড হলেই চেক করবে টোকেন আছে কি না
 useEffect(() => {
  const fetchUser = async () => {
    const token = localStorage.getItem("access-token");
    
    // টোকেন না থাকলে চেক করার দরকার নেই, লোডিং ফলস করে দাও
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      // সরাসরি "/get-me" কল করুন, কারণ আপনার server.ts এ '/' দেওয়া আছে
      const res = await axiosPublic.get("/auth/get-me", {
        headers: { 
          authorization: token // এখানে টোকেনটি পাঠাচ্ছেন
        },
      });

      if (res.data.success) {
        setUser(res.data.data);
      }
    } catch (error: any) {
      console.error("Auth Error:", error.response?.data || error.message);
      // যদি টোকেন এক্সপায়ার হয়ে যায় তবে রিমুভ করে দাও
      if (error.response?.status === 401) {
        localStorage.removeItem("access-token");
        setUser(null);
      }
    } finally {
      setLoading(false); // সবশেষে লোডিং বন্ধ হবে
    }
  };

  fetchUser();
}, [axiosPublic]);

 const logout = () => {
  localStorage.removeItem("access-token");
  setUser(null);
  
  // উইন্ডো লোকেশন থেকে বর্তমান পাথটি নিয়ে লগইন পেজে পাঠানো
  if (typeof window !== "undefined") {
    const currentPath = window.location.pathname;
    window.location.href = `/login?redirect=${currentPath}`;
  }
};
  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);