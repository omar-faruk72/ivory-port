"use client";

import React, { useState, Suspense } from 'react'; // Suspense যোগ করা হয়েছে
import { useSearchParams, useRouter } from 'next/navigation';
import useAxiosPublic from "@/app/components/hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Loader2 } from 'lucide-react';

// ১. মূল ভেরিফিকেশন লজিক ও UI আলাদা কম্পোনেন্টে
const VerifyOTPForm = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const router = useRouter();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) return Swal.fire("Error", "Enter 6 digit OTP", "error");

    setLoading(true);
    try {
      const res = await axiosPublic.post("/auth/verify-otp", { email, otp });
      if (res.data.success) {
        Swal.fire("Verified!", "Now set your new password", "success");
        // OTP ভেরিফাই হলে নতুন পাসওয়ার্ড পেজে পাঠিয়ে দেওয়া
        router.push(`/reset-password?email=${email}&token=${res.data.token}`);
      }
    } catch (err: any) {
      Swal.fire("Error", err.response?.data?.message || "Invalid OTP", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-sm text-center">
        <h2 className="text-3xl font-extrabold text-slate-900">Verify OTP</h2>
        <p className="text-slate-500">We sent a code to <span className="font-bold">{email}</span></p>

        <form onSubmit={handleVerify} className="space-y-6">
          <input 
            type="text"
            maxLength={6}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="0 0 0 0 0 0"
            className="w-full text-center text-3xl tracking-[1rem] font-bold py-4 rounded-xl border border-slate-200 outline-none focus:border-[#86B1AA]"
          />

          <button 
            disabled={loading}
            className="w-full py-4 bg-[#86B1AA] hover:bg-[#769d96] text-white font-bold rounded-xl transition-all flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Verify Code"}
          </button>
        </form>
      </div>
    </div>
  );
};

// ২. মেইন এক্সপোর্ট ফাংশন যা Suspense Boundary নিশ্চিত করবে
const VerifyOTPPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="animate-spin text-[#86B1AA] mx-auto" size={40} />
          <p className="mt-2 text-slate-500 font-medium">Loading Verification Page...</p>
        </div>
      </div>
    }>
      <VerifyOTPForm />
    </Suspense>
  );
};

export default VerifyOTPPage;