"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/app/components/hooks/useAxiosPublic";
import { Loader2 } from "lucide-react";
import Image from "next/image";

const GalleryPage = () => {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading } = useQuery({
    queryKey: ["public-gallery"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-gallery?limit=10"); // ১০টি ডেটা লোড হচ্ছে
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin text-[#7AB7A9]" size={48} />
      </div>
    );
  }

  const images = data?.data || [];
  
  // ডেটাকে ৫টি করে দুই ভাগে ভাগ করা (১ম ৫টি Before, ২য় ৫টি After)
  const firstRow = images.slice(0, 5);
  const secondRow = images.slice(5, 10);

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-[#7AB7A9] text-2xl font-semibold mb-4">Our Gallery</h2>
        <p className="text-gray-600 leading-relaxed max-w-5xl text-[15px]">
          At Perrystown Orthodontics, we love celebrating smiles! Here are just a few examples of the beautiful results 
          we've achieved together. Every smile you see here represents a story of care, confidence, and transformation.
        </p>
      </div>

      {/* Film Strip Gallery Section */}
      <div className="relative w-full bg-black py-12">
        {/* Top Film Holes (সাদা বর্গাকার ছিদ্র) */}
        <div className="flex justify-between mb-10 px-6">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="w-8 h-8 bg-white rounded-md opacity-90"></div>
          ))}
        </div>

        <div className="max-w-[1400px] mx-auto px-4 space-y-2">
          {/* 1st Row: BEFORE */}
          <div className="grid grid-cols-5 gap-2">
            {firstRow.map((item: any) => (
              <div key={item._id} className="relative group overflow-hidden">
                <div className="bg-[#1A1A1A] text-white text-center py-2 text-sm font-medium border-b border-gray-800">
                  Before
                </div>
                <div className="relative h-44 w-full bg-gray-900">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* 2nd Row: AFTER */}
          <div className="grid grid-cols-5 gap-2">
            {secondRow.map((item: any) => (
              <div key={item._id} className="relative group overflow-hidden">
                <div className="bg-[#1A1A1A] text-white text-center py-2 text-sm font-medium border-b border-gray-800">
                  After
                </div>
                <div className="relative h-44 w-full bg-gray-900">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Film Holes */}
        <div className="flex justify-between mt-10 px-6">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="w-8 h-8 bg-white rounded-md opacity-90"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;