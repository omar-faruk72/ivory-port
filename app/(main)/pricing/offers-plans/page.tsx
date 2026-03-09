"use client";

import React from 'react';
import Link from 'next/link';
import { CreditCard, Percent, Users, FileText } from 'lucide-react';

const offers = [
  {
    title: "Monthly payments with 0% interest",
    description: "Start treatment with an upfront deposit from €500, then spread the remaining balance across easy monthly installments with no interest added.",
    icon: <CreditCard className="text-blue-500" size={24} />,
    borderColor: "border-l-blue-500",
    bgColor: "bg-blue-50"
  },
  {
    title: "5% discount for full payment.",
    description: "Pay the full treatment fee at the start and receive a 5% saving.",
    icon: <Percent className="text-green-500" size={24} />,
    borderColor: "border-l-green-500",
    bgColor: "bg-green-50"
  },
  {
    title: "10% family & friends discount.",
    description: "When a family member or friend starts treatment with us, you will receive a 10% discount as our way of saying thank you for letting us care for the people you love.",
    icon: <Users className="text-purple-500" size={24} />,
    borderColor: "border-l-purple-500",
    bgColor: "bg-purple-50"
  },
  {
    title: "MED2 tax relief.",
    description: "You may be entitled to claim back 20% of the total treatment cost through the MED2 tax form, making orthodontic treatment even more cost-effective.",
    icon: <FileText className="text-orange-500" size={24} />,
    borderColor: "border-l-orange-500",
    bgColor: "bg-orange-50"
  }
];

export default function OffersPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
      
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-[#7AB7A9]">Making Great Smiles Affordable.</h1>
        <div className="text-gray-600 max-w-4xl leading-relaxed">
          <p>
            At <span className="font-semibold text-gray-800">Perrystown Orthodontics</span>, we believe every family deserves access to quality orthodontic care. 
            We offer a <span className="font-bold text-gray-800 uppercase">Free consultation for all treatments</span>, giving you the chance to meet our team, explore your options, without any commitment or cost. 
            To help make treatment manageable and stress-free, we offer flexible payment options and savings designed with your budget in mind.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#7AB7A9]">Flexible Payment Plans & Offers</h2>
        
        {/* Grid for Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map((offer, index) => (
            <div 
              key={index} 
              className={`bg-white p-8 rounded-2xl border border-gray-100 border-l-4 ${offer.borderColor} shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow`}
            >
              <div className={`w-12 h-12 ${offer.bgColor} rounded-xl flex items-center justify-center`}>
                {offer.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-800">{offer.title}</h3>
                <p className="text-gray-500 text-[15px] leading-relaxed">
                  {offer.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Informational Boxes */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-gray-700 text-sm">
              <span className="font-bold">Seasonal Offers:</span> We also run special seasonal promotions throughout the year. Get in touch with our friendly team to find out whats currently available.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-gray-700 text-sm leading-relaxed">
              <span className="font-bold">Please note:</span> Discounts cannot be combined or stacked. If more than one discount applies or multiple people are referred, only one discount will be used, whichever offers the greater value. All treatment fees must be paid in full prior to completion of treatment.
            </p>
          </div>
        </div>
      </div>

      {/* Back Link */}
      <div className="pt-4">
        <Link href="/pricing/fees" className="text-[#7AB7A9] font-medium hover:underline">
          ← Back to Price List
        </Link>
      </div>

    </div>
  );
}