"use client";

import React, { useState } from 'react';
import { useAuth } from '@/app/providers/AuthProvider';
import { Loader2 } from 'lucide-react';
import useAxiosPublic from '@/app/components/hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const PersonalInfo = () => {
  const { user, loading, refetch } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdating(true);

    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
    const address = (form.elements.namedItem('address') as HTMLInputElement).value;

    // শুধুমাত্র এই ৩টি ডাটা পাঠাবো, কোনোভাবেই _id বা email নয়
    const updateData = { name, phone, address };

    try {
      // আপনার app.use('/api/auth') অনুযায়ী পাথ ঠিক করা হলো
      const res = await axiosPublic.put('/auth/update-profile', updateData);
      
      if (res.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Profile updated successfully',
          timer: 2000,
          showConfirmButton: false
        });
        if (refetch) refetch(); 
      }
    } catch (error: any) {
      console.error("Error details:", error.response?.data);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response?.data?.message || 'Something went wrong!',
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-[#7AB7A9]" /></div>;

  return (
    <div className="animate-in fade-in duration-300">
      <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
      <p className="text-sm text-gray-400 mb-8 mt-1">Manage your profile details.</p>

      <form onSubmit={handleUpdate}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-gray-700">Full Name</label>
            <input name="name" type="text" defaultValue={user?.name || ""} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-[#7AB7A9] transition-all" />
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-gray-700">Email Address</label>
            <input type="email" value={user?.email || ""} readOnly className="w-full px-4 py-3 bg-gray-100 border border-gray-100 rounded-xl text-gray-400 cursor-not-allowed outline-none" />
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-gray-700">Phone Number</label>
            <input name="phone" type="text" defaultValue={user?.phone || ""} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-[#7AB7A9] transition-all" />
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-gray-700">Address</label>
            <input name="address" type="text" defaultValue={user?.address || ""} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-[#7AB7A9] transition-all" />
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-gray-700">Role</label>
            <input type="text" value={user?.role || "User"} readOnly className="w-full px-4 py-3 bg-gray-100 border border-gray-100 rounded-xl text-gray-400 cursor-not-allowed outline-none" />
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-gray-700">Member Since</label>
            <input type="text" defaultValue={user?.created_at ? new Date(user.created_at).toLocaleDateString('en-GB') : "N/A"} disabled className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 cursor-not-allowed" />
          </div>
        </div>

        <div className="mt-10 flex justify-end gap-3">
          <button type="submit" disabled={updating} className="px-6 py-2.5 bg-[#7AB7A9] text-white rounded-lg hover:bg-[#68a093] shadow-md transition-all font-medium flex items-center gap-2">
            {updating ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;