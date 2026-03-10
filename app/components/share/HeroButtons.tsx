import { ArrowRight } from "lucide-react";
import Link from "next/link";

const HeroButtons = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
      {/* ১. বুক কনসাল্ট বাটন (Solid Style) */}
      <Link href={"/booking"} className="bg-[#86B1AA] hover:bg-[#759f98] text-white font-medium py-3.5 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg">
        Book FREE Consult
      </Link>

      {/* ২. এক্সপ্লোর সার্ভিসেস বাটন (Outline Style) */}
      <Link 
        href="/treatments" 
        className="group flex items-center gap-2 border-2 border-white text-white font-medium py-3 px-8 rounded-xl hover:bg-white hover:text-zinc-900 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg"
      >
        Explore Services
        <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
};
export default HeroButtons;