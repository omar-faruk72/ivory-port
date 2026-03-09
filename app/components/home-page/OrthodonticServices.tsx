"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
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
      const res = await axiosPublic.get(`/all-services?page=${currentPage}&limit=${limit}`);
      return res.data;
    },
  });

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (data?.meta && currentPage < data.meta.totalPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center text-[#7AB7A9]">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-16">
      {/* Header with Navigation */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-[#7AB7A9]">Our Orthodontic Services</h2>
          <p className="text-gray-600 max-w-xl">
            We provide orthodontic care designed to give you and your family confident, lasting smiles.
          </p>
        </div>
        
        {/* Pagination Controls */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-500">
            Page {data?.meta.page} of {data?.meta.totalPage}
          </span>
          <div className="flex gap-2">
            <button 
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-2 border border-[#7AB7A9] text-[#7AB7A9] rounded-md hover:bg-[#7AB7A9] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={handleNextPage}
              disabled={data?.meta && currentPage >= data.meta.totalPage}
              className="p-2 bg-[#7AB7A9] text-white rounded-md hover:bg-[#68a093] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.data.map((service) => {
          // প্রথম ট্রিটমেন্ট থেকে ইমেজ নেওয়া হচ্ছে
          const displayImage = service.treatments[0]?.imageUrl || '/placeholder.png';
          
          return (
            <div key={service._id} className="group cursor-pointer flex flex-col items-center">
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 shadow-sm border border-gray-50">
                <Image 
                  src={displayImage}
                  alt={service.serviceName}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              </div>
              <div className="mt-5 text-center">
                <h3 className="text-base font-bold text-gray-800 group-hover:text-[#7AB7A9] transition-colors duration-300">
                  {service.serviceName}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {isError && (
        <p className="text-red-500 text-center mt-10 font-medium">Failed to load services. Please check your API.</p>
      )}
    </section>
  );
};

export default OrthodonticServices;