"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  User as UserIcon,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { useAuth } from "@/app/providers/AuthProvider";
import HeroButtons from "./HeroButtons";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Treatments", href: "/treatments" },
  {
    name: "Pricing",
    href: "/pricing",
    dropdown: [
      { name: "Fees", href: "/pricing/fees" },
      { name: "Offers & Payment Plans", href: "/pricing/offers-plans" },
    ],
  },
  { name: "About Us", href: "/about-us" },
  { name: "Referrals", href: "/referrals" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          isScrolled
            ? "bg-zinc-900/95 backdrop-blur-md py-3 shadow-lg"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <div className="logo shrink-0">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={150}
                height={35}
                className=""
              />
            </Link>
          </div>

          <ul className="hidden lg:flex items-center gap-6 text-[15px] font-medium text-white">
            {navLinks.map((link) => {
              const active =
                isActive(link.href) ||
                link.dropdown?.some((sub) => isActive(sub.href));
              return (
                <li
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => link.dropdown && setIsPricingOpen(true)}
                  onMouseLeave={() => link.dropdown && setIsPricingOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 transition py-2 border-b-2 ${active ? "text-cyan-400 border-cyan-400" : "text-white border-transparent hover:text-cyan-400"}`}
                  >
                    {link.name}
                    {link.dropdown && (
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${isPricingOpen ? "rotate-180" : ""}`}
                      />
                    )}
                  </Link>

                  {link.dropdown && isPricingOpen && (
                    <div className="absolute top-full left-0 w-60 bg-white text-slate-800 rounded-md shadow-xl py-3 z-[60] mt-1 border-t-4 border-cyan-500">
                      {link.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`block px-5 py-2 transition ${isActive(subItem.href) ? "bg-cyan-50 text-cyan-600 font-bold" : "hover:bg-cyan-50 hover:text-cyan-600"}`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}

            <div className="flex items-center gap-3 ml-4">
              {loading ? (
                <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              ) : user ? (
                <div className="relative" ref={dropdownRef}>
                  <div
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-3 cursor-pointer group bg-white/5 hover:bg-white/10 p-1.5 pr-4 rounded-full transition-all"
                  >
                    <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-cyan-400">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-cyan-400">
                          <UserIcon size={18} />
                        </div>
                      )}
                    </div>
                    <div className="text-left">
                      <p className="text-[13px] font-bold text-white leading-none truncate max-w-[100px]">
                        {user.name}
                      </p>
                      <p className="text-[9px] text-cyan-400 uppercase tracking-widest mt-1 font-bold">
                        {user.role}
                      </p>
                    </div>
                    <ChevronDown
                      size={14}
                      className={`text-white transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
                    />
                  </div>

                  {isProfileOpen && (
                    <div className="absolute top-full right-0 mt-3 w-52 bg-white rounded-xl shadow-2xl py-2 z-[110] border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-200">
                      {/* ১. নাম ও ইমেইল (সবার জন্য) */}
                      <div className="px-4 py-2 border-b border-slate-50 mb-1 bg-slate-50/50">
                        <p className="text-[13px] font-bold text-slate-800 truncate">
                          {user.name}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">
                          {user.email}
                        </p>
                      </div>

                      {/* ২. অ্যাডমিন ড্যাশবোর্ড (শুধুমাত্র অ্যাডমিনের জন্য) */}
                      {user.role === "admin" && (
                        <Link
                          href="/dashboard"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
                        >
                          <LayoutDashboard
                            size={18}
                            className="text-cyan-600"
                          />
                          <span className="font-semibold">Dashboard</span>
                        </Link>
                      )}

                      {/* ৩. লগআউট (সবার জন্য) */}
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors text-left border-t border-slate-50 mt-1"
                      >
                        <LogOut size={18} />
                        <span className="font-semibold">Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/login"
                    className="px-5 py-2 border border-white/50 text-white rounded hover:bg-white hover:text-black transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-5 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition shadow-lg"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </ul>

          <div
            className="lg:hidden text-white cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </div>
        </div>
      </nav>

     {/* Header Section based on URL */}
<header className="relative w-full h-[500px] md:h-[600px] flex flex-col items-center justify-center overflow-hidden">
  {/* Background Image (Always same for all pages) */}
  <div className="absolute inset-0 -z-10">
    <Image
      src="/assets/image/hero-bg.avif"
      alt="Hero Background"
      fill
      className="object-cover"
      priority
    />
    <div className="absolute inset-0 bg-black/60"></div> {/* Overlay slightly darker for better text visibility */}
  </div>

  <div className="relative text-center px-6 z-10 pt-20">
    {pathname === "/" ? (
      /* ১. শুধুমাত্র হোম পেজের (/) জন্য টেক্সট */
      <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight">
          Transforming Smiles With <br />
          <span className="text-cyan-400">Specialist Orthodontic Care</span>
        </h1>
        <p className="mt-5 text-sm md:text-xl text-white/80 max-w-2xl mx-auto font-light">
          We focus exclusively on orthodontic treatments to create healthy, confident smiles for the whole family.
        </p>

        <HeroButtons></HeroButtons>
      </div>
    ) : (
      /* ২. হোম পেজ ছাড়া অন্য সব পেজের জন্য ডাইনামিক টেক্সট */
      <div className="animate-in fade-in zoom-in duration-500">
        <h2 className="text-4xl md:text-6xl font-bold text-white capitalize tracking-tight mb-8">
          {pathname.split("/").filter(Boolean).join(" ").replace("-", " ")}
        </h2>
        
        {/* Breadcrumb - ইউজারকে পথ দেখানোর জন্য */}
        <Link href={"/booking"} className="bg-[#86B1AA] hover:bg-[#759f98] text-white font-medium py-3 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg">
  Book FREE Consult
</Link>
      </div>
    )}
  </div>
</header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-zinc-950 z-[150] flex flex-col items-center justify-center gap-6 text-xl font-semibold text-white transition-transform duration-500 lg:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          className="absolute top-8 right-8"
          onClick={() => setIsOpen(false)}
        >
          <X size={35} />
        </button>

        {user && (
          <div className="flex flex-col items-center gap-2 mb-4">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-cyan-400 shadow-xl">
              <Image
                src={user.image || "/assets/image/default-avatar.png"}
                alt="User"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-cyan-400 font-bold">{user.name}</p>
          </div>
        )}

        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className={
              isActive(link.href) ? "text-cyan-400" : "hover:text-cyan-400"
            }
          >
            {link.name}
          </Link>
        ))}

        {/* ড্যাশবোর্ড লিঙ্ক - শুধুমাত্র অ্যাডমিনের জন্য (Mobile) */}
        {user?.role === "admin" && (
          <Link
            href="/dashboard"
            onClick={() => setIsOpen(false)}
            className="text-cyan-400 flex items-center gap-2 border-y border-white/10 w-full py-4 justify-center"
          >
            <LayoutDashboard size={22} /> Dashboard
          </Link>
        )}

        {!user ? (
          <div className="flex flex-col gap-4 w-full px-10 mt-6">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 border text-center rounded"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 bg-cyan-600 text-center rounded"
            >
              Register
            </Link>
          </div>
        ) : (
          <button
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className="text-red-500 flex items-center gap-2 mt-4"
          >
            <LogOut size={24} /> Logout
          </button>
        )}
      </div>
    </>
  );
};

export default Navbar;
