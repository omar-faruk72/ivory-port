"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';

// ডাটা টাইপ ইন্টারফেস
interface Treatment {
  title: string;
  description: string;
  imageUrl: string;
}

interface ServiceData {
  _id: string;
  serviceName: string;
  treatments: Treatment[];
}

interface ApiResponse {
  success: boolean;
  data: ServiceData[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

const OrthodonticServices = () => {
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 4;

  // TanStack Query দিয়ে ডাটা ফেচিং
  const { data, isLoading, isError } = useQuery<ApiResponse>({
    queryKey: ['services', currentPage],
    queryFn: async () => {
      // /all-services এন্ডপয়েন্ট থেকে ডাটা লোড হচ্ছে
      const res = await axiosPublic.get(`/services/all-services?page=${currentPage}&limit=${limit}`);
      return res.data;
    },
  });

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (data?.meta && currentPage < data.meta.totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center text-[#7AB7A9] gap-4">
        <Loader2 className="animate-spin" size={48} />
        <p className="font-medium animate-pulse">Loading amazing smiles...</p>
      </div>
    );
  }

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-20">
      {/* Header with Navigation */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div className="space-y-3">
          <h2 className="text-4xl font-extrabold text-[#7AB7A9]">Our Orthodontic Services</h2>
          <p className="text-gray-500 max-w-lg text-lg">
            We provide orthodontic care designed to give you and your family confident, lasting smiles.
          </p>
        </div>
        
        {/* Pagination Controls */}
        <div className="flex items-center gap-5 bg-gray-50 p-2 rounded-2xl border border-gray-100">
          <span className="text-sm font-bold text-gray-500 ml-2">
            {data?.meta.page} / {data?.meta.totalPage}
          </span>
          <div className="flex gap-2">
            <button 
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-3 border border-[#7AB7A9] text-[#7AB7A9] rounded-xl hover:bg-[#7AB7A9] hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-sm"
            >
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
            <button 
              onClick={handleNextPage}
              disabled={data?.meta && currentPage >= data.meta.totalPage}
              className="p-3 bg-[#7AB7A9] text-white rounded-xl hover:bg-[#649a8d] transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-md shadow-[#7AB7A9]/20"
            >
              <ChevronRight size={22} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {data?.data.map((service) => {
          // প্রথম ট্রিটমেন্ট থেকে ইমেজ নেওয়া হচ্ছে
          const displayImage = service.treatments[0]?.imageUrl || '/placeholder.png';
          
          return (
            <Link 
              key={service._id} 
              href={`/services/${service._id}`} // ডায়নামিক রাউটিং
              className="group flex flex-col items-center outline-none"
            >
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-gray-50 shadow-sm border border-gray-100 ring-4 ring-transparent group-hover:ring-[#7AB7A9]/10 transition-all duration-500">
                <Image 
                  src={displayImage}
                  alt={service.serviceName}
                  fill
                  priority={currentPage === 1}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                {/* Overlay effect on hover */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#7AB7A9] transition-colors duration-300 tracking-tight">
                  {service.serviceName}
                </h3>
                <div className="w-0 group-hover:w-full h-0.5 bg-[#7AB7A9] mx-auto mt-1 transition-all duration-500 rounded-full opacity-50" />
              </div>
            </Link>
          );
        })}
      </div>

      {isError && (
        <div className="flex items-center justify-center gap-3 text-red-500 mt-16 p-6 bg-red-50 rounded-2xl border border-red-100">
          <AlertCircle size={24} />
          <p className="font-semibold text-lg">Failed to fetch services. Please check your backend connection.</p>
        </div>
      )}
    </section>
  );
};

export default OrthodonticServices;