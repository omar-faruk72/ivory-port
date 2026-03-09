import Image from 'next/image';
import React from 'react';

// টিম মেম্বারদের ডেটা (সহজে ম্যানেজ করার জন্য)
const teamMembers = [
  {
    name: 'Dr. Anca Herman',
    role: 'Specialist Orthodontist',
    image: 'https://res.cloudinary.com/dn5t9fhya/image/upload/v1773028042/3c26082a9cf5fb62132d215b55aacd4763ed521c_dvo4ac.jpg', // উদাহরণ হিসেবে আগের লিঙ্কটি দিলাম
    description: 'Dr. Anca Herman is a highly skilled Specialist Orthodontist registered with the Irish Dental Council. She is passionate about creating confident, healthy smiles through precision, innovation, and compassionate care.\n\nWith extensive experience in both classical and modern orthodontic techniques including clear aligners, aesthetic and conventional braces, and advanced digital treatment planning.'
  },
  {
    name: 'Dr. James Herman',
    role: 'Specialist Orthodontist',
    image: 'https://res.cloudinary.com/dn5t9fhya/image/upload/v1773028042/3c26082a9cf5fb62132d215b55aacd4763ed521c_dvo4ac.jpg',
    description: 'Dr. James Herman is an Australian-born Specialist Orthodontist registered with the Irish Dental Council. He is dedicated to helping patients of all ages achieve their best smiles in a caring, family-friendly environment.\n\nKnown for his approachable manner and gentle care, Dr. James takes the time to get to know each patient.'
  },
  {
    name: 'Andrei',
    role: 'Treatment Coordinator and Orthodontic Nurse',
    image: 'https://res.cloudinary.com/dn5t9fhya/image/upload/v1773028042/3c26082a9cf5fb62132d215b55aacd4763ed521c_dvo4ac.jpg',
    description: 'Our Treatment Coordinator is here to guide you through every step of your orthodontic journey. He supports the doctors during appointments and ensures every patient feels comfortable and at ease.'
  },
  {
    name: 'Alison',
    role: 'Receptionist and Nurse',
    image: 'https://res.cloudinary.com/dn5t9fhya/image/upload/v1773028042/3c26082a9cf5fb62132d215b55aacd4763ed521c_dvo4ac.jpg',
    description: 'Our Receptionist is the friendly face you\'ll see when you first arrive at Perrystown Orthodontics. She is here to welcome you, answer your questions, and make sure your visit is as smooth and enjoyable as possible.'
  },
];

const TeamSection: React.FC = () => {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-white max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-semibold text-[#7AB7A9] mb-4">Meet The Team</h2>
        <p className="text-gray-600 text-lg">Our diverse team combines expertise in finding your problem.</p>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col">
            {/* Image Container */}
            <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-xl shadow-sm">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col h-full">
              <h4 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h4>
              <p className="text-[#7AB7A9] text-sm font-medium mb-4">{member.role}</p>
              
              <div className="text-gray-600 text-[14px] leading-relaxed whitespace-pre-line">
                {member.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;