"use client";

import { useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/app/providers/AuthProvider"; // আপনার অথ হুক ইমপোর্ট করুন
import useAxiosPublic from "../hooks/useAxiosPublic";

const ContactFormSection = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth(); // লগইন করা ইউজারের ডাটা নিন
  const [isSubmitting, setIsSubmitting] = useState(false);

  // সাবমিট হ্যান্ডলার
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const contactData = Object.fromEntries(formData.entries());

    try {
      // আপনার দেওয়া রুটে ডাটা পোস্ট হচ্ছে
      const res = await axiosPublic.post("/contact/add-contact", contactData);

      if (res.data) {
        toast.success("Message Sent Successfully!");
        form.reset(); // সফল হলে ফর্ম খালি হয়ে যাবে
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 px-6 md:px-10 max-w-7xl mx-auto">
      <Toaster position="top-center" />

      <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100 grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Side: Contact Form */}
        <div className="p-8 md:p-12 lg:p-16 space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Get in Touch</h2>
            <p className="text-slate-500 mt-2 font-medium">
              Our friendly team would love to hear from you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field - Auto-fill Applied */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700">Name</label>
              <input
                required
                name="name"
                type="text"
                defaultValue={user?.name || ""} // ইউজার থাকলে নাম বসে যাবে
                placeholder="Name Here"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#86B1AA]/20 focus:border-[#86B1AA] transition-all"
              />
            </div>

            {/* Email Field - Auto-fill Applied */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700">Email Address</label>
              <input
                required
                name="email"
                type="email"
                defaultValue={user?.email || ""} // ইউজার থাকলে ইমেইল বসে যাবে
                placeholder="hello@example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#86B1AA]/20 focus:border-[#86B1AA] transition-all"
              />
            </div>

            {/* Phone Field - Auto-fill Applied */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700">Phone Number</label>
              <input
                required
                name="phone"
                type="tel"
                defaultValue={user?.phone || ""} // ফোন নম্বর থাকলে বসে যাবে
                placeholder="+1234567890"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#86B1AA]/20 focus:border-[#86B1AA] transition-all"
              />
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700">Message</label>
              <textarea
                required
                name="message"
                rows={4}
                placeholder="Write your message here..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#86B1AA]/20 focus:border-[#86B1AA] transition-all resize-none"
              ></textarea>
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start gap-3">
              <input
                required
                type="checkbox"
                id="form-consent"
                className="mt-1 w-4 h-4 accent-[#86B1AA] border-slate-300 rounded cursor-pointer"
              />
              <label htmlFor="form-consent" className="text-[11px] text-slate-400 leading-normal">
                I consent to having this website store my submitted information... <span className="underline cursor-pointer">privacy policy</span>
              </label>
            </div>

            {/* Submit Button with Loading State */}
            <button
              disabled={isSubmitting}
              type="submit"
              className={`w-full py-4 bg-[#86B1AA] hover:bg-[#769d96] text-white font-bold rounded-xl transition-all shadow-md active:scale-[0.98] uppercase flex items-center justify-center gap-2 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Right Side Image */}
        <div className="relative hidden lg:block min-h-full">
          <Image
            src="/assets/image/contact-form.png" 
            alt="Happy Family"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;