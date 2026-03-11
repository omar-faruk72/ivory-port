"use client";

import React, { useState } from 'react';
import useAxiosPublic from '@/app/components/hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { Loader2 } from 'lucide-react';

const SecuritySettings = () => {
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);

  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const currentPassword = (form.elements.namedItem('currentPassword') as HTMLInputElement).value;
    const newPassword = (form.elements.namedItem('newPassword') as HTMLInputElement).value;
    const confirmPassword = (form.elements.namedItem('confirmPassword') as HTMLInputElement).value;

    // ১. ভ্যালিডেশন
    if (newPassword !== confirmPassword) {
      return Swal.fire({ icon: 'error', title: 'Error', text: 'New passwords do not match!' });
    }
    if (newPassword.length < 6) {
      return Swal.fire({ icon: 'error', title: 'Error', text: 'Password must be at least 6 characters!' });
    }

    setLoading(true);
    try {
      const res = await axiosPublic.put('/auth/change-password', { currentPassword, newPassword });
      
      if (res.data.success) {
        Swal.fire({ icon: 'success', title: 'Updated!', text: res.data.message });
        form.reset(); // ফর্ম ক্লিয়ার করা
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response?.data?.message || 'Something went wrong!',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in slide-in-from-right-5 fade-in duration-300">
      <h3 className="text-xl font-bold text-gray-800">Security</h3>
      <p className="text-sm text-gray-400 mb-8 mt-1">Change your password and secure your account.</p>
      
      <form onSubmit={handlePasswordUpdate} className="max-w-md space-y-6">
        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-gray-700">Current Password</label>
          <input name="currentPassword" type="password" required placeholder="••••••••" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-[#7AB7A9] transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-gray-700">New Password</label>
          <input name="newPassword" type="password" required placeholder="••••••••" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-[#7AB7A9] transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-gray-700">Confirm New Password</label>
          <input name="confirmPassword" type="password" required placeholder="••••••••" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-[#7AB7A9] transition-all" />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="bg-[#7AB7A9] text-white px-8 py-3 rounded-xl hover:bg-[#68a093] transition-all font-semibold flex items-center gap-2"
        >
          {loading && <Loader2 size={18} className="animate-spin" />}
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

export default SecuritySettings;