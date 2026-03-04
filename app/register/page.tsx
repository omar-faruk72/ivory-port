"use client";

import Link from "next/link";
import Image from "next/image";
import { User, Mail, Lock, Phone, ArrowRight } from "lucide-react";

const RegisterPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      
      {/* Left Side: Form Section */}
      <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 bg-white py-12">
        <div className="max-w-md w-full mx-auto space-y-8">
          
          {/* Logo & Heading */}
          <div className="space-y-2">
            <Link href="/">
              <div className="flex items-center gap-2 mb-6">
                 <div className="w-10 h-10 bg-[#86B1AA] rounded-full flex items-center justify-center font-bold text-white text-xl">P</div>
                 <span className="text-xl font-bold text-slate-800">Perrystown</span>
              </div>
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-900">Create an account</h1>
            <p className="text-slate-500">Join us today and start your journey to a perfect smile.</p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#86B1AA]/20 focus:border-[#86B1AA] outline-none transition"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#86B1AA]/20 focus:border-[#86B1AA] outline-none transition"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="tel" 
                  placeholder="+123 456 789"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#86B1AA]/20 focus:border-[#86B1AA] outline-none transition"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#86B1AA]/20 focus:border-[#86B1AA] outline-none transition"
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2 py-2">
              <input type="checkbox" id="terms" className="mt-1 accent-[#86B1AA]" required />
              <label htmlFor="terms" className="text-xs text-slate-500 leading-snug">
                I agree to the <span className="text-[#86B1AA] font-bold cursor-pointer underline">Terms of Service</span> and <span className="text-[#86B1AA] font-bold cursor-pointer underline">Privacy Policy</span>.
              </label>
            </div>

            {/* Submit Button */}
            <button className="w-full py-4 bg-[#86B1AA] hover:bg-[#769d96] text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group">
              Create Account
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-slate-600">
            Already have an account?{" "}
            <Link href="/login" className="text-[#86B1AA] font-bold hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side: Visual Section */}
      <div className="hidden lg:block relative bg-[#f8fafc]">
        <div className="absolute inset-0 bg-[#86B1AA]/10 z-10"></div>
        <Image 
          src="/assets/image/register.png"
          alt="Clinic environment"
          fill
          className="object-cover"
        />
        {/* Quote Overlay */}
        <div className="absolute bottom-12 left-12 right-12 z-20 bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
           <p className="text-xl font-medium text-slate-800 italic">
             Excellent specialist care. The team made me feel comfortable from day one.
           </p>
           <div className="mt-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-[#86B1AA] rounded-full"></div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Sarah Jenkins</p>
                <p className="text-slate-500 text-xs">Patient since 2023</p>
              </div>
           </div>
        </div>
      </div>

    </div>
  );
};

export default RegisterPage;