"use client";

import { useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast"; // মেসেজ দেখানোর জন্য

const ContactSection = () => {
  // ফর্ম সাবমিট হওয়ার সময় বাটন ডিজেবল করার জন্য স্টেট
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // ফর্ম ডাটা অবজেক্ট আকারে পাওয়া (ভবিষ্যতে এপিআই কল করার জন্য)
    const data = Object.fromEntries(formData.entries());
    console.log("Form Data Submitted:", data);

    try {
      // এখানে আপনার ব্যাকএন্ড এপিআই কল করতে পারেন
      // আপাতত আমরা ২ সেকেন্ডের একটি ফেক ডিলে (Delay) দিচ্ছি
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // ১. সাকসেস মেসেজ দেখানো
      toast.success("Message Sent Successfully!");

      // ২. ফর্ম ক্লিন/রিসেট করা
      form.reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto">
      {/* টোস্ট মেসেজ কন্টেইনার */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
        {/* Left Side: Image */}
        <div className="relative min-h-[400px] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/assets/image/get-in.png"
            alt="Contact Us"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-white p-2 md:p-6 rounded-2xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800">Get in Touch</h2>
            <p className="text-slate-500 mt-2 font-medium">
              Our friendly team would love to hear from you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Name
              </label>
              <input
                required
                name="name"
                type="text"
                placeholder="Name Here"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                required
                name="email"
                type="email"
                placeholder="hello@example.com"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Phone Number
              </label>
              <input
                required
                name="phone"
                type="tel"
                placeholder="+1234567890"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition"
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Message
              </label>
              <textarea
                required
                name="message"
                rows={4}
                placeholder="Write your message here..."
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition resize-none"
              ></textarea>
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start gap-3">
              <input
                required
                type="checkbox"
                id="consent"
                className="mt-1 w-4 h-4 text-teal-600 border-slate-300 rounded focus:ring-teal-500 cursor-pointer"
              />
              <label htmlFor="consent" className="text-xs text-slate-500 leading-tight cursor-pointer">
                I consent to having this website store my submitted information so they can respond to my inquiry. See our <span className="underline cursor-pointer">privacy policy</span> to learn more.
              </label>
            </div>

            {/* Submit Button */}
            <button
              disabled={isSubmitting}
              type="submit"
              className={`w-full py-4 bg-[#86B1AA] hover:bg-[#769d96] text-white font-bold rounded-lg transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;