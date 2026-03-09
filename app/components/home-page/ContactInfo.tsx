import { Mail, Phone, MapPin, Clock } from "lucide-react";

const ContactInfo = () => {
  const infoItems = [
    {
      icon: <Mail className="text-[#86B1AA]" size={20} />,
      text: "perrystownorthodontics@gmail.com",
    },
    {
      icon: <Phone className="text-[#86B1AA]" size={20} />,
      text: "083 011 0533",
    },
    {
      icon: <MapPin className="text-[#86B1AA]" size={20} />,
      text: "44 Muckross Avenue, Perrystown, Dublin 12, D12VK49",
    },
    {
      icon: <Clock className="text-[#86B1AA]" size={20} />,
      text: "Opening hours: Monday to Friday 10 AM – 6:30 PM",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto bg-slate-50/50 rounded-3xl my-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Live Google Map */}
        <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-md border border-slate-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2383.6465446059635!2d-6.31481542335198!3d53.313837976192284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670c790382023d%3A0xc0207127e997645e!2s44%20Muckross%20Ave%2C%20Perrystown%2C%20Dublin%2012%2C%20D12%20VK49!5e0!3m2!1sen!2sie!4v1709560000000!5m2!1sen!2sie"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Perrystown Orthodontics Location"
          ></iframe>
        </div>

        {/* Right Side: Content */}
        <div className="space-y-6">
          <div>
            <h2 className="text-4xl font-bold text-[#86B1AA]">Contact Information</h2>
            <p className="mt-4 text-slate-600 leading-relaxed max-w-md">
              Find all the ways to reach us, including email, phone, and our 
              office address, so you can get the support and answers you 
              need quickly and easily.
            </p>
          </div>

          <div className="space-y-5 pt-4">
            {infoItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4 group">
                <div className="p-2 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <p className="text-slate-700 font-medium text-[15px] md:text-base cursor-default">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactInfo;