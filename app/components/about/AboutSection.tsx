import Image from 'next/image';
import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-white max-w-7xl mx-auto">
      {/* Top Heading Section - সবার উপরে */}
      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-medium text-[#7AB7A9] leading-relaxed max-w-4xl">
          Discover the heart of our practice — our mission, our story, and the 
          friendly team behind your orthodontic care.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Side: Image Section */}
        <div className="w-full">
          <Image 
            src="https://res.cloudinary.com/dn5t9fhya/image/upload/v1773028042/3c26082a9cf5fb62132d215b55aacd4763ed521c_dvo4ac.jpg" 
            alt="Orthodontic Consultation at Perrystown Orthodontics"
            width={600} 
            height={450} 
            priority 
            className="object-cover rounded-2xl w-full h-auto shadow-sm"
          />
        </div>

        {/* Right Side: Content Section */}
        <div className="flex flex-col gap-6">
          <h3 className="text-3xl font-semibold text-[#7AB7A9]">
            Why Choose Us
          </h3>
          
          <div className="text-gray-700 space-y-5 leading-relaxed text-[15px]">
            <p>
              At <span className="font-bold text-black">Perrystown Orthodontics</span>, we treat every patient like family, because that&apos;s exactly how we see you. Our friendly team is passionate about creating beautiful, confident smiles in a warm and relaxed environment where children, teens, and adults all feel at home.
            </p>

            <p>
              Our doctors are <span className="font-bold text-black">Registered Specialist Orthodontists with the Irish Dental Council</span>, so you can trust that your smile is in expert hands. We&apos;re dedicated to <span className="font-bold text-black">continually improving the quality of care</span> we provide through ongoing professional training and development. 
            </p>

            <p>
              We believe great orthodontic care starts with <span className="font-bold text-black">kindness, clear communication, and genuine care</span>. From your first visit to your final smile reveal, we take the time to listen, explain, and make every step of your treatment comfortable and stress-free.
            </p>

            <p>
              Using the <span className="font-bold text-black">latest technology and a personalised approach</span>, we design every treatment plan around your individual needs and lifestyle.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;