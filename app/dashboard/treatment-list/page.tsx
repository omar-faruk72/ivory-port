"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const TreatmentListPage = () => {
  const treatments = Array(4).fill({
    id: 1,
    name: 'Braces (Train Tracks)',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsu...',
    date: 'Oct 18, 2025',
    image: 'https://res.cloudinary.com/dn5t9fhya/image/upload/v1773028042/3c26082a9cf5fb62132d215b55aacd4763ed521c_dvo4ac.jpg'
  });

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header Section with Linkable Breadcrumbs */}
      <div className="bg-white px-8 py-6 rounded-2xl border border-gray-100 flex justify-between items-center shadow-sm">
        <div className="space-y-1">
          <h1 className="text-[22px] font-semibold text-gray-900">Treatment List</h1>
          <nav className="flex items-center gap-2 text-[13px]">
            <Link 
              href="/dashboard" 
              className="text-gray-400 hover:text-[#7AB7A9] transition-colors"
            >
              Dashboard
            </Link>
            <span className="text-gray-300 font-light">›</span>
            <Link 
              href="/dashboard/treatment-list" 
              className="text-gray-400 hover:text-[#7AB7A9] transition-colors"
            >
              Treatment List
            </Link>
          </nav>
        </div>
        <Link 
          href="/dashboard/treatment-list/add" 
          className="bg-[#7AB7A9] hover:bg-[#68a093] text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all text-[14px] font-medium shadow-sm"
        >
          <Plus size={18} strokeWidth={2.5} />
          Add Service
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#EAF4F2]/60 border-b border-gray-100">
              <tr>
                <th className="pl-8 pr-6 py-5 text-[14px] font-medium text-gray-600 w-[28%] text-center">Service Name</th>
                <th className="px-6 py-5 text-[14px] font-medium text-gray-600 w-[42%] text-center">Description</th>
                <th className="px-6 py-5 text-[14px] font-medium text-gray-600 w-[15%] text-center">Date</th>
                <th className="pl-6 pr-8 py-5 text-[14px] font-medium text-gray-600 w-[15%] text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {treatments.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50/40 transition-colors group">
                  <td className="pl-8 pr-6 py-6">
                    <div className="flex items-center gap-5">
                      <div className="relative w-[100px] h-[65px] overflow-hidden rounded-xl border border-gray-100 flex-shrink-0 shadow-sm">
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <span className="font-semibold text-gray-800 text-[15px]">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-[14px] text-gray-500 leading-relaxed max-w-[450px]">
                      {item.description}
                    </p>
                  </td>
                  <td className="px-6 py-6 text-[14px] text-gray-500 text-center font-medium">
                    {item.date}
                  </td>
                  <td className="pl-6 pr-8 py-6">
                    <div className="flex items-center justify-center gap-5">
                      <button className="text-gray-400 hover:text-[#7AB7A9] transition-colors p-1">
                        <Edit2 size={20} />
                      </button>
                      <button className="text-gray-400 hover:text-red-500 transition-colors p-1">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="px-8 py-6 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-[14px] text-gray-400 font-medium">
            Showing 1 to 5 of 12 results
          </span>
          
          <div className="flex items-center gap-2">
            <button className="p-2.5 rounded-lg border border-gray-100 bg-gray-50/50 text-gray-400 hover:bg-gray-100 transition-colors">
              <ChevronLeft size={18} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#7AB7A9] text-white text-[14px] font-semibold shadow-md shadow-[#7AB7A9]/20">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-100 text-gray-600 hover:bg-gray-50 text-[14px] font-medium transition-colors">
              2
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-100 text-gray-600 hover:bg-gray-50 text-[14px] font-medium transition-colors">
              3
            </button>
            <span className="px-2 text-gray-300 tracking-widest italic">...</span>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-100 text-gray-600 hover:bg-gray-50 text-[14px] font-medium transition-colors">
              8
            </button>
            <button className="p-2.5 rounded-lg border border-gray-100 text-gray-600 hover:bg-gray-50 transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentListPage;