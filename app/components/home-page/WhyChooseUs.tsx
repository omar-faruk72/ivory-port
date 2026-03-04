import Image from "next/image";
import { ShieldCheck, Sparkles, Target, Clock, CreditCard } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <ShieldCheck className="text-cyan-500" size={24} />,
      title: "Specialist Expertise",
      desc: "Our orthodontists are specialists with years of dedicated training and experience.",
    },
    {
      icon: <Sparkles className="text-cyan-500" size={24} />,
      title: "Latest Technology",
      desc: "We use advanced digital scanning and treatment planning for precise results.",
    },
    {
      icon: <Target className="text-cyan-500" size={24} />,
      title: "Focused Care",
      desc: "As an orthodontics-only practice, we're 100% focused on creating beautiful smiles.",
    },
    {
      icon: <Clock className="text-cyan-500" size={24} />,
      title: "Convenient Appointments",
      desc: "Flexible scheduling and efficient visits to respect your time.",
    },
    {
      icon: <CreditCard className="text-cyan-500" size={24} />,
      title: "Flexible Payment",
      desc: "To make orthodontic treatment affordable and stress-free for families.",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Content */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              Why Choose Our <span className="text-cyan-500">Specialist Practice</span>
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Our team are registered Specialist Orthodontists, dedicated to gentle, expert care 
              and the latest treatments to create healthy, confident smiles for all ages.
            </p>
          </div>

          <div className="space-y-6">
            {features.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="mt-1">{item.icon}</div>
                <div>
                  <h4 className="font-bold text-slate-800">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

     
        <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
          <Image 
            src="/assets/image/why-choose.png" 
            alt="Why choose us grid" 
            fill 
            className="object-cover"
            priority
          />
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;