"use client";

import React from 'react';
import { 
  Users, 
  MessageSquare, 
  FileCheck, 
  TrendingUp, 
  Clock, 
  Plus, 
  Settings, 
  ArrowUpRight, 
  MoreVertical 
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import Link from 'next/link';

const data = [
  { name: 'Jan', referrals: 40, contacts: 24 },
  { name: 'Feb', referrals: 30, contacts: 13 },
  { name: 'Mar', referrals: 60, contacts: 98 },
  { name: 'Apr', referrals: 45, contacts: 39 },
  { name: 'May', referrals: 70, contacts: 48 },
  { name: 'Jun', referrals: 85, contacts: 38 },
];

const pieData = [
  { name: 'New Patients', value: 400 },
  { name: 'Returning', value: 300 },
  { name: 'Consultations', value: 200 },
];

const COLORS = ['#86B1AA', '#3b82f6', '#8b5cf6'];

export default function AdminDashboard() {
  
  const stats = [
    { title: 'Total Users', value: '24', grow: '+12%', icon: <Users size={20} />, color: 'bg-blue-500' },
    { title: 'New Referrals', value: '156', grow: '+5%', icon: <FileCheck size={20} />, color: 'bg-[#86B1AA]' },
    { title: 'Pending Messages', value: '23', grow: '-2%', icon: <MessageSquare size={20} />, color: 'bg-purple-500' },
    { title: 'Success Rate', value: '94%', grow: '+3%', icon: <TrendingUp size={20} />, color: 'bg-orange-500' },
  ];

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      
      {/* ১. হেডার ও কুইক অ্যাকশন */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Dashboard Overview</h1>
          <p className="text-slate-500 text-sm md:text-base">System status and recent business performance.</p>
        </div>
        <div className="flex gap-3">
          <Link href={"/dashboard/settings"} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all">
            <Settings size={18} /> Settings
          </Link>
        </div>
      </div>

      {/* ২. স্ট্যাটস কার্ড গ্রিড (Responsive 1-2-4 columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 group hover:border-[#86B1AA] transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.color} p-2.5 rounded-xl text-white`}>
                {stat.icon}
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.grow.startsWith('+') ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                {stat.grow}
              </span>
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ৩. মেইন গ্রাফ - Area Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-800">Growth Performance</h3>
            <select className="text-sm border-none bg-slate-50 rounded-lg px-2 py-1 outline-none text-slate-500 font-medium">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRef" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#86B1AA" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#86B1AA" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="referrals" stroke="#86B1AA" strokeWidth={4} fillOpacity={1} fill="url(#colorRef)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ৪. পাই চার্ট - Distribution */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
          <h3 className="text-lg font-bold text-slate-800 self-start mb-4">Referral Source</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full space-y-3 mt-4">
            {pieData.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-slate-600 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ৫. রিসেন্ট অ্যাক্টিভিটি - Full Width on Mobile */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-800">Latest Referrals</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
                <tr>
                  <th className="px-6 py-4">Patient Name</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { name: "John Doe", date: "Mar 10, 2026", status: "Pending" },
                  { name: "Sarah Khan", date: "Mar 09, 2026", status: "Completed" },
                  { name: "Mike Tyson", date: "Mar 08, 2026", status: "In Progress" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-slate-700">{row.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{row.date}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase ${
                        row.status === 'Completed' ? 'bg-green-100 text-green-600' : 
                        row.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right"><MoreVertical size={16} className="inline text-slate-400 cursor-pointer" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ৬. আপকামিং ইভেন্টস বা টাস্ক */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
             <Clock size={20} className="text-[#86B1AA]" /> Notifications
           </h3>
           <div className="space-y-5">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="group cursor-pointer">
                  <p className="text-sm font-semibold text-slate-800 group-hover:text-[#86B1AA] transition-colors">New message received from contact form</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-slate-400 italic">By Omar Faruk</span>
                    <span className="text-[10px] text-slate-300">10:30 AM</span>
                  </div>
                </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
}