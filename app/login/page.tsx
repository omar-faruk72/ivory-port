"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, ArrowRight, Home } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      
      {/* Left Side: Login Form */}
      <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 bg-white py-12">
        <div className="max-w-md w-full mx-auto space-y-8">
          
          {/* Logo & Heading */}
          <div className="space-y-2">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#86B1AA] transition-colors mb-4 group">
              <Home size={18} />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
            
            <div className="flex items-center gap-2 mb-6">
                 <div className="w-10 h-10 bg-[#86B1AA] rounded-full flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-[#86B1AA]/20">P</div>
                 <span className="text-xl font-bold text-slate-800 tracking-tight">Perrystown Orthodontics</span>
            </div>
            
            <h1 className="text-3xl font-extrabold text-slate-900">Welcome Back</h1>
            <p className="text-slate-500">Enter your details to access your patient dashboard.</p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#86B1AA] transition-colors" size={18} />
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-[#86B1AA]/10 focus:border-[#86B1AA] outline-none transition-all placeholder:text-slate-300"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <Link href="#" className="text-xs font-bold text-[#86B1AA] hover:underline">Forgot password?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#86B1AA] transition-colors" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-[#86B1AA]/10 focus:border-[#86B1AA] outline-none transition-all placeholder:text-slate-300"
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="w-4 h-4 accent-[#86B1AA] rounded cursor-pointer" />
              <label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer select-none">Remember this device</label>
            </div>

            {/* Login Button */}
            <button className="w-full py-4 bg-[#86B1AA] hover:bg-[#769d96] text-white font-bold rounded-xl transition-all shadow-xl shadow-[#86B1AA]/20 flex items-center justify-center gap-2 group active:scale-[0.98]">
              Sign In
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center text-slate-600 font-medium">
            New to our clinic?{" "}
            <Link href="/register" className="text-[#86B1AA] font-extrabold hover:underline">
              Create an Account
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side: Visual Image */}
      <div className="hidden lg:block relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#86B1AA]/40 to-transparent z-10"></div>
        <Image 
          src="/assets/image/login.jpg"
          alt="Modern Dental Clinic"
          fill
          className="object-cover scale-105 hover:scale-100 transition-transform duration-1000"
          priority
        />
        
        {/* Decorative Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full px-12">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl text-center">
                <h3 className="text-white text-2xl font-bold mb-2">Specialist Care for Your Smile</h3>
                <p className="text-white/80">Log in to manage your appointments and view your treatment progress.</p>
            </div>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;