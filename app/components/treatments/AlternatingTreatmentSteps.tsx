import React from 'react';
import Image from 'next/image';

const treatmentsData = [
  {
    title: "Clear Braces",
    description: `
      <p>Clear braces offer the same reliable results as traditional metal braces, but with a more discreet, natural look.</p>
      <p>Made from smooth, tooth-coloured ceramic materials, clear braces blend beautifully with your smile, making them a popular choice for teens and adults who want effective treatment without the look of metal brackets.</p>
      <p>At <strong>Perrystown Orthodontics</strong>, we use high-quality, low-profile clear braces that are comfortable to wear and easy to keep clean. They work just like metal braces, gently guiding your teeth into perfect alignment for a confident, healthy smile.</p>
    `,
    imageUrl: "https://res.cloudinary.com/dn5t9fhya/image/upload/v1773040225/mz0xylmbsilwnkwe0lbr.webp",
  },
  {
    title: "Invisalign Clear Aligners",
    description: `
      <p>Invisalign clear aligners offer a comfortable, removable, and nearly invisible way to straighten your teeth — perfect for adults, teens, and even responsible younger patients.</p>
      <p>Using a series of custom-made, clear aligners, Invisalign gently moves your teeth into their ideal positions without the need for metal brackets or wires. The aligners are smooth, comfortable, and can be taken out for eating, brushing, and special occasions.</p>
      <p>At <strong>Perrystown Orthodontics</strong>, we use the latest digital scanning technology to plan your treatment precisely from start to finish, no messy impressions required.</p>
    `,
    imageUrl: "https://res.cloudinary.com/dn5t9fhya/image/upload/v1773040228/qnrcprzqzwazvrdiipsh.webp",
  },
  {
    title: "Spark Clear Aligners",
    description: `
      <p>Spark clear aligners are a gentle, nearly invisible way to achieve a beautifully straight smile, designed with comfort, clarity, and precision in mind.</p>
      <p>Made from an advanced, crystal-clear material, Spark aligners are specially designed to resist stains and stay clearer for longer, so your treatment stays as discreet as possible.</p>
      <p>At <strong>Perrystown Orthodontics</strong>, we use the latest 3D digital technology to plan your Spark treatment with exceptional accuracy. This means predictable results, a comfortable fit, and a smile you'll love to share.</p>
    `,
    imageUrl: "https://res.cloudinary.com/dn5t9fhya/image/upload/v1773040227/qjcs4h7kzztqgsbidzmx.webp",
  }
];

const AlternatingTreatmentSteps = () => {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-20 space-y-24">
      {treatmentsData.map((item, index) => (
        <div 
          key={index} 
          className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}
        >
          {/* Image Container */}
          <div className="w-full md:w-1/2 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-sm border border-gray-100">
            <Image 
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-4xl font-bold text-[#7AB7A9] tracking-tight">
              {item.title}
            </h2>
            
            <div 
              className="text-[#4B5563] text-lg leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />

            <p className="text-gray-500 italic text-sm">
              Our friendly team will guide you through every stage of your journey, ensuring your experience is clear, comfortable, and confidence-boosting.
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default AlternatingTreatmentSteps;