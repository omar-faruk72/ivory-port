"use client";

import React, { useState, Suspense } from 'react'; // Suspense যোগ করা হয়েছে
import { useSearchParams, useRouter } from 'next/navigation';
import { Lock, ArrowRight, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "@/app/components/hooks/useAxiosPublic";
import Swal from "sweetalert2";

// ১. লজিক এবং UI পার্টটি আলাদা কম্পোনেন্টে
const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const axiosPublic = useAxiosPublic();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  const password = watch("newPassword");

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await axiosPublic.put("/auth/reset-password", {
        email: email,
        newPassword: data.newPassword
      });

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Password reset successful. Please login now.",
        });
        router.push("/login");
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
          <h2 className="text-3xl font-extrabold text-slate-900">New Password</h2>
          <p className="text-slate-500 mt-2">Set a strong password for your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* New Password */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">New Password</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                {...register("newPassword", { 
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" }
                })}
                type="password" 
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:border-[#86B1AA] transition-all"
              />
            </div>
            {errors.newPassword && <span className="text-red-500 text-xs">{errors.newPassword.message as string}</span>}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Confirm Password</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                {...register("confirmPassword", { 
                  required: "Please confirm your password",
                  validate: (value) => value === password || "Passwords do not match"
                })}
                type="password" 
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:border-[#86B1AA] transition-all"
              />
            </div>
            {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword.message as string}</span>}
          </div>

          <button 
            disabled={loading}
            className="w-full py-4 bg-[#86B1AA] hover:bg-[#769d96] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Reset Password"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
};

// ২. মেইন এক্সপোর্ট যা Suspense Boundary নিশ্চিত করে
const ResetPasswordPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-[#86B1AA]" size={40} />
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPasswordPage;