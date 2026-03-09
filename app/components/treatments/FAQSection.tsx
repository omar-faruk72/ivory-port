"use client";

import { useState } from "react";
import { ChevronRight, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

type FAQ = {
  _id: string;
  question: string;
  answer: string;
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const axiosPublic = useAxiosPublic();

  // TanStack Query ব্যবহার করে ডাটা ফেচিং
  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-faqs", currentPage],
    queryFn: async () => {
      const res = await axiosPublic.get(`/all-faqs?page=${currentPage}&limit=10`);
      return res.data;
    },
  });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="animate-spin text-teal-600" size={40} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-20 text-center text-red-500 font-medium">
        Failed to load FAQs. Please try again.
      </div>
    );
  }

  const faqs: FAQ[] = data?.data || [];
  const meta = data?.meta;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-teal-600">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 mt-3 text-lg">
            Find answers to common questions about our treatments.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq._id} className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-teal-700 font-semibold text-lg">
                  {faq.question}
                </span>
                <ChevronRight
                  className={`text-teal-600 transition-transform duration-300 ${
                    openIndex === index ? "rotate-90" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                  {/* HTML কন্টেন্ট রেন্ডার করার জন্য dangerouslySetInnerHTML */}
                  <div 
                    className="prose prose-teal max-w-none"
                    dangerouslySetInnerHTML={{ __html: faq.answer }} 
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {meta && meta.totalPage > 1 && (
          <div className="mt-12 flex justify-center items-center gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage((prev) => prev - 1);
                setOpenIndex(null); // পেজ চেঞ্জ হলে একর্ডিয়ন বন্ধ করে দেওয়া
              }}
              className="px-6 py-2 border border-teal-600 text-teal-600 rounded-full font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-teal-50 transition-all"
            >
              Previous
            </button>
            
            <span className="text-gray-600 font-medium">
              Page <span className="text-teal-600">{currentPage}</span> of {meta.totalPage}
            </span>

            <button
              disabled={currentPage === meta.totalPage}
              onClick={() => {
                setCurrentPage((prev) => prev + 1);
                setOpenIndex(null);
              }}
              className="px-6 py-2 bg-teal-600 text-white rounded-full font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-teal-700 shadow-md transition-all"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </section>
  );
}