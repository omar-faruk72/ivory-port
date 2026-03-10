"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit3, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '@/app/components/hooks/useAxiosPublic';

export default function GalleryManagementPage() {
  const axiosPublic = useAxiosPublic();

  // গ্যালারি ডাটা ফেচিং
  const { data: galleryItems, isLoading } = useQuery({
    queryKey: ['gallery-list'],
    queryFn: async () => {
      const res = await axiosPublic.get('/gallery'); // আপনার API এন্ডপয়েন্ট
      return res.data?.data;
    }
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      
      {/* Header Section with Breadcrumb & Add Button */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gallery Management</h1>
          <nav className="flex items-center gap-2 text-sm text-gray-400 mt-1">
            <Link href="/dashboard" className="hover:text-[#7AB7A9]">Dashboard</Link>
            <span>›</span>
            <span className="text-[#7AB7A9] font-medium">Gallery Management</span>
          </nav>
        </div>

        <Link 
          href="/dashboard/gallery/add" 
          className="bg-[#7AB7A9] hover:bg-[#68a093] text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all shadow-md shadow-[#7AB7A9]/20"
        >
          <Plus size={20} />
          Add Image
        </Link>
      </div>

      {/* Gallery Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#E6F0EE] text-gray-700 font-semibold">
              <th className="p-5 text-center w-40">Image</th>
              <th className="p-5 text-center">Description</th>
              <th className="p-5 text-center w-40">Date</th>
              <th className="p-5 text-center w-32">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {/* ডামি ডাটা দিয়ে ডিজাইনটি দেখানো হয়েছে */}
            {[1, 2, 3, 4].map((item) => (
              <tr key={item} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-5 flex justify-center">
                  <div className="relative w-24 h-16 rounded-lg overflow-hidden border border-gray-200">
                    <Image 
                      src="/gallery-placeholder.jpg" 
                      alt="Gallery Item"
                      fill
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="p-5 text-center text-gray-500 text-sm leading-relaxed max-w-md mx-auto">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text...
                </td>
                <td className="p-5 text-center text-gray-600 font-medium">
                  Oct 18, 2025
                </td>
                <td className="p-5 text-center">
                  <div className="flex items-center justify-center gap-4">
                    <button className="text-gray-600 hover:text-[#7AB7A9] transition-colors">
                      <Edit3 size={18} />
                    </button>
                    <button className="text-gray-600 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Section */}
        <div className="p-5 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">Showing 1 to 5 of 12 results</p>
          
          <div className="flex items-center gap-2">
            <button className="p-2 border rounded-lg text-gray-400 bg-gray-50 cursor-not-allowed">
              <ChevronLeft size={18} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#7AB7A9] text-white font-medium">1</button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border text-gray-600 hover:border-[#7AB7A9]">2</button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border text-gray-600 hover:border-[#7AB7A9]">3</button>
            <span className="text-gray-400">...</span>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border text-gray-600 hover:border-[#7AB7A9]">8</button>
            <button className="p-2 border rounded-lg text-gray-600 hover:border-[#7AB7A9]">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}