"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Edit2, Trash2, ChevronLeft, ChevronRight, Loader2, X } from 'lucide-react';
import useAxiosPublic from '@/app/components/hooks/useAxiosPublic';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

const TreatmentListPage = () => {
  const axiosPublic = useAxiosPublic();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({ page: 1, limit: 4, total: 0, totalPage: 1 });
  
  // Edit Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  // ১. ডাটা ফেচ করার ফাংশন
  const fetchServices = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axiosPublic.get(`/services/all-services?page=${page}&limit=4`);
      if (res.data.success) {
        setServices(res.data.data);
        setMeta(res.data.meta);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices(meta.page);
  }, [meta.page]);

  // ২. ডিলিট লজিক
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
          const res = await axiosPublic.delete(`/services/services/${id}`);
          if (res.data.success) {
            toast.success("Service Deleted!");
            fetchServices(meta.page);
          }
        } catch (error) {
          toast.error("Failed to delete service.");
        }
      }
    });
  };

  // ৩. এডিট মডাল ওপেন ও সিঙ্গেল ডাটা গেট
  const openEditModal = async (id: string) => {
    setIsEditModalOpen(true);
    setEditingService(null); // আগের ডাটা ক্লিয়ার করা
    try {
      const res = await axiosPublic.get(`/services/services/${id}`);
      if (res.data.success) {
        setEditingService(res.data.data);
      }
    } catch (error) {
      toast.error("Error loading service data");
      setIsEditModalOpen(false);
    }
  };

  // --- Update Logic ---
const handleUpdate = async (e: React.FormEvent) => {
  e.preventDefault();
  setUpdateLoading(true);

  try {
    // ১. অবজেক্ট থেকে _id এবং অন্যান্য মেটাডাটা আলাদা করে ফেলা
    // যাতে এগুলো ব্যাকএন্ডে গিয়ে ঝামেলা না করে
    const { _id, createdAt, updatedAt, __v, ...payload } = editingService;

    // ২. এখন শুধু ডাটাগুলো (payload) পাঠান, আইডি না
    const res = await axiosPublic.put(`/services/services/${_id}`, payload);
    
    if (res.data.success) {
      toast.success("Updated Successfully!");
      setIsEditModalOpen(false);
      fetchServices(meta.page);
    }
  } catch (error: any) {
    // ব্যাকএন্ডে কী সমস্যা হচ্ছে তা দেখার জন্য:
    console.error("Backend Error Message:", error.response?.data);
    toast.error(error.response?.data?.message || "Update failed!");
  } finally {
    setUpdateLoading(false);
  }
};

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto p-4 md:p-6">
      <Toaster position="top-right" />
      
      {/* Header Section */}
      <div className="bg-white px-6 py-5 rounded-2xl border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="space-y-1 text-center md:text-left">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Treatment List</h1>
          <nav className="flex items-center justify-center md:justify-start gap-2 text-xs">
            <Link href="/dashboard" className="text-gray-400 hover:text-[#7AB7A9]">Dashboard</Link>
            <span className="text-gray-300">›</span>
            <span className="text-gray-500 font-medium">Services</span>
          </nav>
        </div>
        <Link href="/dashboard/treatment-list/add" className="bg-[#7AB7A9] hover:bg-[#68a093] text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all text-sm font-semibold">
          <Plus size={18} /> Add Service
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[450px] relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
            <Loader2 className="animate-spin text-[#7AB7A9]" size={40} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#EAF4F2]/60 border-b border-gray-100">
                <tr>
                  <th className="pl-8 pr-6 py-5 text-sm font-semibold text-gray-600">Service & Treatment</th>
                  <th className="px-6 py-5 text-sm font-semibold text-gray-600 text-center">Date</th>
                  <th className="pl-6 pr-8 py-5 text-sm font-semibold text-gray-600 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {services.map((item: any) => (
                  <tr key={item._id} className="hover:bg-gray-50/40 transition-colors group">
                    <td className="pl-8 pr-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-12 md:w-20 md:h-14 overflow-hidden rounded-lg border border-gray-100 flex-shrink-0">
                          <Image src={item.treatments?.[0]?.imageUrl || '/placeholder.png'} alt="img" fill className="object-cover" />
                        </div>
                        <div className="flex flex-col">
                           <span className="font-bold text-gray-800 text-sm md:text-base">{item.serviceName}</span>
                           <span className="text-xs text-[#7AB7A9]">{item.treatments?.[0]?.title}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-sm text-gray-500 text-center">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="pl-6 pr-8 py-6">
                      <div className="flex items-center justify-center gap-4">
                        <button onClick={() => openEditModal(item._id)} className="p-2 text-gray-400 hover:text-[#7AB7A9] hover:bg-[#7AB7A9]/10 rounded-lg transition-all"><Edit2 size={18} /></button>
                        <button onClick={() => handleDelete(item._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Section */}
        {!loading && (
          <div className="px-8 py-6 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-sm text-gray-400 font-medium">
              Showing {meta.total > 0 ? (meta.page - 1) * meta.limit + 1 : 0} to {Math.min(meta.page * meta.limit, meta.total)} of {meta.total} results
            </span>
            <div className="flex items-center gap-2">
              <button disabled={meta.page === 1} onClick={() => setMeta({...meta, page: meta.page - 1})} className="p-2 rounded-lg border border-gray-100 disabled:opacity-30"><ChevronLeft size={18} /></button>
              {[...Array(meta.totalPage)].map((_, i) => (
                <button key={i} onClick={() => setMeta({...meta, page: i + 1})} className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold ${meta.page === i + 1 ? "bg-[#7AB7A9] text-white" : "border border-gray-100 text-gray-600"}`}>{i + 1}</button>
              ))}
              <button disabled={meta.page === meta.totalPage} onClick={() => setMeta({...meta, page: meta.page + 1})} className="p-2 rounded-lg border border-gray-100 disabled:opacity-30"><ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>

      {/* --- Edit Modal --- */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl p-6 md:p-10 shadow-2xl relative">
            <button onClick={() => setIsEditModalOpen(false)} className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors">
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Update Service</h2>
            
            {editingService ? (
              <form onSubmit={handleUpdate} className="space-y-6">
                {/* ১. সার্ভিস নেম */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Service Category Name</label>
                  <input 
                    required
                    type="text" 
                    value={editingService.serviceName}
                    onChange={(e) => setEditingService({...editingService, serviceName: e.target.value})}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#7AB7A9]/20 focus:border-[#7AB7A9] transition-all font-medium"
                  />
                </div>

                {/* ২. প্রথম ট্রিটমেন্টের টাইটেল (যদি থাকে) */}
                {editingService.treatments?.[0] && (
                   <div className="space-y-2">
                   <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Treatment Title</label>
                   <input 
                     required
                     type="text" 
                     value={editingService.treatments[0].title}
                     onChange={(e) => {
                       const newTreatments = [...editingService.treatments];
                       newTreatments[0].title = e.target.value;
                       setEditingService({...editingService, treatments: newTreatments});
                     }}
                     className="w-full px-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#7AB7A9]/20 focus:border-[#7AB7A9] transition-all font-medium"
                   />
                 </div>
                )}
                
                <div className="pt-4">
                  <button 
                    disabled={updateLoading}
                    type="submit" 
                    className="w-full py-4 bg-[#7AB7A9] hover:bg-[#68a093] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#7AB7A9]/20 disabled:opacity-70"
                  >
                    {updateLoading ? <Loader2 className="animate-spin" size={20} /> : "Update Service Now"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <Loader2 className="animate-spin text-[#7AB7A9]" size={40} />
                <p className="text-gray-400 animate-pulse">Fetching details...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TreatmentListPage;