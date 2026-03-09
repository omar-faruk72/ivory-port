// app/(dashboard)/layout.tsx

import Sidebar from "../components/dashboard/Sidebar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50/50">
      {/* বাম পাশের সাইডবার */}
      <aside className="w-64 border-r bg-white h-full fixed left-0 top-0 overflow-y-auto">
        <Sidebar />
      </aside>

      {/* ডান পাশের কন্টেন্ট এরিয়া */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}