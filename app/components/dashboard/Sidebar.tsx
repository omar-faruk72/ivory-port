"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Mail, 
  ListTodo, 
  BadgeDollarSign, 
  Image as ImageIcon, 
  HelpCircle, 
  Settings, 
  LogOut 
} from 'lucide-react';
import Image from 'next/image';

const Sidebar = () => {
  const pathname = usePathname();

  // স্ক্রিনশট অনুযায়ী সকল মেনু আইটেম
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Booking', icon: CalendarCheck, href: '/dashboard/booking' },
    { name: 'Contact', icon: Mail, href: '/dashboard/contact' },
    { name: 'Treatment List', icon: ListTodo, href: '/dashboard/treatment-list' },
    { name: 'Price List', icon: BadgeDollarSign, href: '/dashboard/price-list' },
    { name: 'Gallery Management', icon: ImageIcon, href: '/dashboard/gallery' }, // নতুন যুক্ত
    { name: 'FAQ', icon: HelpCircle, href: '/dashboard/faq' }, // নতুন যুক্ত
    { name: 'Settings', icon: Settings, href: '/dashboard/settings' }, // নতুন যুক্ত
  ];

  return (
    <div className="flex flex-col h-full bg-white text-gray-600 border-r shadow-sm">
      {/* Logo Section */}
      <div className="p-6 mb-4">
        <div className="flex items-center gap-3">
         <Link href={"/"}>
         <Image 
         src={"/assets/image/dashboar-logo.png"}
         width={134}
         height={34}
         alt='dashboar logo'
         className='w-full h-full'
         />
         </Link>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = item.href === '/dashboard' 
            ? pathname === '/dashboard' 
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive 
                ? "bg-[#EAF4F2] text-[#7AB7A9] font-semibold shadow-sm" 
                : "hover:bg-gray-50 text-gray-500"
              }`}
            >
              <item.icon 
                size={20} 
                className={`transition-colors ${
                  isActive ? "text-[#7AB7A9]" : "text-gray-400 group-hover:text-gray-600"
                }`} 
              />
              <span className="text-[14px]">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 group">
          <LogOut size={20} className="text-red-400 group-hover:text-red-500 group-hover:translate-x-1 transition-transform" />
          <span className="text-[14px] font-semibold">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;