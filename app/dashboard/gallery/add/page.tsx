"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Save, Loader2, ImagePlus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useAxiosPublic from '@/app/components/hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import imageCompression from 'browser-image-compression'; 

export default function AddGalleryPage() {
  const [formData, setFormData] = useState({ name: '', title: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const axiosPublic = useAxiosPublic();
  const router = useRouter();

  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // ভ্যালিডেশন চেক
    if (!imageFile) return Swal.fire("Error", "Please select an image", "error");
    if (!uploadPreset || !cloudName) {
        return Swal.fire("Error", "Cloudinary credentials missing in .env file", "error");
    }

    setLoading(true);
    try {
      // ১. ইমেজ কম্প্রেশন (যেকোনো বড় ইমেজকে ১ এমবি-র নিচে নামিয়ে আনবে)
      const options = {
        maxSizeMB: 1,           // সর্বোচ্চ ১ মেগাবাইট
        maxWidthOrHeight: 1920, // ইমেজের কোয়ালিটি ঠিক রাখবে
        useWebWorker: true
      };
      
      const compressedFile = await imageCompression(imageFile, options);

      // ২. Cloudinary-তে ইমেজ আপলোড
      const imageData = new FormData();
      imageData.append("file", compressedFile); // এখানে কম্প্রেসড ফাইলটি যাচ্ছে
      imageData.append("upload_preset", uploadPreset);

      const cloudinaryRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: imageData }
      );
      
      const cloudData = await cloudinaryRes.json();

      // Cloudinary এরর চেক
      if (!cloudinaryRes.ok) {
        throw new Error(cloudData.error?.message || "Cloudinary upload failed");
      }

      const imageUrl = cloudData.secure_url;

      // ৩. ডাটাবেজে ডাটা পাঠানো
      const finalData = {
        name: formData.name,
        title: formData.title,
        image: imageUrl 
      };

      const res = await axiosPublic.post('/add-gallery', finalData);
      
      if (res.data.success) {
        Swal.fire("Success!", "Gallery item saved successfully.", "success");
        router.push('/dashboard/gallery');
      }
    } catch (error: any) {
      console.error("Upload Error:", error);
      Swal.fire("Error", error.message || "Failed to upload or save gallery item", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">Gallery Management</h1>
        <nav className="flex items-center gap-2 text-sm text-gray-400 mt-1">
          <Link href="/dashboard" className="hover:text-[#7AB7A9]">Dashboard</Link>
          <span>›</span>
          <Link href="/dashboard/gallery" className="hover:text-[#7AB7A9]">Gallery Management</Link>
          <span>›</span>
          <span className="text-[#7AB7A9] font-medium">Add Gallery</span>
        </nav>
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
        <div className="space-y-2">
          <label className="text-[17px] font-bold text-gray-800">Image Name</label>
          <input 
            type="text"
            placeholder="Image name here"
            className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#7AB7A9] bg-white transition-all"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-[17px] font-bold text-gray-800">Image Title</label>
          <input 
            type="text"
            placeholder="Image title here"
            className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#7AB7A9] bg-white transition-all"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-[17px] font-bold text-gray-800">Image</label>
          <div className="relative border-2 border-dashed border-gray-200 rounded-2xl bg-white transition-all hover:border-[#7AB7A9]">
            {preview ? (
              <div className="relative h-64 w-full p-4">
                <img src={preview} alt="Preview" className="h-full w-full object-contain rounded-lg" />
                <button 
                  type="button"
                  onClick={() => {setPreview(null); setImageFile(null);}}
                  className="absolute top-6 right-6 p-2 bg-red-500 text-white rounded-full shadow-md"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-48 cursor-pointer group">
                <ImagePlus size={48} className="text-gray-300 mb-2 group-hover:text-[#7AB7A9] transition-colors" />
                <span className="text-gray-400 group-hover:text-[#7AB7A9]">Click to upload any image (Auto-compressed)</span>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                />
              </label>
            )}
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-[#7AB7A9] hover:bg-[#68a093] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 transition-all"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={24} />
              <span>Optimizing & Uploading...</span>
            </>
          ) : (
            <>
              <Save size={24} />
              <span>Save Gallery</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}