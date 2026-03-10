"use client";

import { useState, useRef } from "react";
import { UploadCloud, FileText, X } from "lucide-react";
import { useAuth } from "@/app/providers/AuthProvider"; 
import toast, { Toaster } from "react-hot-toast";

const ReferralFormSection = () => {
  const { user } = useAuth(); 
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ফাইল আপলোড হ্যান্ডলার
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles([...selectedFiles, ...filesArray]);
    }
  };

  // সাবমিট ফাংশন (সরাসরি সাকসেস)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // রিফ্রেশ বন্ধ করবে
    
    // সাথে সাথে সাকসেস মেসেজ
    toast.success("Referral Submitted Successfully!"); 
    
    // ফর্ম এবং ফাইল সাথে সাথে রিসেট
    e.currentTarget.reset(); 
    setSelectedFiles([]); 
  };

  return (
    <section className="py-16 px-6 md:px-10 max-w-5xl mx-auto">
      <Toaster position="top-center" />
      
      {/* ১. Top Content (সব টেক্সট এখানে আছে) */}
      <div className="space-y-6 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#86B1AA]">
          Collaborative Orthodontic Care You Can Trust
        </h2>
        <div className="text-slate-600 space-y-4 leading-relaxed">
          <p>
            At <span className="font-bold text-slate-800">Perrystown Orthodontics</span>, we're proud to work in partnership with our local dental colleagues to provide specialist orthodontic care for patients of all ages. As an exclusively orthodontic practice, our focus is on delivering high-quality, specialist treatment plans that complement the excellent general dental care provided by our referring dentists.
          </p>
          <p>
            We greatly value the trust you place in us when you refer your patients. Throughout their orthodontic journey, we keep communication clear and consistent, ensuring you're fully informed of your patient's progress. Patients are returned to your care for their ongoing dental maintenance and routine treatments.
          </p>
          <p>
            Our goal is to make the referral process simple, collaborative, and seamless, always putting the patient's comfort and wellbeing at the centre of what we do. Thank you for choosing to work with Perrystown Orthodontics. Together, we can help every patient achieve a healthy, confident smile.
          </p>
        </div>
      </div>

      {/* ২. Referral Form Card */}
      <div className="bg-white rounded-[32px] shadow-xl border border-slate-100 p-8 md:p-12">
        <h3 className="text-2xl font-bold text-slate-800 mb-8">Referral Form</h3>
        
        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* Patient Details */}
          <div className="space-y-6">
            <h4 className="font-bold text-slate-700 border-b border-slate-100 pb-2">Patient Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="pName" type="text" placeholder="Patient full name" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" />
              <input name="pDob" type="date" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" />
              <input name="pPhone" type="tel" placeholder="Phone number" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" />
              <input name="pEmail" type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" />
            </div>
          </div>

          {/* Dentist Details (Auto-fill if logged in) */}
          <div className="space-y-6">
            <h4 className="font-bold text-slate-700 border-b border-slate-100 pb-2">Dentist Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="dName" type="text" defaultValue={user?.name || ""} placeholder="Dentist full name" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" />
              <input name="dPractice" type="text" placeholder="Practice name" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" />
              <input name="dPhone" type="tel" defaultValue={user?.phone || ""} placeholder="Phone number" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" />
              <input name="dEmail" type="email" defaultValue={user?.email || ""} placeholder="Email Address" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" />
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Upload Files or Images</label>
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                multiple 
                className="hidden" 
            />
            <div 
                onClick={() => fileInputRef.current?.click()} 
                className="border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-slate-50/50 cursor-pointer"
            >
              <UploadCloud size={40} className="text-slate-400 mb-2" />
              <p className="text-sm text-slate-600">Click to upload files</p>
            </div>

            {/* Selected Files List */}
            <div className="mt-4 space-y-2">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg text-xs">
                  <span className="truncate max-w-[200px]">{file.name}</span>
                  <X size={14} className="cursor-pointer text-red-500" onClick={() => setSelectedFiles(selectedFiles.filter((_, i) => i !== index))} />
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full py-4 bg-[#86B1AA] hover:bg-[#769d96] text-white font-bold rounded-xl shadow-md transition-all active:scale-95 uppercase"
          >
            Submit Referral
          </button>
        </form>
      </div>
    </section>
  );
};

export default ReferralFormSection;