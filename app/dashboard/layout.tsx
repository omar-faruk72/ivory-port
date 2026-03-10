"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/dashboard/Sidebar";
import AdminRoute from "../components/hooks/AdminRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AdminRoute>
      <div className="flex h-screen bg-gray-50/50 relative">
        
        {/* --- Mobile Sidebar Overlay --- */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* --- Sidebar Area --- */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
          <div className="h-full overflow-y-auto">
            {/* মোবাইল মোডে সাইডবার বন্ধ করার বাটন */}
            <div className="p-4 flex justify-end lg:hidden">
              <button onClick={() => setIsSidebarOpen(false)}>
                <X size={24} className="text-slate-500" />
              </button>
            </div>
            <Sidebar />
          </div>
        </aside>

        {/* --- Main Content Area --- */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          
          {/* --- Mobile Top Header --- */}
          <header className="h-16 bg-white border-b flex items-center justify-between px-6 lg:hidden shrink-0">
            <span className="font-bold text-[#86B1AA]">Dashboard</span>
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu size={24} className="text-slate-600" />
            </button>
          </header>

          {/* --- Children Content --- */}
          <main className="flex-1 p-4 md:p-8 overflow-y-auto">
            {children}
          </main>
        </div>

      </div>
    </AdminRoute>
  );
}