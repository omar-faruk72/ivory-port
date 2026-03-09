"use client";

import React from 'react';
import Link from 'next/link'; // লিঙ্ক ইম্পোর্ট করা হয়েছে
import { Plus, Edit3, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const FAQManagement = () => {
  // ডামি ডাটা
  const faqData = Array(6).fill({
    _id: "1", // আইডির নমুনা
    question: "How often should I visit the dentist?",
    answer: "Most patients should visit the dentist every six months for regular check-ups and cleanings....",
    date: "Oct 18, 2025"
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">FAQ</h1>
          <nav className="flex items-center gap-2 text-sm text-gray-400 mt-1">
            {/* ড্যাশবোর্ড লিঙ্ক */}
            <Link href="/dashboard" className="hover:text-[#7AB7A9] transition-colors">
              Dashboard
            </Link>
            <span>›</span>
            <span className="text-[#7AB7A9] font-medium">FAQ</span>
          </nav>
        </div>
        
        {/* Add FAQ বাটনে লিঙ্ক যুক্ত করা হয়েছে */}
        <Link 
          href="/dashboard/faq/add" 
          className="flex items-center gap-2 bg-[#7AB7A9] hover:bg-[#68a093] text-white px-5 py-2.5 rounded-lg transition-all font-medium shadow-sm shadow-[#7AB7A9]/20"
        >
          <Plus size={20} />
          Add FAQ
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#EAF4F2] text-gray-700 font-semibold text-[15px]">
                <th className="px-6 py-4">FAQ Question</th>
                <th className="px-6 py-4">FAQ Answer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {faqData.map((faq, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5 text-gray-700 text-[14px] max-w-[300px]">
                    {faq.question}
                  </td>
                  <td className="px-6 py-5 text-gray-500 text-[14px] max-w-[400px]">
                    {faq.answer}
                  </td>
                  <td className="px-6 py-5 text-gray-600 text-[14px]">
                    {faq.date}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-4">
                      {/* এডিট বাটনে ডায়নামিক লিঙ্ক */}
                      <Link 
                        href={`/dashboard/faq/edit/${faq._id}`} 
                        className="text-gray-400 hover:text-[#7AB7A9] transition-colors"
                      >
                        <Edit3 size={18} />
                      </Link>
                      <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="p-6 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm font-medium">
            Showing 1 to 5 of 12 results
          </p>
          
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 disabled:opacity-50">
              <ChevronLeft size={20} />
            </button>
            
            <button className="w-10 h-10 bg-[#7AB7A9] text-white rounded-lg font-bold text-sm">1</button>
            <button className="w-10 h-10 border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 text-sm">2</button>
            <button className="w-10 h-10 border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 text-sm">3</button>
            <span className="px-1 text-gray-400">...</span>
            <button className="w-10 h-10 border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 text-sm">8</button>
            
            <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQManagement;