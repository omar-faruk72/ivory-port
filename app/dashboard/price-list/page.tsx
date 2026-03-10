"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit3, Trash2, ChevronLeft, ChevronRight, Loader2, X } from 'lucide-react';
import useAxiosPublic from '@/app/components/hooks/useAxiosPublic';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

export default function PriceListPage() {
  const axiosPublic = useAxiosPublic();
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({ page: 1, limit: 5, total: 0, totalPage: 1 });

  // Edit States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPrice, setEditingPrice] = useState<any>(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  // ১. ডাটা ফেচ করার ফাংশন
  const fetchPrices = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axiosPublic.get(`/treatment/all-treatments?page=${page}&limit=5`);
      if (res.data.success) {
        setPrices(res.data.data);
        setMeta(res.data.meta);
      }
    } catch (error) {
      console.error("Error fetching prices:", error);
      toast.error("Failed to load price list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices(meta.page);
  }, [meta.page]);

  // ২. ডিলিট লজিক
  const handleDelete = async (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This item will be permanently deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7AB7A9',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.delete(`/treatment/treatment/${id}`);
          if (res.data.success) {
            toast.success("Price item deleted!");
            fetchPrices(meta.page);
          }
        } catch (error) {
          toast.error("Delete failed.");
        }
      }
    });
  };

  // ৩. এডিট মডাল ওপেন ও ডাটা গেট
  const handleEditClick = async (id: string) => {
    setIsEditModalOpen(true);
    setEditingPrice(null); 
    try {
      const res = await axiosPublic.get(`/treatment/treatment/${id}`);
      if (res.data.success) {
        setEditingPrice(res.data.data);
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
      // payload থেকে অপ্রয়োজনীয় মেটাডাটা বাদ দেওয়া
      const { _id, createdAt, updatedAt, __v, ...payload } = editingPrice;
      
      const res = await axiosPublic.put(`/treatment/treatment/${_id}`, payload);
      
      if (res.data.success) {
        toast.success("Price List Updated!");
        setIsEditModalOpen(false);
        fetchPrices(meta.page);
      }
    } catch (error: any) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Update failed!");
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen space-y-6">
      <Toaster position="top-right" />
      
      {/* Header Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Price List</h1>
          <nav className="flex items-center gap-2 text-sm text-gray-400 mt-1">
            <Link href="/dashboard" className="hover:text-[#7AB7A9]">Dashboard</Link>
            <span>›</span>
            <span className="text-[#7AB7A9] font-medium">Price List</span>
          </nav>
        </div>

        <Link 
          href="/dashboard/price-list/add" 
          className="bg-[#7AB7A9] hover:bg-[#68a093] text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all shadow-md shadow-[#7AB7A9]/20"
        >
          <Plus size={20} /> Add Price List
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px] relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
            <Loader2 className="animate-spin text-[#7AB7A9]" size={40} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#E6F0EE] text-gray-700 font-semibold">
                  <th className="p-5 text-center">Service Name</th>
                  <th className="p-5 text-center">Description</th>
                  <th className="p-5 text-center">Rate</th>
                  <th className="p-5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {prices.map((item: any) => (
                  <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-5 text-center font-medium text-gray-800">{item.name}</td>
                    <td className="p-5 text-center text-gray-500 text-sm max-w-xs mx-auto">
                      <div className="line-clamp-2" dangerouslySetInnerHTML={{ __html: item.description || "N/A" }} />
                    </td>
                    <td className="p-5 text-center font-bold text-[#7AB7A9]">€{item.rate || 0}</td>
                    <td className="p-5 text-center">
                      <div className="flex items-center justify-center gap-4">
                        <button onClick={() => handleEditClick(item._id)} className="text-gray-400 hover:text-[#7AB7A9] transition-colors"><Edit3 size={18} /></button>
                        <button onClick={() => handleDelete(item._id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Section (Same as before) */}
        {!loading && prices.length > 0 && (
            <div className="p-5 border-t border-gray-50 flex justify-between items-center">
                <p className="text-sm text-gray-500">Showing page {meta.page} of {meta.totalPage}</p>
                <div className="flex gap-2">
                    <button disabled={meta.page === 1} onClick={() => setMeta({...meta, page: meta.page - 1})} className="p-2 border rounded-lg disabled:opacity-50"><ChevronLeft size={18}/></button>
                    <button disabled={meta.page === meta.totalPage} onClick={() => setMeta({...meta, page: meta.page + 1})} className="p-2 border rounded-lg disabled:opacity-50"><ChevronRight size={18}/></button>
                </div>
            </div>
        )}
      </div>

      {/* --- Edit Modal Popup --- */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setIsEditModalOpen(false)} className="absolute right-6 top-6 text-gray-400 hover:text-gray-800">
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Price Item</h2>
            
            {editingPrice ? (
              <form onSubmit={handleUpdate} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-600">Service Name</label>
                  <input 
                    required
                    type="text" 
                    value={editingPrice.name}
                    onChange={(e) => setEditingPrice({...editingPrice, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#7AB7A9] transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-600">Rate (€)</label>
                  <input 
                    required
                    type="number" 
                    value={editingPrice.rate}
                    onChange={(e) => setEditingPrice({...editingPrice, rate: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#7AB7A9] transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-600">Description</label>
                  <textarea 
                    rows={3}
                    value={editingPrice.description?.replace(/<[^>]*>/g, '')} // ট্যাগ রিমুভ করে দেখাচ্ছি সহজ করার জন্য
                    onChange={(e) => setEditingPrice({...editingPrice, description: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#7AB7A9] transition-all"
                  />
                </div>
                
                <button 
                  disabled={updateLoading}
                  type="submit" 
                  className="w-full py-4 bg-[#7AB7A9] hover:bg-[#68a093] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {updateLoading ? <Loader2 className="animate-spin" size={20} /> : "Save Changes"}
                </button>
              </form>
            ) : (
              <div className="flex justify-center py-10"><Loader2 className="animate-spin text-[#7AB7A9]" /></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}