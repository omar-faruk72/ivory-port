"use client";
import Link from 'next/link';
import Image from 'next/image';
import { CreditCard, Banknote, ArrowRight } from 'lucide-react';

export default function PriceListPage() {

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-10">
      
      {/* Header Section */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-10">
        <div className="relative w-full md:w-1/2 h-[300px] rounded-2xl overflow-hidden shadow-lg">
          <Image 
            src="https://res.cloudinary.com/dn5t9fhya/image/upload/v1772957227/glowly_uploads/fskgdprijs3g53tvg2s0.jpg" 
            alt="Fees and Payment"
            fill
            className="object-cover"
          />
        </div>

        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold text-[#7AB7A9] leading-tight">
            The Fees & Payment are Clear, Honest, and Tailored to You.
          </h1>
          <div className="text-gray-600 text-[15px] space-y-4 leading-relaxed">
            <p>
              At <span className="font-semibold">Perrystown Orthodontics</span>, we believe that every patient deserves personalized care and that includes your treatment plan and fees. Because each smile is unique, all treatment plans are custom-designed to meet individual needs.
            </p>
            <p>
              We understand that clarity brings peace of mind, which is why all fees are fully transparent and discussed in detail during your consultation appointment.
            </p>
          </div>
        </div>
      </div>

      {/* Action Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fees Card */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
            <Banknote size={30} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Fees</h3>
          <p className="text-gray-500 text-sm mb-6">
            View our complete fee schedule for consultations, braces, clear aligners, and retainers.
          </p>
          <Link href={"/pricing/fees"}
            className="flex items-center gap-2 text-[#7AB7A9] font-bold hover:gap-3 transition-all underline decoration-2 underline-offset-4"
          >
            View Fees <ArrowRight size={18} />
          </Link>
        </div>

        {/* Payment Plans Card */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
          <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-500 mb-6 group-hover:scale-110 transition-transform">
            <CreditCard size={30} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Offers & Payment Plans</h3>
          <p className="text-gray-500 text-sm mb-6">
             Explore our flexible payment options and latest offers designed to make treatment accessible.
          </p>
          <Link 
            href="/pricing/offers-plans"
            className="flex items-center gap-2 text-[#7AB7A9] font-bold hover:gap-3 transition-all underline decoration-2 underline-offset-4"
          >
            View Offers <ArrowRight size={18} />
          </Link>
        </div>
      </div>

    </div>
  );
}