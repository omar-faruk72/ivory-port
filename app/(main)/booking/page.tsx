"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronDown, Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import useAxiosPublic from '@/app/components/hooks/useAxiosPublic';
import { useAuth } from '@/app/providers/AuthProvider';

const BookingPage = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth() as any; // আপনার AuthProvider থেকে ইউজার ডাটা নিচ্ছি
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: '',
    consent: false
  });

  // ইউজার লগইন থাকলে নাম এবং ইমেইল অটোমেটিক ইনপুটে সেট করা
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user?.displayName || user?.name || '',
        email: user?.email || ''
      }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      return toast.error("Please consent to the privacy policy");
    }

    setLoading(true);
    try {
      const res = await axiosPublic.post('/booking/add-booking', formData);
      
      if (res.data.success) {
        toast.success("Appointment Request Sent Successfully!");
        
        // ফরম ক্লিয়ার করা (ইউজার ডাটা রেখে বাকিগুলো ক্লিয়ার হবে)
        setFormData({
          name: user?.displayName || user?.name || '',
          email: user?.email || '',
          subject: '',
          phone: '',
          date: '',
          time: '',
          message: '',
          consent: false
        });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <Toaster position="top-right" />
      
      <nav className="max-w-5xl mx-auto mb-12 text-sm text-gray-500">
        <span className="hover:text-gray-700 cursor-pointer">Home</span>
        <span className="mx-2">›</span>
        <span className="text-gray-800 font-medium">Book & appointment</span>
      </nav>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold text-center text-[#7AB7A9] mb-16">
          Book Consultation
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          
          <div className="space-y-2">
            <label className="block text-[15px] font-semibold text-gray-800">Name*</label>
            <input
              required
              type="text"
              value={formData.name}
              placeholder="Name Here"
              className="w-full px-4 py-3 rounded-md border border-gray-200 bg-[#F9FAFB] outline-none focus:border-[#7AB7A9] transition-all"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[15px] font-semibold text-gray-800">Subject*</label>
            <div className="relative">
              <select
                required
                value={formData.subject}
                className="w-full px-4 py-3 rounded-md border border-gray-200 bg-[#F9FAFB] outline-none appearance-none focus:border-[#7AB7A9] transition-all text-gray-500"
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              >
                <option value="">Select a subject</option>
                <option value="General">General Consultation</option>
                <option value="Dental">Dental Checkup</option>
                <option value="Orthodontics">Orthodontics</option>
              </select>
              <ChevronDown className="absolute right-4 top-3.5 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[15px] font-semibold text-gray-800">Email Address*</label>
            <input
              required
              type="email"
              value={formData.email}
              placeholder="hello@example.com"
              className="w-full px-4 py-3 rounded-md border border-gray-200 bg-[#F9FAFB] outline-none focus:border-[#7AB7A9] transition-all"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[15px] font-semibold text-gray-800">Phone Number*</label>
            <input
              required
              type="tel"
              value={formData.phone}
              placeholder="+1234567890"
              className="w-full px-4 py-3 rounded-md border border-gray-200 bg-[#F9FAFB] outline-none focus:border-[#7AB7A9] transition-all"
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[15px] font-semibold text-gray-800">Preferred Date*</label>
            <div className="relative">
              <input
                required
                type="date"
                value={formData.date}
                className="w-full px-4 py-3 rounded-md border border-gray-200 bg-[#F9FAFB] outline-none focus:border-[#7AB7A9] transition-all text-gray-500"
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
              <Calendar className="absolute right-4 top-3.5 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[15px] font-semibold text-gray-800">Preferred Time *</label>
            <div className="relative">
              <input
                required
                type="time"
                value={formData.time}
                className="w-full px-4 py-3 rounded-md border border-gray-200 bg-[#F9FAFB] outline-none focus:border-[#7AB7A9] transition-all text-gray-500"
                onChange={(e) => setFormData({...formData, time: e.target.value})}
              />
              <Clock className="absolute right-4 top-3.5 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-2">
            <label className="block text-[15px] font-semibold text-gray-800">Message</label>
            <textarea
              rows={6}
              value={formData.message}
              placeholder="Write your message here..."
              className="w-full px-4 py-3 rounded-md border border-gray-200 bg-[#F9FAFB] outline-none focus:border-[#7AB7A9] transition-all placeholder:text-gray-400 resize-none"
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>

          <div className="col-span-1 md:col-span-2 flex items-start gap-3 mt-2">
            <input
              id="consent"
              type="checkbox"
              checked={formData.consent}
              className="mt-1 w-4 h-4 rounded border-gray-300 text-[#7AB7A9] focus:ring-[#7AB7A9]"
              onChange={(e) => setFormData({...formData, consent: e.target.checked})}
            />
            <label htmlFor="consent" className="text-sm text-gray-500 leading-relaxed">
              I consent to having this website store my submitted information. See our <span className="text-[#7AB7A9] cursor-pointer hover:underline font-medium">privacy policy</span>.
            </label>
          </div>

          <div className="col-span-1 md:col-span-2 mt-4">
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-[#7AB7A9] hover:bg-[#68a093] text-white py-4 rounded-md font-semibold text-lg transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Book Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;