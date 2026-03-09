"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Save, Loader2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2'; // এলার্ট দেখানোর জন্য
import 'react-quill-new/dist/quill.snow.css';
import useAxiosPublic from '@/app/components/hooks/useAxiosPublic';

const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <div className="h-[300px] bg-gray-50 animate-pulse rounded-xl" /> 
});

export default function AddFAQPage() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const axiosPublic = useAxiosPublic();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Mutation logic for posting data
  const { mutate, isPending } = useMutation({
    mutationFn: async (newFaq: { question: string; answer: string }) => {
      const res = await axiosPublic.post('/faqs', newFaq);
      return res.data;
    },
    onSuccess: () => {
      // ক্যাশ ইনভ্যালিডেট করা যাতে লিস্ট পেজে নতুন ডাটা দেখা যায়
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
      
      Swal.fire({
        title: "Success!",
        text: "FAQ has been added successfully.",
        icon: "success",
        confirmButtonColor: "#7AB7A9"
      });
      
      router.push('/dashboard/faq'); // সেভ হওয়ার পর লিস্ট পেজে পাঠিয়ে দেওয়া
    },
    onError: (error: any) => {
      Swal.fire({
        title: "Error!",
        text: error?.response?.data?.message || "Something went wrong",
        icon: "error"
      });
    }
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !answer) {
      return Swal.fire("Warning", "Please fill all fields", "warning");
    }
    
    // API-তে ডাটা পাঠানো হচ্ছে
    mutate({ question, answer });
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'align': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean']
    ],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add FAQ</h1>
          <nav className="flex items-center gap-2 text-sm text-gray-400 mt-1">
            <Link href="/dashboard" className="hover:text-[#7AB7A9]">Dashboard</Link>
            <span>›</span>
            <Link href="/dashboard/faq" className="hover:text-[#7AB7A9]">FAQ</Link>
            <span>›</span>
            <span className="text-[#7AB7A9] font-medium">Add FAQ</span>
          </nav>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* FAQ Question */}
        <div className="space-y-2">
          <label className="text-[17px] font-bold text-gray-800">FAQ Question</label>
          <input 
            type="text" 
            required
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="FAQ Question here"
            className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#7AB7A9] bg-white text-gray-600 shadow-sm transition-all"
          />
        </div>

        {/* FAQ Answer with Quill Editor */}
        <div className="space-y-2">
          <label className="text-[17px] font-bold text-gray-800">FAQ Answer</label>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <ReactQuill 
              theme="snow"
              value={answer}
              onChange={setAnswer}
              modules={modules}
              placeholder="Write the answer here..."
            />
          </div>
        </div>

        {/* Save Button with Loading State */}
        <button 
          type="submit"
          disabled={isPending}
          className={`w-full bg-[#7AB7A9] hover:bg-[#68a093] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] ${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" size={24} />
              Saving...
            </>
          ) : (
            <>
              <Save size={24} />
              Save FAQ
            </>
          )}
        </button>
      </form>

      <style jsx global>{`
        .ql-toolbar.ql-snow {
          border: none !important;
          border-bottom: 1px solid #f3f4f6 !important;
          padding: 12px !important;
          display: flex;
          justify-content: flex-end;
          background: #fff;
        }
        .ql-container.ql-snow {
          border: none !important;
          min-height: 250px;
          font-size: 16px;
          color: #4b5563;
        }
      `}</style>
    </div>
  );
}