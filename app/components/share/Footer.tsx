"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Clock } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#86B1AA] text-white pt-16 pb-8 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* 1. Logo and About Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="lg:col-span-1 space-y-6">
            <div className="relative w-[150px] h-[50px]"> 
              {/* লোগো দেখা না গেলে এখানে brightness-0 invert ব্যবহার করতে পারেন যদি লোগো কালো হয় */}
              <Image 
                src="/assets/image/logo.png" // আপনার নেভবারের পাথ অনুযায়ী চেক করুন
                alt="Perrystown Orthodontics Logo" 
                fill
                className="object-contain brightness-0 invert" 
                priority
              />
            </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed max-w-xs">
              Providing exceptional dental care with a focus on comfort and results for over 15 years.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-5 pt-2">
              <Link href="#" className="hover:scale-110 transition-transform hover:text-cyan-200 transition-colors"><Facebook size={20} /></Link>
              <Link href="#" className="hover:scale-110 transition-transform hover:text-cyan-200 transition-colors"><Twitter size={20} /></Link>
              <Link href="#" className="hover:scale-110 transition-transform hover:text-cyan-200 transition-colors"><Instagram size={20} /></Link>
            </div>
          </div>

          {/* 2. Quick Links Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold border-b border-white/20 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-3 opacity-90 text-[15px]">
              <li><Link href="/" className="hover:text-cyan-100 transition-colors">Home</Link></li>
              <li><Link href="/treatments" className="hover:text-cyan-100 transition-colors">Treatments</Link></li>
              <li><Link href="/about-us" className="hover:text-cyan-100 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-cyan-100 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* 3. Contact Us Section */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold border-b border-white/20 pb-2 inline-block">Contact Us</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <ul className="space-y-4 text-sm opacity-90">
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="shrink-0 text-cyan-100" />
                  <span>44 Muckross Avenue, Perrystown, Dublin 12, D12VK49</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="shrink-0 text-cyan-100" />
                  <span>083 011 0533</span>
                </li>
              </ul>
              <ul className="space-y-4 text-sm opacity-90">
                <li className="flex items-center gap-3">
                  <Mail size={18} className="shrink-0 text-cyan-100" />
                  <span className="break-all">perrystownorthodontics@gmail.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={20} className="shrink-0 text-cyan-100" />
                  <span>Opening hours:<br/>Monday to Friday 10 AM – 6:30 PM</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-70">
          <p>© {new Date().getFullYear()} Perrystown Orthodontics. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:underline">Privacy Policy</Link>
            <Link href="#" className="hover:underline">GDPR</Link>
            <Link href="#" className="hover:underline">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;