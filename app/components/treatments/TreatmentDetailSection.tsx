import React from 'react';
import Image from 'next/image';

const TreatmentDetailSection = () => {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-16">
      {/* Top Description Area */}
      <div className="max-w-5xl space-y-6 text-[#6B7280] text-[17px] leading-relaxed mb-20">
        <p>
          At <strong>Perrystown Orthodontics</strong>, we know that every smile is unique — and so is every treatment plan. 
          Whether youre a child, teenager, or adult, we offer a range of modern orthodontic options designed to suit your needs, lifestyle, and goals.
        </p>
        <p>
          From tried-and-true <strong>metal braces</strong> to more discreet <strong>clear braces</strong> and virtually invisible <strong>clear aligners</strong>, 
          we provide treatments that combine proven results with the latest orthodontic technology.
        </p>
        <p>
          Our friendly, experienced team will take the time to understand your concerns, explain your options, and help you choose the approach 
          thats right for you. No matter which treatment you select, you can count on gentle, expert care and a supportive experience — every step of the way.
        </p>
        <p className="font-medium text-gray-800">
          At Perrystown Orthodontics, our goal is simple: to make every smile healthy, confident, and uniquely yours.
        </p>
      </div>

      {/* Breadcrumb styled text */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-10 font-medium">
        <span>Home</span>
        <span>›</span>
        <span>Treatments</span>
        <span>›</span>
        <span className="text-gray-800">Braces Details</span>
      </div>

      {/* Main Content Section (Alternating Layout) */}
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Left Side: Image */}
        <div className="w-full md:w-1/2">
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm">
            <Image 
              src="https://res.cloudinary.com/dn5t9fhya/image/upload/v1773040227/k6rjnqtdrmjd1kbbkdep.webp" // আপনার স্ক্রিনশটের ইমেজ ইউআরএল
              alt="Metal Braces Treatment"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Side: Text Content */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold text-[#7AB7A9] tracking-tight">
            Metal Braces
          </h2>
          
          <div className="space-y-5 text-[#4B5563] text-lg leading-relaxed">
            <p className="font-bold text-gray-800">
              Todays metal braces are smaller, smoother, and more comfortable than ever before. They use gentle, consistent pressure to gradually move your teeth into their ideal position, giving you a straight, confident smile that lasts a lifetime.
            </p>
            
            <p>
              At <strong>Perrystown Orthodontics</strong>, we use modern, low-profile brackets that are easy to keep clean and can even be personalised with coloured elastics, a fun option for kids and teens! For adults, we offer discreet, polished finishes that blend naturally for a professional look.
            </p>
            
            <p>
              Metal braces remain one of the most reliable and cost-effective orthodontic treatments available, suitable for a wide range of needs, from simple corrections to more complex cases.
            </p>
            
            <p>
              Whether its your childs first orthodontic treatment or your own journey to a straighter smile, our friendly team will guide you every step of the way, ensuring your experience is comfortable, supportive, and rewarding.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TreatmentDetailSection;