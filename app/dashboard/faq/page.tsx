"use client";

import React, { useState } from 'react';
import Link from 'next/link'; 
import { Plus, Edit3, Trash2, ChevronLeft, ChevronRight, Loader2, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '@/app/components/hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';

const FAQManagement = () => {
  const axiosPublic = useAxiosPublic();
  const [page, setPage] = useState(1);
  const limit = 5;

  // Edit States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<any>(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  // ১. FAQ ডাটা ফেচিং
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['faq-list', page],
    queryFn: async () => {
      const res = await axiosPublic.get(`/faq/all-faqs?page=${page}&limit=${limit}`);
      return res.data;
    }
  });

  const faqs = data?.data || [];
  const meta = data?.meta || { total: 0, totalPage: 1 };

  // ২. ডিলিট লজিক
  const handleDelete = async (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this FAQ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7AB7A9',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.delete(`/faq/faq/${id}`);
          if (res.data.success) {
            toast.success("FAQ deleted successfully!");
            refetch();
          }
        } catch (error) {
          toast.error("Failed to delete.");
        }
      }
    });
  };

  // ৩. এডিট মডাল ওপেন ও ডাটা গেট
  const handleEditClick = async (id: string) => {
    setIsEditModalOpen(true);
    setEditingFaq(null);
    try {
      const res = await axiosPublic.get(`/faq/faq/${id}`);
      if (res.data.success) {
        setEditingFaq(res.data.data);
      }
    } catch (error) {
      toast.error("Could not fetch details");
      setIsEditModalOpen(false);
    }
  };

  // ৪. আপডেট লজিক (PUT)
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateLoading(true);

    try {
      const { _id, createdAt, updatedAt, __v, ...payload } = editingFaq;
      const res = await axiosPublic.put(`/faq/faq/${_id}`, payload);
      
      if (res.data.success) {
        toast.success("FAQ Updated Successfully!");
        setIsEditModalOpen(false);
        refetch(); // টেবিল ডাটা রিফ্রেশ
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Update failed!");
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      
      {/* Header Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">FAQ Management</h1>
          <nav className="flex items-center gap-2 text-sm text-gray-400 mt-1">
            <Link href="/dashboard" className="hover:text-[#7AB7A9] transition-colors">Dashboard</Link>
            <span>›</span>
            <span className="text-[#7AB7A9] font-medium">FAQ</span>
          </nav>
        </div>
        
        <Link 
          href="/dashboard/faq/add" 
          className="flex items-center gap-2 bg-[#7AB7A9] hover:bg-[#68a093] text-white px-5 py-2.5 rounded-lg font-medium shadow-sm w-full md:w-auto justify-center"
        >
          <Plus size={20} /> Add FAQ
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px] relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
            <Loader2 className="animate-spin text-[#7AB7A9]" size={40} />
          </div>
        ) : (
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
                {faqs.length > 0 ? (
                  faqs.map((faq: any) => (
                    <tr key={faq._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-5 text-gray-700 text-[14px] max-w-[300px] font-medium">
                        {faq.question}
                      </td>
                      <td className="px-6 py-5 text-gray-500 text-[14px] max-w-[400px]">
                        <p className="line-clamp-2">{faq.answer}</p>
                      </td>
                      <td className="px-6 py-5 text-gray-600 text-[14px]">
                        {new Date(faq.createdAt).toLocaleDateString('en-GB')}
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className="flex items-center justify-center gap-4">
                          <button 
                            onClick={() => handleEditClick(faq._id)}
                            className="text-gray-400 hover:text-[#7AB7A9] transition-colors"
                          >
                            <Edit3 size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(faq._id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-20 text-center text-gray-400">No FAQs found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Section (Same as before) */}
        {!isLoading && faqs.length > 0 && (
          <div className="p-6 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">Showing page {page} of {meta.totalPage}</p>
            <div className="flex items-center gap-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="p-2 border rounded-lg disabled:opacity-30"><ChevronLeft size={20}/></button>
              <button disabled={page === meta.totalPage} onClick={() => setPage(p => p + 1)} className="p-2 border rounded-lg disabled:opacity-30"><ChevronRight size={20}/></button>
            </div>
          </div>
        )}
      </div>

      {/* --- Edit FAQ Modal --- */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setIsEditModalOpen(false)} className="absolute right-6 top-6 text-gray-400 hover:text-gray-800">
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit FAQ</h2>
            
            {editingFaq ? (
              <form onSubmit={handleUpdate} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-600">Question</label>
                  <input 
                    required
                    type="text" 
                    value={editingFaq.question}
                    onChange={(e) => setEditingFaq({...editingFaq, question: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#7AB7A9] transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-600">Answer</label>
                  <textarea 
                    required
                    rows={4}
                    value={editingFaq.answer}
                    onChange={(e) => setEditingFaq({...editingFaq, answer: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#7AB7A9] transition-all"
                  />
                </div>
                
                <button 
                  disabled={updateLoading}
                  type="submit" 
                  className="w-full py-4 bg-[#7AB7A9] hover:bg-[#68a093] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#7AB7A9]/20"
                >
                  {updateLoading ? <Loader2 className="animate-spin" size={20} /> : "Save Changes"}
                </button>
              </form>
            ) : (
              <div className="flex justify-center py-10"><Loader2 className="animate-spin text-[#7AB7A9]" size={30} /></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQManagement;