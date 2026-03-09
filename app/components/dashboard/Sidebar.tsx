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

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Booking', icon: CalendarCheck, href: '/dashboard/booking' },
    { name: 'Contact', icon: Mail, href: '/dashboard/contact' },
    { name: 'Treatment List', icon: ListTodo, href: '/dashboard/treatment-list' },
    { name: 'Price List', icon: BadgeDollarSign, href: '/dashboard/price-list' },
  ];

  return (
    <div className="flex flex-col h-full bg-white text-gray-600 border-r">
      <div className="p-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#7AB7A9] rounded-full flex items-center justify-center text-white font-bold">
            P
          </div>
          <span className="text-lg font-bold text-gray-800 leading-tight">
            Perrystown <br /> <span className="text-sm font-medium">Orthodontics</span>
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          // লজিক: যদি হোম ড্যাশবোর্ড হয় তবে একদম সঠিক মিল (Exact match) লাগবে, 
          // অন্যথায় যদি সাব-পেজ থাকে (যেমন /treatment-list/add) তবে startsWith কাজ করবে।
          const isActive = item.href === '/dashboard' 
            ? pathname === '/dashboard' 
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                isActive 
                ? "bg-[#EAF4F2] text-[#7AB7A9] font-medium" 
                : "hover:bg-gray-50 text-gray-400"
              }`}
            >
              <item.icon 
                size={20} 
                className={isActive ? "text-[#7AB7A9]" : "text-gray-400 group-hover:text-gray-600"} 
              />
              <span className={`text-[15px] ${isActive ? "text-[#7AB7A9]" : "text-gray-500"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-lg transition-colors group">
          <LogOut size={20} className="text-red-400 group-hover:text-red-500" />
          <span className="text-[15px] font-medium">LogOut</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;