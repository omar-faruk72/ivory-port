import Image from "next/image";

const brands = [
  { name: "Orthodontic Society of Ireland", src: "/assets/image/ireland.png" }, 
  { name: "SPARK", src: "/assets/image/spark.png" },
  { name: "Invisalign", src: "/assets/image/invisalign.png" },
  { name: "Dental Council", src: "/assets/image/dental.png" },
];

const TrustedBrands = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#2D3134] mb-12">
          Our Trusted Brands
        </h2>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center opacity-80">
          {brands.map((brand, index) => (
            <div key={index} className="relative w-full h-20 grayscale hover:grayscale-0 transition-all duration-300">
              <Image
                src={brand.src}
                alt={brand.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;