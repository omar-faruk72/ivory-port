"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Save, Loader2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import 'react-quill-new/dist/quill.snow.css';
import useAxiosPublic from '@/app/components/hooks/useAxiosPublic';

// Rich Text Editor ডাইনামিক ইম্পোর্ট
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <div className="h-[200px] bg-gray-50 animate-pulse rounded-xl" /> 
});

export default function AddPriceListPage() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    rate: '',
    description: ''
  });

  const axiosPublic = useAxiosPublic();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Mutation logic
  const { mutate, isPending } = useMutation({
    mutationFn: async (newPrice: typeof formData) => {
      const res = await axiosPublic.post('/treatment/add-treatments', newPrice);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['price-list'] });
      Swal.fire("Success!", "New price item added.", "success");
      router.push('/dashboard/price-list');
    },
    onError: (err: any) => {
      Swal.fire("Error", err?.response?.data?.message || "Something went wrong", "error");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      
      {/* Header Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">New List</h1>
        <nav className="flex items-center gap-2 text-sm text-gray-400 mt-1">
          <Link href="/dashboard" className="hover:text-[#7AB7A9]">Dashboard</Link>
          <span>›</span>
          <Link href="/dashboard/price-list" className="hover:text-[#7AB7A9]">Price List</Link>
        </nav>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Name Input */}
        <div className="space-y-2">
          <label className="text-[17px] font-bold text-gray-800">Name</label>
          <input 
            type="text"
            placeholder="Service name here"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#7AB7A9] bg-white"
            required
          />
        </div>

        {/* Title Input */}
        <div className="space-y-2">
          <label className="text-[17px] font-bold text-gray-800">Title</label>
          <input 
            type="text"
            placeholder="Service title here"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#7AB7A9] bg-white"
            required
          />
        </div>

        {/* Rate Input */}
        <div className="space-y-2">
          <label className="text-[17px] font-bold text-gray-800">Rate</label>
          <input 
            type="text"
            placeholder="Rate (e.g. €1000)"
            value={formData.rate}
            onChange={(e) => setFormData({...formData, rate: e.target.value})}
            className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#7AB7A9] bg-white"
            required
          />
        </div>

        {/* Description Rich Text Editor */}
        <div className="space-y-2">
          <label className="text-[17px] font-bold text-gray-800">Description</label>
          <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <ReactQuill 
              theme="snow"
              value={formData.description}
              onChange={(val) => setFormData({...formData, description: val})}
              placeholder="Description here"
            />
          </div>
        </div>

        {/* Save Button */}
        <button 
          type="submit"
          disabled={isPending}
          className="w-full bg-[#7AB7A9] hover:bg-[#68a093] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] disabled:opacity-70"
        >
          {isPending ? <Loader2 className="animate-spin" size={24} /> : <Save size={24} />}
          Save
        </button>
      </form>

      {/* Custom Editor Styling */}
      <style jsx global>{`
        .ql-toolbar.ql-snow {
          border: none !important;
          border-bottom: 1px solid #f3f4f6 !important;
          padding: 12px !important;
          display: flex;
          justify-content: flex-end;
          background: #fff;
        }
        .ql-container.ql-snow {
          border: none !important;
          min-height: 200px;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}