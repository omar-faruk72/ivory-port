"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, Mail, Lock, Phone, ArrowRight, Camera, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import useAxiosPublic from "@/app/components/hooks/useAxiosPublic";

const RegisterPage = () => {
  const axiosPublic = useAxiosPublic();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Cloudinary তে ইমেজ আপলোড করার ফাংশন
  const uploadImageToCloudinary = async (file: File) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string;

    if (!cloudName || !uploadPreset) {
      console.error("Cloudinary credentials missing in .env.local");
      return "";
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      return data.secure_url || "";
    } catch (err) {
      console.error("Cloudinary Upload Error:", err);
      return "";
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      let imageUrl = "";
      
      // যদি ইউজার ইমেজ সিলেক্ট করে থাকে
      if (data.image && data.image[0]) {
        imageUrl = await uploadImageToCloudinary(data.image[0]);
      }

      const userData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        image: imageUrl, // ক্লাউডিনারি থেকে পাওয়া সিকিউর ইউআরএল
        role: "user",
      };

      const res = await axiosPublic.post("/auth/users", userData);

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Account Created!",
          text: "You can now log in with your credentials.",
          confirmButtonColor: "#86B1AA",
        });
        router.push("/login");
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.response?.data?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left Side: Form Section */}
      <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12">
        <div className="max-w-md w-full mx-auto space-y-8">
          
          <div className="space-y-2">
            <Link href="/">
              <div className="flex items-center gap-2 mb-6 transition hover:opacity-80">
                 <div className="w-10 h-10 bg-[#86B1AA] rounded-full flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-[#86B1AA]/20">P</div>
                 <span className="text-xl font-bold text-slate-800 tracking-tight">Perrystown</span>
              </div>
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create an account</h1>
            <p className="text-slate-500">Join us today for expert orthodontic care.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            
            {/* Image Upload with Preview */}
            <div className="flex flex-col items-center gap-3 pb-2">
              <div className="relative w-24 h-24 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden bg-slate-50 group hover:border-[#86B1AA] transition-colors">
                {imagePreview ? (
                  <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                ) : (
                  <Camera className="text-slate-400 group-hover:text-[#86B1AA] transition-colors" size={28} />
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  {...register("image")}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setImagePreview(URL.createObjectURL(file));
                  }}
                />
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Profile Photo</span>
            </div>

            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  {...register("name", { required: "Full Name is required" })}
                  type="text" 
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-[#86B1AA]/10 focus:border-[#86B1AA] outline-none transition-all"
                />
              </div>
              {errors.name && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-tighter">{errors.name.message as string}</p>}
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  {...register("email", { 
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                  })}
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-[#86B1AA]/10 focus:border-[#86B1AA] outline-none transition-all"
                />
              </div>
              {errors.email && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-tighter">{errors.email.message as string}</p>}
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  {...register("phone", { required: "Phone number is required" })}
                  type="tel" 
                  placeholder="+880 1XXX XXXXXX"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-[#86B1AA]/10 focus:border-[#86B1AA] outline-none transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  {...register("password", { 
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" }
                  })}
                  type="password" 
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-[#86B1AA]/10 focus:border-[#86B1AA] outline-none transition-all"
                />
              </div>
              {errors.password && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-tighter">{errors.password.message as string}</p>}
            </div>

            {/* Submit Button */}
            <button 
              disabled={loading}
              className="w-full py-4 bg-[#86B1AA] hover:bg-[#769d96] text-white font-bold rounded-xl transition-all shadow-xl shadow-[#86B1AA]/20 flex items-center justify-center gap-2 group disabled:bg-slate-300"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Create Account"}
              {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <p className="text-center text-slate-600 font-medium">
            Already have an account?{" "}
            <Link href="/login" className="text-[#86B1AA] font-extrabold hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side: Visual Section */}
      <div className="hidden lg:block relative overflow-hidden">
        <Image 
          src="/assets/image/register.png"
          alt="Clinic environment"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent z-10"></div>
      </div>

    </div>
  );
};

export default RegisterPage;