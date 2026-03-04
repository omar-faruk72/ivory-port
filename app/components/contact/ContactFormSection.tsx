import Image from "next/image";

const ContactFormSection = () => {
  return (
    <section className="py-16 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100 grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Side: Contact Form */}
        <div className="p-8 md:p-12 lg:p-16 space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Get in Touch</h2>
            <p className="text-slate-500 mt-2 font-medium">
              Our friendly team would love to hear from you.
            </p>
          </div>

          <form className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700">Name</label>
              <input
                type="text"
                placeholder="Name Here"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#86B1AA]/20 focus:border-[#86B1AA] transition-all placeholder:text-slate-300"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700">Email Address</label>
              <input
                type="email"
                placeholder="hello@example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#86B1AA]/20 focus:border-[#86B1AA] transition-all placeholder:text-slate-300"
              />
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700">Phone Number</label>
              <input
                type="tel"
                placeholder="+1234567890"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#86B1AA]/20 focus:border-[#86B1AA] transition-all placeholder:text-slate-300"
              />
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700">Message</label>
              <textarea
                rows={4}
                placeholder="Write your message here..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#86B1AA]/20 focus:border-[#86B1AA] transition-all resize-none placeholder:text-slate-300"
              ></textarea>
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="form-consent"
                className="mt-1 w-4 h-4 accent-[#86B1AA] border-slate-300 rounded cursor-pointer"
              />
              <label htmlFor="form-consent" className="text-[11px] text-slate-400 leading-normal">
                I consent to having this website store my submitted information so they can respond to my inquiry. See our <span className="underline cursor-pointer">privacy policy</span> to learn more about how we use data.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-[#86B1AA] hover:bg-[#769d96] text-white font-bold rounded-xl transition-all shadow-md active:scale-[0.98] uppercase tracking-wider"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Side: Family Image */}
        <div className="relative hidden lg:block min-h-full">
          <Image
            src="/assets/image/contact-form.png" 
            alt="Happy Family"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;