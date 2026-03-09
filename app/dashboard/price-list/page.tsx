"use client";

import React from 'react';
import Link from 'next/link';
import { Plus, Edit3, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import useAxiosPublic from '@/app/components/hooks/useAxiosPublic';

export default function PriceListPage() {
  const axiosPublic = useAxiosPublic();


  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      
      {/* Header Section with Breadcrumb & Add Button */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Price List</h1>
          <nav className="flex items-center gap-2 text-sm text-gray-400 mt-1">
            <Link href="/dashboard" className="hover:text-[#7AB7A9] transition-colors">Dashboard</Link>
            <span>›</span>
            <span className="text-[#7AB7A9] font-medium">Price List</span>
          </nav>
        </div>

        <Link 
          href="/dashboard/price-list/add" 
          className="bg-[#7AB7A9] hover:bg-[#68a093] text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all shadow-md shadow-[#7AB7A9]/20"
        >
          <Plus size={20} />
          Add Price List
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#E6F0EE] text-gray-700 font-semibold">
              <th className="p-5 text-center w-1/4">Service Name</th>
              <th className="p-5 text-center w-1/3">Description</th>
              <th className="p-5 text-center">Rate</th>
              <th className="p-5 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {/* ডাটা লোড হলে এখানে ম্যাপ হবে, আপাতত স্ট্যাটিক ডিজাইন */}
            {[1, 2, 3, 4].map((item) => (
              <tr key={item} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-5 text-center font-medium text-gray-800">Early Treatment</td>
                <td className="p-5 text-center text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsu...
                </td>
                <td className="p-5 text-center font-bold text-gray-800">€1000</td>
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
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border text-gray-600 hover:border-[#7AB7A9] transition-colors">2</button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border text-gray-600 hover:border-[#7AB7A9] transition-colors">3</button>
            <span className="text-gray-400">...</span>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border text-gray-600 hover:border-[#7AB7A9] transition-colors">8</button>
            <button className="p-2 border rounded-lg text-gray-600 hover:border-[#7AB7A9] transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}