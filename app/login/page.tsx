"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, ArrowRight, Home, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "@/app/components/hooks/useAxiosPublic";
import { useAuth } from "@/app/providers/AuthProvider";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useState } from "react";

const LoginPage = () => {
  const axiosPublic = useAxiosPublic();
  const { setUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await axiosPublic.post("/auth/login", data);
      console.log(res.data.data.user)
      if (res.data.success) {
        // ১. localStorage এ টোকেন সেভ করা
        localStorage.setItem("access-token", res.data?.data?.token);
        
        // ২. AuthContext এ ইউজার সেট করা
        setUser(res.data.data.user);

        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          showConfirmButton: false,
          timer: 1500
        });

        router.push("/"); // লগইন শেষে হোম পেজে পাঠানো
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.response?.data?.message || "Invalid email or password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 bg-white py-12">
        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="space-y-2">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#86B1AA] transition-colors mb-4 group">
              <Home size={18} />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-900">Welcome Back</h1>
            <p className="text-slate-500">Enter your details to access your patient dashboard.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
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

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <Link href="#" className="text-xs font-bold text-[#86B1AA]">Forgot password?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  {...register("password", { required: "Password is required" })}
                  type="password" 
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:border-[#86B1AA] transition-all"
                />
              </div>
              {errors.password && <span className="text-red-500 text-xs">{errors.password.message as string}</span>}
            </div>

            {/* Login Button */}
            <button 
              disabled={loading}
              className="w-full py-4 bg-[#86B1AA] hover:bg-[#769d96] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 group disabled:bg-slate-300"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
              {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <p className="text-center text-slate-600 font-medium">
            New to our clinic?{" "}
            <Link href="/register" className="text-[#86B1AA] font-extrabold hover:underline">
              Create an Account
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side Visuals */}
      <div className="hidden lg:block relative overflow-hidden">
        <Image src="/assets/image/login.jpg" alt="Clinic" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#86B1AA]/40 to-transparent z-10"></div>
      </div>
    </div>
  );
};

export default LoginPage;