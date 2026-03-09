import React from 'react';
import Image from 'next/image';

const earlyInterventionData = [
  {
    title: "Early Intervention",
    subtitle: "Setting Smiles Up for Success: A healthy smile starts early!",
    description: `
      <p>At <strong>Perrystown Orthodontics</strong>, we believe that guiding your child's growing smile can make a big difference in their long-term oral health. That's why we recommend that children receive their first orthodontic evaluation by <strong>age 7</strong>.</p>
      <p>Why so early? At this age, your child still has a mix of baby and adult teeth, making it the perfect time to spot any concerns with jaw growth, spacing, or bite alignment. Early checkups don't always mean treatment is needed right away—often, it simply allows us to monitor development and guide things in the right direction.</p>
      <p>If treatment is recommended at this stage, it is known as <strong>Phase 1 Treatment</strong>. This gentle, early care helps set the foundation for a healthier smile and can reduce the need for more extensive treatment later.</p>
    `,
    imageUrl: "https://res.cloudinary.com/dn5t9fhya/image/upload/v1773040227/k6rjnqtdrmjd1kbbkdep.webp", // স্ক্রিনশট অনুযায়ী ইমেজ
  },
  {
    title: "Two-Phased Treatments",
    subtitle: "A Guided Path to a Healthy, Confident Smile.",
    description: `
      <p>Some smiles need a little extra guidance as children grow, which is why <strong>Two-Phase Orthodontic Treatment</strong> can be a wonderful option. This approach allows us to treat developing issues early and then fine-tune the smile once all the adult teeth have come in.</p>
      <p><strong>Phase 1 – Early Intervention:</strong> Typically happens while your child still has a mix of baby and adult teeth. The goal is to guide jaw growth and correct bite issues before they become serious.</p>
      <p><strong>Resting Period:</strong> After Phase 1, we enter a resting period to monitor your child's growth until the adult teeth are ready for Phase 2.</p>
      <p><strong>Phase 2 – Perfecting the Smile:</strong> Once adult teeth appear, we use braces or clear aligners to carefully align teeth for the final, best result.</p>
    `,
    imageUrl: "https://res.cloudinary.com/dn5t9fhya/image/upload/v1773040224/qjcs4h7kzztqgsbidzmx.webp", // স্ক্রিনশট অনুযায়ী ইমেজ
  }
];

const EarlyInterventionSection = () => {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-20 space-y-32">
      {earlyInterventionData.map((item, index) => (
        <div 
          key={index} 
          className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 items-start`}
        >
          {/* Image Container */}
          <div className="w-full md:w-1/2 relative aspect-square rounded-[2rem] overflow-hidden shadow-sm border border-gray-100">
            <Image 
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold text-[#7AB7A9] tracking-tight">
                {item.title}
              </h2>
              <p className="text-gray-800 font-bold text-lg leading-snug">
                {item.subtitle}
              </p>
            </div>
            
            <div 
              className="text-[#4B5563] text-[17px] leading-relaxed space-y-4 prose prose-teal max-w-none"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />

            <p className="text-[#7AB7A9] font-semibold flex items-center gap-2 mt-6">
               At Perrystown Orthodontics, we guide families through each phase with care and clarity.
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default EarlyInterventionSection;