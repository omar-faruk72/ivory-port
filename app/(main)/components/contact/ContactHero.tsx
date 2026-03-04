import { Mail, Phone, MapPin, Clock, Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ContactHero = () => {
  const contactDetails = [
    {
      icon: <Phone size={20} className="text-[#86B1AA]" />,
      text: "083 011 0533",
      href: "tel:0830110533",
    },
    {
      icon: <Mail size={20} className="text-[#86B1AA]" />,
      text: "perrystownorthodontics@gmail.com",
      href: "mailto:perrystownorthodontics@gmail.com",
    },
    {
      icon: <MapPin size={20} className="text-[#86B1AA]" />,
      text: "44 Muckross Avenue, Perrystown, Dublin 12, D12VK49",
      href: "https://maps.google.com",
    },
    {
      icon: <Clock size={20} className="text-[#86B1AA]" />,
      text: "Opening Hours: Monday to Friday 10 AM – 6:30 PM",
      href: null,
    },
  ];

  return (
    <section className="py-16 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Image */}
        <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-md">
          <Image
            src="/assets/image/contact-hero.png" 
            alt="Doctor and Patient"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Side: Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-[#86B1AA]">
              Contact Information
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              We&apos;d love to hear from you! Whether you&apos;re ready to start your smile journey or just 
              have a few questions, our friendly team at <span className="font-bold text-slate-800">Perrystown Orthodontics</span> is here to help.
            </p>
            <p className="text-slate-600 text-lg">
              Get in touch today, we&apos;re happy to guide you every step of the way.
            </p>
          </div>

          {/* Contact List */}
          <div className="space-y-5">
            {contactDetails.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="shrink-0">{item.icon}</div>
                {item.href ? (
                  <Link 
                    href={item.href} 
                    className="text-slate-700 hover:text-[#86B1AA] transition-colors font-medium"
                  >
                    {item.text}
                  </Link>
                ) : (
                  <span className="text-slate-700 font-medium">{item.text}</span>
                )}
              </div>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
            <span className="text-slate-500 font-semibold uppercase tracking-wider text-sm">Socials:</span>
            <Link href="#" className="p-2 bg-slate-100 rounded-lg hover:bg-[#86B1AA] hover:text-white transition-all">
              <Facebook size={20} />
            </Link>
            <Link href="#" className="p-2 bg-slate-100 rounded-lg hover:bg-[#86B1AA] hover:text-white transition-all">
              <Instagram size={20} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactHero;