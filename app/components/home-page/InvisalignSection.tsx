import Image from "next/image";

const InvisalignSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        
        {/* Left Video Column */}
        <div className="relative col-span-1 overflow-hidden flex items-center justify-center h-[450px]">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-contain"
          >
            <source src="/assets/image/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
          </div>
        </div>

        {/* Middle Content Column */}
        <div className="col-span-1 lg:col-span-1 space-y-5 text-gray-800">
          <h2 className="text-3xl font-bold text-gray-900 leading-tight">
            See Your Invisalign<sup className="text-sm font-normal">&reg;</sup> Smile in Seconds!
          </h2>
          <p className="text-lg">
            Curious how your new smile could look? Its easy!
          </p>

          <ol className="list-decimal list-inside text-base space-y-2 font-medium">
            <li>Grab your phone</li>
            <li>Open your camera and scan the QR code</li>
            <li>Snap a quick selfie</li>
            <li>See your smile transformation — Instantly!</li>
          </ol>

          <p className="pt-4 text-base opacity-90">
            Discover how Invisalign<sup className="text-xs font-normal">&reg;</sup> clear aligners can help you achieve
            the confident, natural smile you ve always wanted.
          </p>
        </div>

        {/* Right QR Code Column */}
        <div className="col-span-1 flex flex-col items-center justify-center space-y-4 bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <Image
            src="/assets/image/qr.svg" 
            alt="QR Code Scan"
            width={200}
            height={200}
            className="rounded-md"
          />
          <p className="text-blue-600 font-semibold text-lg hover:underline cursor-pointer">
            Scan Now
          </p>
        </div>
      </div>
    </section>
  );
};

export default InvisalignSection;