"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { User, ShieldCheck, Camera, Loader2 } from 'lucide-react';
import PersonalInfo from '@/app/components/dashboard/PersonalInfo';
import SecuritySettings from '@/app/components/dashboard/SecuritySettings';
// আপনার প্রজেক্টের সঠিক পাথ অনুযায়ী Auth Context/Hook ইমপোর্ট করুন
import { useAuth } from '@/app/providers/AuthProvider'; 

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('personal');
  
  // AuthProvider থেকে ইউজার এবং লোডিং স্টেট নেওয়া
  const { user, loading } = useAuth(); 

  // ডাটা লোড হওয়ার সময় একটি সিম্পল লোডার
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-[#7AB7A9]" size={40} />
      </div>
    );
  }

  // ইউজার না থাকলে একটি মেসেজ (লগইন রিডাইরেক্টও করতে পারেন)
  if (!user) {
    return <div className="p-10 text-center">Please login to view settings.</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* Header Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <nav className="flex items-center gap-2 text-sm text-gray-400 mt-1">
          <span>Dashboard</span>
          <span>›</span>
          <span className="text-[#7AB7A9] font-medium">Settings</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Dynamic Profile Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
            <div className="h-24 bg-[#EAF4F2]"></div>
            <div className="px-6 pb-8 -mt-12 flex flex-col items-center text-center">
              <div className="relative w-24 h-24 group">
                <Image 
                  src={user?.image || "https://i.ibb.co/Y7YmS6P/user.jpg"} 
                  alt="Profile" 
                  fill
                  className="rounded-full border-4 border-white shadow-md object-cover"
                />
                <button className="absolute bottom-0 right-0 z-10 p-1.5 bg-[#7AB7A9] text-white rounded-full border-2 border-white hover:scale-110 transition-transform">
                  <Camera size={14} />
                </button>
              </div>
              <h2 className="mt-4 text-xl font-bold text-gray-800 uppercase tracking-tight">
                {user?.name || "User Name"}
              </h2>
              <p className="text-gray-400 text-sm font-medium capitalize">
                {user?.role || "Member"}
              </p>

              <div className="w-full mt-6 space-y-3 text-left border-t border-gray-50 pt-6 text-[13px]">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700 w-24">Name:</span>
                  <span className="text-gray-500 flex-1 truncate">{user?.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700 w-24">Email:</span>
                  <span className="text-gray-500 flex-1 truncate">{user?.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700 w-24">Phone:</span>
                  <span className="text-gray-500 flex-1">{user?.phone || 'Not set'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700 w-24">Role:</span>
                  <span className="text-gray-500 flex-1 capitalize">{user?.role}</span>
                </div>
              </div>

              {/* Sidebar Tabs */}
              <div className="w-full mt-8 space-y-2">
                <p className="text-left text-[11px] font-bold text-gray-300 uppercase tracking-widest mb-3 px-2">Menus</p>
                <button 
                  onClick={() => setActiveTab('personal')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm ${activeTab === 'personal' ? 'bg-[#7AB7A9]/10 text-[#7AB7A9] font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <User size={18} /> Personal Information
                </button>
                <button 
                  onClick={() => setActiveTab('security')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm ${activeTab === 'security' ? 'bg-[#7AB7A9]/10 text-[#7AB7A9] font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <ShieldCheck size={18} /> Security
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Render Active Component */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 min-h-[500px]">
            {/* এখন আমরা ইউজার ডাটা প্রপ হিসেবে পাঠিয়ে রাখছি, যাতে পরে কম্পোনেন্টে কাজ করতে পারেন */}
            {activeTab === 'personal' ? (
                <PersonalInfo /> 
            ) : (
                <SecuritySettings />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;