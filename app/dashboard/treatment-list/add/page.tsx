"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ImagePlus, Plus, Save, Loader2, AlertCircle } from 'lucide-react';

// Quill Editor dynamic import
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <div className="h-44 w-full bg-gray-50 animate-pulse rounded-xl border border-gray-200" />
});
import 'react-quill-new/dist/quill.snow.css';

const AddTreatmentPage = () => {
  const [serviceName, setServiceName] = useState('');
  const [sections, setSections] = useState(() => [
    { id: Date.now(), title: '', description: '', image: null as File | null, preview: '', cloudinaryUrl: '' }
  ]);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<string>('');
  const CLOUDINARY_UPLOAD_PRESET = "your_preset_name"; 
  const CLOUDINARY_CLOUD_NAME = "your_cloud_name"; 

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

  // Cloudinary Upload Logic
  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });
    
    if (!res.ok) throw new Error("Failed to upload image to Cloudinary");
    
    const data = await res.json();
    return data.secure_url;
  };

  const handleSave = async () => {
    setErrors('');
    setIsUploading(true);

    try {
      if (!serviceName.trim()) throw new Error("Please enter a Service Name.");

      const updatedSections = [...sections];

      for (let i = 0; i < updatedSections.length; i++) {
        const section = updatedSections[i];
        if (!section.title.trim() || !section.description || section.description === '<p><br></p>' || !section.image) {
          throw new Error(`Please complete all fields in section ${i + 1}.`);
        }

        // Upload to Cloudinary
        const url = await uploadToCloudinary(section.image);
        updatedSections[i].cloudinaryUrl = url;
      }

      const finalData = {
        serviceName,
        treatments: updatedSections.map(s => ({
          title: s.title,
          description: s.description,
          imageUrl: s.cloudinaryUrl
        }))
      };

      console.log("%c--- Data Uploaded Successfully ---", "color: #7AB7A9; font-weight: bold; font-size: 14px;");
      console.log(finalData);
      alert("Success! All images are hosted and data is ready.");
      
    } catch (err: unknown) {
      // ESLint Fix: unknown type handling
      if (err instanceof Error) {
        setErrors(err.message);
      } else {
        setErrors("An unexpected error occurred.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-10 px-4">
      {/* Breadcrumb Header */}
      <div className="bg-white px-8 py-6 rounded-2xl border border-gray-100 shadow-sm mt-6">
        <h1 className="text-[22px] font-semibold text-gray-900">Add New Treatment</h1>
        <nav className="flex items-center gap-2 text-[13px] mt-1 text-gray-400 font-medium">
          <Link href="/dashboard" className="hover:text-[#7AB7A9] transition-colors">Dashboard</Link>
          <span>›</span>
          <Link href="/dashboard/treatment-list" className="hover:text-[#7AB7A9] transition-colors">Treatment List</Link>
          <span>›</span>
          <span className="text-gray-500">Add Treatment</span>
        </nav>
      </div>

      {/* Error Alert Box */}
      {errors && (
        <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="text-red-500" size={20} />
          <p className="text-red-700 text-sm font-semibold">{errors}</p>
        </div>
      )}

      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-8">
        {/* Service Input */}
        <div className="space-y-2">
          <label className="text-[15px] font-bold text-gray-700 flex items-center gap-1">
            Service Name <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            placeholder="e.g. Ivory Port Specialized Clinic"
            className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50/30 focus:outline-none focus:ring-2 focus:ring-[#7AB7A9]/20 focus:border-[#7AB7A9] transition-all" 
          />
        </div>

        {sections.map((section, index) => (
          <div key={section.id} className="space-y-8 p-6 border border-gray-50 rounded-2xl bg-gray-50/10">
            <div className="flex justify-between items-center">
              <span className="bg-[#7AB7A9]/10 text-[#7AB7A9] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Section {index + 1}
              </span>
            </div>
            
            <div className="space-y-2">
              <label className="text-[15px] font-bold text-gray-700">Title *</label>
              <input 
                type="text" 
                value={section.title}
                onChange={(e) => handleInputChange(section.id, 'title', e.target.value)}
                placeholder="Treatment stage title" 
                className="w-full p-4 border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-[#7AB7A9] shadow-sm" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[15px] font-bold text-gray-700">Description *</label>
              <div className="quill-container border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                <ReactQuill 
                  theme="snow"
                  value={section.description}
                  onChange={(val) => handleInputChange(section.id, 'description', val)}
                  placeholder="Describe the process..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[15px] font-bold text-gray-700">Upload Image *</label>
              <input type="file" id={`file-${section.id}`} className="hidden" accept="image/*" onChange={(e) => handleImageChange(section.id, e.target.files?.[0] || null)} />
              <label htmlFor={`file-${section.id}`} className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-all cursor-pointer group min-h-[180px]">
                {section.preview ? (
                  <div className="relative w-full h-40">
                    <img src={section.preview} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity">
                      <span className="text-xs font-bold text-gray-600 bg-white/80 px-3 py-1 rounded-full">Change Image</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-14 h-14 bg-[#EAF4F2] rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <ImagePlus className="text-[#7AB7A9]" size={28} />
                    </div>
                    <p className="text-gray-500 text-sm font-semibold">Select from your Device</p>
                    <p className="text-gray-400 text-xs mt-1">Supports: JPG, PNG, WEBP</p>
                  </>
                )}
              </label>
            </div>
          </div>
        ))}

        {/* Action Buttons */}
        <div className="space-y-4 pt-6">
          <button 
            onClick={addMoreDescription} 
            type="button" 
            className="w-full py-4 border-2 border-[#7AB7A9]/30 bg-[#EAF4F2]/20 text-[#7AB7A9] rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#EAF4F2]/50 transition-all active:scale-[0.99]"
          >
            <Plus size={20} strokeWidth={3} /> Add More Section
          </button>

          <button 
            onClick={handleSave} 
            disabled={isUploading}
            type="button" 
            className="w-full py-4 bg-[#7AB7A9] text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#68a093] transition-all disabled:opacity-60 shadow-xl shadow-[#7AB7A9]/20"
          >
            {isUploading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
            {isUploading ? "Uploading Data..." : "Finalize & Save Treatment"}
          </button>
        </div>
      </div>

      <style jsx global>{`
        .ql-toolbar.ql-snow { border: none !important; border-top: 1px solid #f3f4f6 !important; background: #fff !important; display: flex !important; justify-content: flex-end !important; order: 2; padding: 12px 20px !important; }
        .ql-container.ql-snow { border: none !important; min-height: 200px; order: 1; font-size: 15px; }
        .ql-editor.ql-blank::before { font-style: normal !important; color: #9ca3af !important; }
      `}</style>
    </div>
  );
};

export default AddTreatmentPage;