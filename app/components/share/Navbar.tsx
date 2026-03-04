"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; 
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Treatments", href: "/treatments" },
  { 
    name: "Pricing", 
    href: "#", 
    dropdown: [
      { name: "Fees", href: "/pricing/fees" },
      { name: "Offers & Payment Plans", href: "/pricing/offers-plans" }
    ] 
  },
  { name: "About Us", href: "/about-us" },
  { name: "Referrals", href: "/referrals" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  
  const pathname = usePathname(); 

  const isActive = (path: string) => pathname === path;

  return (
    <header className="relative w-full h-[600px] flex flex-col items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/image/hero-bg.avif" 
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <nav className="w-full max-w-7xl px-6 md:px-10 py-6 flex items-center justify-between z-50">
        <div className="logo shrink-0">
          <Link href="/">
            <Image 
              src="/assets/image/logo.png" 
              alt="Logo" 
              width={130} 
              height={35} 
              className="brightness-0 invert" 
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-6 text-[15px] font-medium text-white">
          {navLinks.map((link) => {
            const active = isActive(link.href) || link.dropdown?.some(sub => isActive(sub.href));

            return (
              <li 
                key={link.name} 
                className="relative group"
                onMouseEnter={() => link.dropdown && setIsPricingOpen(true)}
                onMouseLeave={() => link.dropdown && setIsPricingOpen(false)}
              >
                <Link 
                  href={link.href} 
                  className={`flex items-center gap-1 transition py-2 border-b-2 ${
                    active ? "text-cyan-400 border-cyan-400" : "text-white border-transparent hover:text-cyan-400"
                  }`}
                >
                  {link.name}
                  {link.dropdown && <ChevronDown size={14} className={`transition-transform ${isPricingOpen ? 'rotate-180' : ''}`} />}
                </Link>

                {link.dropdown && isPricingOpen && (
                  <div className="absolute top-full left-0 w-60 bg-white text-slate-800 rounded-md shadow-xl py-3 z-[60] mt-1 border-t-4 border-cyan-500 animate-in fade-in slide-in-from-top-2">
                    {link.dropdown.map((subItem) => (
                      <Link 
                        key={subItem.name} 
                        href={subItem.href} 
                        className={`block px-5 py-2 transition ${
                          isActive(subItem.href) ? "bg-cyan-50 text-cyan-600 font-bold" : "hover:bg-cyan-50 hover:text-cyan-600"
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="lg:hidden text-white cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div className={`fixed inset-0 bg-zinc-950 z-[100] flex flex-col items-center justify-center gap-6 text-xl font-semibold text-white transition-transform duration-500 lg:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <button className="absolute top-8 right-8" onClick={() => setIsOpen(false)}><X size={35} /></button>
        
        {navLinks.map((link) => (
          <div key={link.name} className="flex flex-col items-center">
            {link.dropdown ? (
              <div className="flex flex-col items-center gap-3">
                <span className="text-gray-500 text-sm uppercase tracking-widest">{link.name}</span>
                {link.dropdown.map((sub) => (
                  <Link 
                    key={sub.name} 
                    href={sub.href} 
                    onClick={() => setIsOpen(false)} 
                    className={`text-lg ${isActive(sub.href) ? "text-cyan-400" : "hover:text-cyan-400"}`}
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            ) : (
              <Link 
                href={link.href} 
                onClick={() => setIsOpen(false)} 
                className={`transition ${isActive(link.href) ? "text-cyan-400" : "hover:text-cyan-400"}`}
              >
                {link.name}
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 z-10">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight">
          Transforming Smiles With <br />
          <span className="text-cyan-400">Specialist Orthodontic Care</span>
        </h1>
        <p className="mt-5 text-sm md:text-xl text-white/80 max-w-2xl font-light">
          We focus exclusively on orthodontic treatments to create healthy, confident smiles for the whole family.
        </p>
      </div>
    </header>
  );
};

export default Navbar;