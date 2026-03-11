"use client";

import React from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Loader2, Stethoscope, CheckCircle2 } from 'lucide-react';
import useAxiosPublic from '@/app/components/hooks/useAxiosPublic';

// ইন্টারফেস সেটআপ
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

const SingleServicePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const axiosPublic = useAxiosPublic();

  // নির্দিষ্ট আইডি দিয়ে ডাটা ফেচ করা
  const { data, isLoading, isError } = useQuery<ServiceData>({
    queryKey: ['service', id],
    queryFn: async () => {
      // আপনার এন্ডপয়েন্ট অনুযায়ী ইউআরএলটি চেক করে নিন (যেমন: /service/id)
      const res = await axiosPublic.get(`/services/services/${id}`);
      return res.data.data;
    },
    enabled: !!id, // আইডি থাকলে তবেই কুয়েরি চলবে
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="animate-spin text-[#7AB7A9]" size={50} />
        <p className="mt-4 text-gray-500 font-medium">Fetching treatment details...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-red-500">Service not found!</h2>
        <button 
          onClick={() => router.back()}
          className="mt-4 flex items-center gap-2 text-[#7AB7A9] font-bold"
        >
          <ArrowLeft size={20} /> Go Back
        </button>
      </div>
    );
  }

  return (
    <main className="bg-gray-50/50 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 py-12">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-500 hover:text-[#7AB7A9] transition-colors mb-6 font-medium"
          >
            <ArrowLeft size={20} /> Back to Services
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#7AB7A9] font-bold uppercase tracking-widest text-sm">
                <Stethoscope size={18} />
                <span>Specialized Treatment</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                {data.serviceName}
              </h1>
            </div>
            <div className="bg-[#7AB7A9]/10 px-6 py-3 rounded-2xl border border-[#7AB7A9]/20">
              <p className="text-[#7AB7A9] font-bold text-lg">
                {data.treatments.length} Steps Included
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Treatments List */}
      <div className="max-w-[1000px] mx-auto px-4 mt-12 space-y-16">
        {data.treatments.map((step, index) => (
          <div 
            key={index} 
            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-10 items-center bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-500`}
          >
            {/* Image Section */}
            <div className="w-full md:w-1/2 relative aspect-video md:aspect-square rounded-2xl overflow-hidden shadow-inner bg-gray-50">
              <Image 
                src={step.imageUrl}
                alt={step.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 space-y-5">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#7AB7A9] text-white font-black text-sm">
                  {index + 1}
                </span>
                <h2 className="text-2xl font-bold text-gray-800">{step.title}</h2>
              </div>
              
              {/* Quill Description Render */}
              <div 
                className="text-gray-600 leading-relaxed text-lg prose prose-teal max-w-none"
                dangerouslySetInnerHTML={{ __html: step.description }}
              />
              
              <div className="pt-4 flex items-center gap-2 text-[#7AB7A9] font-semibold">
                <CheckCircle2 size={20} />
                <span>Professional Clinical Standard</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-[1000px] mx-auto px-4 mt-20">
        <div className="bg-[#7AB7A9] rounded-[40px] p-10 md:p-16 text-center text-white shadow-2xl shadow-[#7AB7A9]/30 relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to start your journey?</h2>
            <p className="text-[#EAF4F2] text-lg max-w-xl mx-auto opacity-90">
              Schedule a consultation for {data.serviceName} and let our experts guide you to a perfect smile.
            </p>
            <button className="bg-white text-[#7AB7A9] px-10 py-4 rounded-full font-extrabold text-lg hover:bg-gray-100 transition-all active:scale-95 shadow-lg">
              Book an Appointment
            </button>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        </div>
      </div>
    </main>
  );
};

export default SingleServicePage;