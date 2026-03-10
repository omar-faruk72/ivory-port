"use client";

import React, { useState } from 'react';
import { Eye, Trash2, ChevronLeft, ChevronRight, Loader2, X, User, Mail, Phone, MessageSquare, Calendar } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '@/app/components/hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';

const ContactManagement = () => {
  const axiosPublic = useAxiosPublic();
  const [page, setPage] = useState(1);
  const limit = 10;

  // View Modal States
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [viewLoading, setViewLoading] = useState(false);

  // ১. সকল কন্টাক্ট মেসেজ লোড করা
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['all-contacts', page],
    queryFn: async () => {
      const res = await axiosPublic.get(`/contact/contacts?page=${page}&limit=${limit}`);
      return res.data;
    }
  });

  const contacts = data?.data || [];
  const meta = data?.meta || { total: 0, totalPage: 1 };

  // ২. সিঙ্গেল কন্টাক্ট ডিটেইলস দেখা
  const handleViewDetails = async (id: string) => {
    setIsViewModalOpen(true);
    setViewLoading(true);
    try {
      const res = await axiosPublic.get(`/contact/contact/${id}`);
      if (res.data.success) {
        setSelectedContact(res.data.data);
      }
    } catch (error) {
      toast.error("Failed to load contact details");
      setIsViewModalOpen(false);
    } finally {
      setViewLoading(false);
    }
  };

  // ৩. কন্টাক্ট ডিলিট করা
  const handleDelete = async (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7AB7A9',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.delete(`/contact/contact/${id}`);
          if (res.data.success) {
            toast.success("Message deleted successfully!");
            refetch();
          }
        } catch (error) {
          toast.error("Failed to delete the message.");
        }
      }
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <Toaster position="top-right" />
      
      {/* Header Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Contact</h1>
        <nav className="flex items-center gap-2 text-sm text-gray-400 mt-1">
          <span>Dashboard</span>
          <span>›</span>
          <span className="text-[#7AB7A9] font-medium">Contact</span>
        </nav>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative min-h-[400px]">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
            <Loader2 className="animate-spin text-[#7AB7A9]" size={40} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-400 font-medium text-[13px] uppercase tracking-wider border-b border-gray-50 bg-gray-50/30">
                  <th className="px-6 py-5">Name</th>
                  <th className="px-6 py-5">Email</th>
                  <th className="px-6 py-5">Phone Number</th>
                  <th className="px-6 py-5">Date</th>
                  <th className="px-6 py-5">Message</th>
                  <th className="px-6 py-5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {contacts.length > 0 ? (
                  contacts.map((contact: any) => (
                    <tr key={contact._id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-5 text-gray-600 text-[14px] font-medium">{contact.name}</td>
                      <td className="px-6 py-5 text-gray-500 text-[14px]">{contact.email}</td>
                      <td className="px-6 py-5 text-gray-600 text-[14px]">{contact.phone}</td>
                      <td className="px-6 py-5 text-gray-500 text-[14px]">
                        {new Date(contact.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-5 text-gray-400 text-[14px] max-w-[200px]">
                        <p className="truncate">{contact.message}</p>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-3">
                          <button 
                            onClick={() => handleViewDetails(contact._id)}
                            className="text-gray-300 hover:text-[#7AB7A9] transition-colors p-1"
                          >
                            <Eye size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(contact._id)}
                            className="text-gray-300 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-20 text-center text-gray-400">No contact messages available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Section */}
        {!isLoading && contacts.length > 0 && (
          <div className="p-6 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm font-medium">
              Showing {(page - 1) * limit + 1} to {Math.min(page * limit, meta.total)} of {meta.total} results
            </p>
            
            <div className="flex items-center gap-2">
              <button 
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="p-2 border border-gray-100 rounded-lg text-gray-400 hover:bg-gray-50 disabled:opacity-30 transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              
              {[...Array(meta.totalPage)].map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${
                    page === i + 1 
                    ? "bg-[#7AB7A9] text-white shadow-md shadow-[#7AB7A9]/20" 
                    : "text-gray-400 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button 
                disabled={page === meta.totalPage}
                onClick={() => setPage(p => p + 1)}
                className="p-2 border border-gray-100 rounded-lg text-gray-400 hover:bg-gray-50 disabled:opacity-30 transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* --- View Contact Details Modal --- */}
      {isViewModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative animate-in zoom-in duration-200">
            <div className="bg-[#7AB7A9] p-6 text-white flex justify-between items-center">
              <h2 className="text-xl font-bold">Message Details</h2>
              <button onClick={() => setIsViewModalOpen(false)} className="hover:rotate-90 transition-transform duration-300">
                <X size={24} />
              </button>
            </div>

            <div className="p-8">
              {viewLoading ? (
                <div className="flex flex-col items-center justify-center py-10 gap-3">
                  <Loader2 className="animate-spin text-[#7AB7A9]" size={40} />
                  <p className="text-gray-400">Loading Message...</p>
                </div>
              ) : selectedContact && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <div className="flex items-center gap-2 text-[#7AB7A9] mb-1">
                        <User size={16} /> <span className="text-[10px] font-bold uppercase tracking-wider">Name</span>
                      </div>
                      <p className="text-gray-700 font-medium">{selectedContact.name}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <div className="flex items-center gap-2 text-[#7AB7A9] mb-1">
                        <Phone size={16} /> <span className="text-[10px] font-bold uppercase tracking-wider">Phone</span>
                      </div>
                      <p className="text-gray-700 font-medium">{selectedContact.phone}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-2 text-[#7AB7A9] mb-1">
                      <Mail size={16} /> <span className="text-[10px] font-bold uppercase tracking-wider">Email Address</span>
                    </div>
                    <p className="text-gray-700 font-medium">{selectedContact.email}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-2 text-[#7AB7A9] mb-1">
                      <Calendar size={16} /> <span className="text-[10px] font-bold uppercase tracking-wider">Received Date</span>
                    </div>
                    <p className="text-gray-700 font-medium">
                        {new Date(selectedContact.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#EAF4F2]/40 border border-[#7AB7A9]/10">
                    <div className="flex items-center gap-2 text-[#7AB7A9] mb-2">
                      <MessageSquare size={16} /> <span className="text-[10px] font-bold uppercase tracking-wider">Message Body</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed italic">"{selectedContact.message}"</p>
                  </div>
                </div>
              )}
              
              <button 
                onClick={() => setIsViewModalOpen(false)}
                className="w-full mt-8 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all shadow-lg active:scale-95"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManagement;