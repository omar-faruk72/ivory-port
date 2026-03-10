"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import useAxiosPublic from '@/app/components/hooks/useAxiosPublic';

interface FeeItem {
  _id: string;
  name: string;
  title: string;
  rate: string;
  description: string;
  createdAt: string;
}

export default function TreatmentFeesPage() {
  const axiosPublic = useAxiosPublic();

  const { data: fees, isLoading } = useQuery({
    queryKey: ['treatment-fees'],
    queryFn: async () => {
      const res = await axiosPublic.get('/treatment/all-treatments');
      // আপনার API রেসপন্স অনুযায়ী ডাটা রিটার্ন করা হচ্ছে
      return res.data?.data as FeeItem[];
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="animate-spin text-[#7AB7A9]" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      
      {/* Header Section */}
      <div className="space-y-4 text-center md:text-left">
        <h1 className="text-3xl font-bold text-[#7AB7A9]">Treatment Fees</h1>
        <p className="text-gray-600 leading-relaxed max-w-5xl">
          All fees are fully transparent and discussed in detail during your consultation appointment. 
          Because each smile is unique, treatment plans are custom-designed to meet individual needs.
        </p>
      </div>

      {/* Fees Content Wrapper */}
      <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <div className="bg-[#7AB7A9] p-4 text-center">
          <h2 className="text-white font-bold text-xl">Our Pricing List</h2>
        </div>

        <div className="bg-white divide-y divide-gray-100">
          {fees && fees.length > 0 ? (
            fees.map((fee) => (
              <div 
                key={fee._id} 
                className="p-6 transition-colors hover:bg-gray-50/50"
              >
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-2">
                  <div className="space-y-1">
                    <h3 className="text-gray-800 font-bold text-xl">{fee.name}</h3>
                    {fee.title && (
                      <p className="text-[#7AB7A9] text-sm font-semibold uppercase tracking-wide">
                        {fee.title}
                      </p>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                    <span className="text-gray-800 font-extrabold text-xl">
                      {fee.rate.toLowerCase() === 'free' || fee.rate === '0' 
                        ? 'FREE' 
                        : `€${fee.rate}`}
                    </span>
                  </div>
                </div>

                {/* Rich Text Description - formatted as added in Admin */}
                {fee.description && (
                  <div 
                    className="prose prose-teal max-w-none text-gray-600 mt-4 price-description"
                    dangerouslySetInnerHTML={{ __html: fee.description }} 
                  />
                )}
              </div>
            ))
          ) : (
            <div className="p-20 text-center text-gray-400">
              No treatment fees found.
            </div>
          )}
        </div>
      </div>

      {/* Global CSS for Quill Content Formatting */}
      <style jsx global>{`
        .price-description p { margin-bottom: 0.8rem; line-height: 1.6; }
        .price-description ul { list-style-type: disc; margin-left: 1.5rem; margin-bottom: 1rem; }
        .price-description ol { list-style-type: decimal; margin-left: 1.5rem; margin-bottom: 1rem; }
        .price-description strong { font-weight: 700; color: #374151; }
        .price-description em { font-style: italic; }
        .price-description u { text-decoration: underline; }
        .price-description .ql-align-center { text-align: center; }
        .price-description .ql-align-right { text-align: right; }
        .price-description .ql-align-justify { text-align: justify; }
        /* Quill list items formatting */
        .price-description li { margin-bottom: 0.25rem; }
      `}</style>
    </div>
  );
}