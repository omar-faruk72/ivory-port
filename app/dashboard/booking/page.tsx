"use client";

import React, { useState } from 'react';
import { Eye, Trash2, ChevronLeft, ChevronRight, Loader2, X, Calendar, Clock, Mail, Phone, User, MessageSquare, ChevronDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '@/app/components/hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';

const BookingManagement = () => {
  const axiosPublic = useAxiosPublic();
  const [page, setPage] = useState(1);
  const limit = 10;

  // View Modal States
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [viewLoading, setViewLoading] = useState(false);

  // ১. সকল বুকিং ডাটা ফেচ করা
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['all-bookings', page],
    queryFn: async () => {
      const res = await axiosPublic.get(`/booking/all-bookings?page=${page}&limit=${limit}`);
      return res.data;
    }
  });

  const bookings = data?.data || [];
  const meta = data?.meta || { total: 0, totalPage: 1 };

  // ২. সিঙ্গেল বুকিং ডাটা দেখার লজিক
  const handleViewDetails = async (id: string) => {
    setIsViewModalOpen(true);
    setViewLoading(true);
    setSelectedBooking(null);
    try {
      const res = await axiosPublic.get(`/booking/booking/${id}`);
      if (res.data.success) {
        setSelectedBooking(res.data.data);
      }
    } catch (error) {
      toast.error("Failed to load details");
      setIsViewModalOpen(false);
    } finally {
      setViewLoading(false);
    }
  };

  // ৩. ডিলিট লজিক (আগের মতোই)
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
          const res = await axiosPublic.delete(`/booking/booking/${id}`);
          if (res.data.success) {
            toast.success("Booking deleted!");
            refetch();
          }
        } catch (error) {
          toast.error("Failed to delete.");
        }
      }
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      
      {/* Header Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Booking Management</h1>
        <nav className="flex items-center gap-2 text-sm text-gray-400 mt-1">
          <span>Dashboard</span>
          <span>›</span>
          <span className="text-[#7AB7A9] font-medium">Booking</span>
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
                <tr className="text-gray-400 font-medium text-[13px] uppercase tracking-wider border-b border-gray-50">
                  <th className="px-6 py-5">Name</th>
                  <th className="px-6 py-5">Subject</th>
                  <th className="px-6 py-5">Email</th>
                  <th className="px-6 py-5">Phone</th>
                  <th className="px-6 py-5">Date</th>
                  <th className="px-6 py-5">Time</th>
                  <th className="px-6 py-5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bookings.map((booking: any) => (
                  <tr key={booking._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5 text-gray-600 text-[14px] font-medium">{booking.name}</td>
                    <td className="px-6 py-5 text-gray-600 text-[14px]">{booking.subject}</td>
                    <td className="px-6 py-5 text-gray-500 text-[14px]">{booking.email}</td>
                    <td className="px-6 py-5 text-gray-600 text-[14px]">{booking.phone}</td>
                    <td className="px-6 py-5 text-gray-600 text-[14px]">
                      {new Date(booking.date).toLocaleDateString('en-GB')}
                    </td>
                    <td className="px-6 py-5 text-gray-600 text-[14px]">{booking.time}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={() => handleViewDetails(booking._id)}
                          className="text-gray-300 hover:text-[#7AB7A9] transition-colors"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(booking._id)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Logic (Same as before) */}
        {/* ... (Keep your pagination code here) */}
      </div>

      {/* --- View Booking Details Modal --- */}
      {isViewModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-[#7AB7A9] p-6 text-white flex justify-between items-center">
              <h2 className="text-xl font-bold">Booking Details</h2>
              <button onClick={() => setIsViewModalOpen(false)} className="hover:rotate-90 transition-transform">
                <X size={24} />
              </button>
            </div>

            <div className="p-8">
              {viewLoading ? (
                <div className="flex flex-col items-center justify-center py-10 gap-3">
                  <Loader2 className="animate-spin text-[#7AB7A9]" size={40} />
                  <p className="text-gray-400 animate-pulse">Fetching details...</p>
                </div>
              ) : selectedBooking && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Info Cards */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="p-2 bg-white rounded-lg text-[#7AB7A9] shadow-sm"><User size={20}/></div>
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase">Patient Name</p>
                      <p className="text-gray-700 font-medium">{selectedBooking.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="p-2 bg-white rounded-lg text-[#7AB7A9] shadow-sm"><Mail size={20}/></div>
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase">Email Address</p>
                      <p className="text-gray-700 font-medium break-all">{selectedBooking.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="p-2 bg-white rounded-lg text-[#7AB7A9] shadow-sm"><Phone size={20}/></div>
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase">Phone Number</p>
                      <p className="text-gray-700 font-medium">{selectedBooking.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="p-2 bg-white rounded-lg text-[#7AB7A9] shadow-sm"><Calendar size={20}/></div>
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase">Appointment Date</p>
                      <p className="text-gray-700 font-medium">{new Date(selectedBooking.date).toDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="p-2 bg-white rounded-lg text-[#7AB7A9] shadow-sm"><Clock size={20}/></div>
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase">Preferred Time</p>
                      <p className="text-gray-700 font-medium">{selectedBooking.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="p-2 bg-white rounded-lg text-[#7AB7A9] shadow-sm"><ChevronDown size={20}/></div>
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase">Subject</p>
                      <p className="text-gray-700 font-medium">{selectedBooking.subject}</p>
                    </div>
                  </div>

                  {/* Message Full Width */}
                  <div className="col-span-1 md:col-span-2 flex items-start gap-4 p-4 rounded-2xl bg-[#EAF4F2]/30 border border-[#7AB7A9]/10">
                    <div className="p-2 bg-white rounded-lg text-[#7AB7A9] shadow-sm"><MessageSquare size={20}/></div>
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase">User Message</p>
                      <p className="text-gray-700 italic mt-1 leading-relaxed">"{selectedBooking.message || 'No message provided'}"</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-8">
                <button 
                  onClick={() => setIsViewModalOpen(false)}
                  className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-xl transition-colors"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingManagement;