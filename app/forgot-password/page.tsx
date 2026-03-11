"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { Mail, ArrowRight, Home, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "@/app/components/hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const axiosPublic = useAxiosPublic();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      // ব্যাকএন্ডে ইমেইল পাঠিয়ে OTP রিকোয়েস্ট করা
      const res = await axiosPublic.post("/auth/forgot-password", data);
      
      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "OTP Sent!",
          text: "Check your email for the verification code.",
          timer: 2000
        });
        // ইমেইলটা প্যারামিটার হিসেবে পাঠিয়ে দেব যাতে OTP পেজে সুবিধা হয়
        router.push(`/verify-otp?email=${data.email}`);
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-sm">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">Forgot Password?</h2>
          <p className="text-slate-500 mt-2">Enter your email to receive an OTP</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                {...register("email", { required: "Email is required" })}
                type="email" 
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:border-[#86B1AA] transition-all"
              />
            </div>
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message as string}</span>}
          </div>

          <button 
            disabled={loading}
            className="w-full py-4 bg-[#86B1AA] hover:bg-[#769d96] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Send OTP"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="text-center">
          <Link href="/login" className="text-sm font-bold text-[#86B1AA] hover:underline flex items-center justify-center gap-1">
             Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;