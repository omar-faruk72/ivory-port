"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit3, Trash2, ChevronLeft, ChevronRight, Loader2, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '@/app/components/hooks/useAxiosPublic';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

export default function GalleryManagementPage() {
  const axiosPublic = useAxiosPublic();
  const [page, setPage] = useState(1);
  const limit = 10;

  // Edit States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  // ১. গ্যালারি ডাটা ফেচিং (React Query)
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['gallery-list', page],
    queryFn: async () => {
      const res = await axiosPublic.get(`/gallery/all-gallery?page=${page}&limit=${limit}`); 
      return res.data;
    }
  });

  const galleryItems = data?.data || [];
  const meta = data?.meta || { total: 0, totalPage: 1 };

  // ২. ডিলিট লজিক
  const handleDelete = async (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this image?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7AB7A9',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.delete(`/gallery/gallery/${id}`);
          if (res.data.success) {
            toast.success("Image deleted successfully!");
            refetch();
          }
        } catch (error) {
          toast.error("Delete failed!");
        }
      }
    });
  };

  // ৩. এডিট বাটনে ক্লিক করলে ডাটা গেট করা
  const handleEditClick = async (id: string) => {
    setIsEditModalOpen(true);
    setEditingItem(null); // মডাল ওপেন হওয়ার সময় আগের ডাটা ক্লিয়ার করা
    try {
      const res = await axiosPublic.get(`/gallery/gallery/${id}`);
      if (res.data.success) {
        setEditingItem(res.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch image details");
      setIsEditModalOpen(false);
    }
  };

  // ৪. আপডেট লজিক (PUT)
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      const { _id, createdAt, updatedAt, __v, ...payload } = editingItem;
      const res = await axiosPublic.put(`/gallery/gallery/${_id}`, payload);
      
      if (res.data.success) {
        toast.success("Gallery Updated Successfully!");
        setIsEditModalOpen(false);
        refetch(); // টেবিল রিফ্রেশ করা
      }
    } catch (error) {
      toast.error("Update failed!");
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
          <h1 className="text-2xl font-bold text-gray-800">Gallery Management</h1>
          <nav className="flex items-center gap-2 text-sm text-gray-400 mt-1">
            <Link href="/dashboard" className="hover:text-[#7AB7A9]">Dashboard</Link>
            <span>›</span>
            <span className="text-[#7AB7A9] font-medium">Gallery Management</span>
          </nav>
        </div>

        <Link href="/dashboard/gallery/add" className="bg-[#7AB7A9] hover:bg-[#68a093] text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all shadow-md">
          <Plus size={20} /> Add Image
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[450px] relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
            <Loader2 className="animate-spin text-[#7AB7A9]" size={40} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#E6F0EE] text-gray-700 font-semibold">
                  <th className="p-5 text-center w-40">Image</th>
                  <th className="p-5 text-center">Title / Name</th>
                  <th className="p-5 text-center w-40">Date</th>
                  <th className="p-5 text-center w-32">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {galleryItems.map((item: any) => (
                  <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-5">
                      <div className="relative w-24 h-16 rounded-lg overflow-hidden border mx-auto">
                        <Image src={item.image || '/gallery-placeholder.jpg'} alt={item.title} fill className="object-cover" />
                      </div>
                    </td>
                    <td className="p-5 text-center">
                       <div className="font-bold text-gray-800">{item.title}</div>
                       <div className="text-xs text-gray-400 uppercase">{item.name}</div>
                    </td>
                    <td className="p-5 text-center text-gray-600">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
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
        {!isLoading && galleryItems.length > 0 && (
          <div className="p-5 border-t border-gray-50 flex justify-between items-center">
             <p className="text-sm text-gray-500">Page {page} of {meta.totalPage}</p>
             <div className="flex gap-2">
                <button disabled={page === 1} onClick={() => setPage(page - 1)} className="p-2 border rounded-lg disabled:opacity-30"><ChevronLeft size={18}/></button>
                <button disabled={page === meta.totalPage} onClick={() => setPage(page + 1)} className="p-2 border rounded-lg disabled:opacity-30"><ChevronRight size={18}/></button>
             </div>
          </div>
        )}
      </div>

      {/* --- Edit Modal Popup --- */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl relative">
            <button onClick={() => setIsEditModalOpen(false)} className="absolute right-6 top-6 text-gray-400 hover:text-gray-800">
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Gallery Image</h2>
            
            {editingItem ? (
              <form onSubmit={handleUpdate} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-600">Image Title</label>
                  <input 
                    required
                    type="text" 
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7AB7A9] outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-600">Category Name</label>
                  <input 
                    required
                    type="text" 
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7AB7A9] outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-600">Image URL (Preview)</label>
                  <div className="flex gap-4 items-center">
                    <div className="relative w-20 h-14 rounded-lg overflow-hidden border">
                        <Image src={editingItem.image} alt="Preview" fill className="object-cover" />
                    </div>
                    <input 
                        type="text" 
                        value={editingItem.image}
                        onChange={(e) => setEditingItem({...editingItem, image: e.target.value})}
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-xs"
                    />
                  </div>
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