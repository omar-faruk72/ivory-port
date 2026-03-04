import Image from "next/image";

const ContactSection = () => {
  return (
    <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
        
        {/* Left Side: Image */}
        <div className="relative min-h-[400px] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/assets/image/get-in.png" 
            alt="Contact Us"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-white p-2 md:p-6 rounded-2xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800">Get in Touch</h2>
            <p className="text-slate-500 mt-2 font-medium">
              Our friendly team would love to hear from you.
            </p>
          </div>

          <form className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Name Here"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="hello@example.com"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+1234567890"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition"
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Write your message here..."
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition resize-none"
              ></textarea>
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="consent"
                className="mt-1 w-4 h-4 text-teal-600 border-slate-300 rounded focus:ring-teal-500 cursor-pointer"
              />
              <label htmlFor="consent" className="text-xs text-slate-500 leading-tight">
                I consent to having this website store my submitted information so they can respond to my inquiry. See our <span className="underline cursor-pointer">privacy policy</span> to learn more about how we use data.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-[#86B1AA] hover:bg-[#769d96] text-white font-bold rounded-lg transition-all shadow-md active:scale-[0.98]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;