"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

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

      {/* --- Navbar Start --- */}
      <nav className="w-full max-w-7xl px-6 md:px-10 py-6 flex items-center justify-between z-50">
        {/* Logo */}
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
          <li><Link href="/" className="text-cyan-400 border-b-2 border-cyan-400 pb-1">Home</Link></li>
          <li className="flex items-center gap-1 cursor-pointer hover:text-cyan-400 transition">Treatments <ChevronDown size={14}/></li>
          <li><Link href="#" className="hover:text-cyan-400 transition">Pricing</Link></li>
          <li><Link href="#" className="hover:text-cyan-400 transition">About Us</Link></li>
          <li><Link href="#" className="hover:text-cyan-400 transition">Referrals</Link></li>
          <li><Link href="#" className="hover:text-cyan-400 transition">Gallery</Link></li>
          <li><Link href="#" className="hover:text-cyan-400 transition">Contact</Link></li>
          
          <div className="flex items-center gap-3 ml-4">
            <Link href="/login" className="px-4 py-2 border border-white/50 rounded hover:bg-white hover:text-black transition">Login</Link>
            <Link href="/register" className="px-4 py-2 bg-cyan-500 rounded hover:bg-cyan-600 transition text-white">Register</Link>
          </div>
        </ul>

        {/* Mobile Hamburger Icon */}
        <div className="lg:hidden text-white cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div className={`fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center gap-8 text-xl font-semibold text-white transition-transform duration-300 lg:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <button className="absolute top-8 right-8" onClick={toggleMenu}><X size={35} /></button>
        
        <Link href="/" onClick={toggleMenu} className="text-cyan-400">Home</Link>
        <Link href="#" onClick={toggleMenu}>Treatments</Link>
        <Link href="#" onClick={toggleMenu}>Pricing</Link>
        <Link href="#" onClick={toggleMenu}>About Us</Link>
        <Link href="#" onClick={toggleMenu}>Contact</Link>
        
        <div className="flex flex-col gap-4 w-full px-10 mt-4">
          <Link href="/login" onClick={toggleMenu} className="w-full py-3 border border-white text-center rounded">Login</Link>
          <Link href="/register" onClick={toggleMenu} className="w-full py-3 bg-cyan-500 text-center rounded">Register</Link>
        </div>
      </div>
      {/* --- Navbar End --- */}

      {/* Hero Content Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 z-10">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
          Transforming Smiles With <br />
          <span className="text-cyan-400">Specialist Orthodontic Care</span>
        </h1>
        <p className="mt-4 text-sm md:text-lg text-white/80 max-w-2xl">
          We focus exclusively on orthodontic treatments to create healthy, confident smiles for the whole family.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <button className="w-full sm:w-auto px-8 py-3 bg-cyan-500 text-white font-bold rounded hover:bg-cyan-600 transition shadow-lg">
            Book FREE Consult
          </button>
          <button className="w-full sm:w-auto px-8 py-3 border-2 border-white text-white font-bold rounded hover:bg-white hover:text-black transition">
            Explore Services →
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;