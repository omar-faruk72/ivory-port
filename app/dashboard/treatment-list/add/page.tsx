"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ImagePlus, Plus, Save, Loader2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation'; // রিডাইরেক্টের জন্য
import Swal from 'sweetalert2'; // সুন্দর অ্যালার্টের জন্য

// Quill Editor dynamic import
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <div className="h-44 w-full bg-gray-50 animate-pulse rounded-xl border border-gray-200" />
});
import 'react-quill-new/dist/quill.snow.css';
import useAxiosPublic from '@/app/components/hooks/useAxiosPublic';

const AddTreatmentPage = () => {
  const axiosPublic = useAxiosPublic();
  const router = useRouter(); // হুক কল করা হলো
  const [serviceName, setServiceName] = useState('');
  const [sections, setSections] = useState(() => [
    { id: Date.now(), title: '', description: '', image: null as File | null, preview: '', cloudinaryUrl: '' }
  ]);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<string>('');

  // Environment Variables
  const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string; 
  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string; 

  const handleImageChange = (id: number, file: File | null) => {
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setSections(prev => prev.map(s => s.id === id ? { ...s, image: file, preview: previewUrl } : s));
  };

  const handleInputChange = (id: number, field: string, value: string) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const addMoreDescription = () => {
    setSections([...sections, { id: Date.now(), title: '', description: '', image: null, preview: '', cloudinaryUrl: '' }]);
  };

  // Cloudinary Upload Logic (এটি এখন আরও ফাস্ট কাজ করবে)
  const uploadToCloudinary = async (file: File) => {
    if (!CLOUDINARY_UPLOAD_PRESET || !CLOUDINARY_CLOUD_NAME) {
      throw new Error("Cloudinary config is missing in environment variables.");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });
    
    if (!res.ok) throw new Error("Image upload failed");
    const data = await res.json();
    return data.secure_url;
  };

  const handleSave = async () => {
    setErrors('');
    setIsUploading(true);

    try {
      // ১. বেসিক ভ্যালিডেশন
      if (!serviceName.trim()) throw new Error("Service Name is required.");
      
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (!section.title.trim() || !section.description || section.description === '<p><br></p>' || !section.image) {
          throw new Error(`Please fill all fields and select an image for Section ${i + 1}.`);
        }
      }

      // ২. প্যারালাল ইমেজ আপলোড (Parallel Uploading)
      // এতে সব ইমেজ একসাথে আপলোড শুরু হবে, ফলে লোগিং টাইম অনেক কমে যাবে।
      const uploadPromises = sections.map(section => uploadToCloudinary(section.image as File));
      const uploadedUrls = await Promise.all(uploadPromises);

      // ৩. ডাটা পেলোড তৈরি
      const payload = {
        serviceName,
        treatments: sections.map((s, index) => ({
          title: s.title,
          description: s.description,
          imageUrl: uploadedUrls[index] // আপলোড হওয়া URL গুলো ইনডেক্স অনুযায়ী সেট করা
        }))
      };

      // ৪. ডাটাবেসে সেভ করা
      const response = await axiosPublic.post('/services/add-service', payload);

      if (response.data.insertedId || response.data.success) {
        await Swal.fire({
          icon: "success",
          title: "Treatment Added!",
          text: "Data has been saved successfully.",
          timer: 1500,
          showConfirmButton: false
        });

        // ৫. অটোমেটিক রিডাইরেক্ট
        router.push('/dashboard/treatment-list');
      }
      
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrors(err.message);
      } else {
        setErrors("Something went wrong. Please try again.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-10 px-4">
      {/* Header Section */}
      <div className="bg-white px-8 py-6 rounded-2xl border border-gray-100 shadow-sm mt-6">
        <h1 className="text-[22px] font-semibold text-gray-900">Add New Treatment</h1>
        <nav className="flex items-center gap-2 text-[13px] mt-1 text-gray-400 font-medium">
          <Link href="/dashboard" className="hover:text-[#7AB7A9]">Dashboard</Link>
          <span>›</span>
          <Link href="/dashboard/treatment-list" className="hover:text-[#7AB7A9]">Treatment List</Link>
          <span>›</span>
          <span className="text-gray-500">Add Treatment</span>
        </nav>
      </div>

      {/* Error Alert */}
      {errors && (
        <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-3 animate-in fade-in">
          <AlertCircle className="text-red-500" size={20} />
          <p className="text-red-700 text-sm font-semibold">{errors}</p>
        </div>
      )}

      {/* Form Content */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-8">
        <div className="space-y-2">
          <label className="text-[15px] font-bold text-gray-700">Service Name *</label>
          <input 
            type="text" 
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            placeholder="e.g. Dental Implant"
            className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50/30 focus:outline-none focus:border-[#7AB7A9] transition-all" 
          />
        </div>

        {sections.map((section, index) => (
          <div key={section.id} className="space-y-6 p-6 border border-gray-100 rounded-2xl bg-gray-50/20">
            <span className="bg-[#7AB7A9]/10 text-[#7AB7A9] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Section {index + 1}
            </span>
            
            <div className="space-y-2">
              <label className="text-[15px] font-bold text-gray-700">Title *</label>
              <input 
                type="text" 
                value={section.title}
                onChange={(e) => handleInputChange(section.id, 'title', e.target.value)}
                placeholder="Section title" 
                className="w-full p-4 border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-[#7AB7A9]" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[15px] font-bold text-gray-700">Description *</label>
              <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                <ReactQuill 
                  theme="snow"
                  value={section.description}
                  onChange={(val) => handleInputChange(section.id, 'description', val)}
                  placeholder="Details..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[15px] font-bold text-gray-700">Image *</label>
              <input type="file" id={`file-${section.id}`} className="hidden" accept="image/*" onChange={(e) => handleImageChange(section.id, e.target.files?.[0] || null)} />
              <label htmlFor={`file-${section.id}`} className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-all cursor-pointer">
                {section.preview ? (
                  <img src={section.preview} alt="Preview" className="h-40 object-contain rounded-lg shadow-sm" />
                ) : (
                  <>
                    <ImagePlus className="text-[#7AB7A9] mb-2" size={32} />
                    <p className="text-gray-500 text-sm font-semibold">Select Image from PC/Mac</p>
                  </>
                )}
              </label>
            </div>
          </div>
        ))}

        {/* Action Buttons */}
        <div className="space-y-4 pt-4">
          <button 
            onClick={addMoreDescription} 
            type="button" 
            className="w-full py-4 border-2 border-[#7AB7A9]/30 bg-[#EAF4F2]/30 text-[#7AB7A9] rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#EAF4F2]/60 transition-all"
          >
            <Plus size={20} /> Add More Section
          </button>

          <button 
            onClick={handleSave} 
            disabled={isUploading}
            type="button" 
            className="w-full py-4 bg-[#7AB7A9] text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#68a093] transition-all disabled:opacity-50 shadow-lg"
          >
            {isUploading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
            {isUploading ? "Uploading & Saving..." : "Final Save to Database"}
          </button>
        </div>
      </div>

      <style jsx global>{`
        .ql-toolbar.ql-snow { border: none !important; border-top: 1px solid #f3f4f6 !important; background: #fff !important; display: flex !important; justify-content: flex-end !important; order: 2; padding: 12px 20px !important; }
        .ql-container.ql-snow { border: none !important; min-height: 180px; order: 1; font-size: 15px; }
      `}</style>
    </div>
  );
};

export default AddTreatmentPage;