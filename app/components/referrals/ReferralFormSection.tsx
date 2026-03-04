import { UploadCloud } from "lucide-react";

const ReferralFormSection = () => {
  return (
    <section className="py-16 px-6 md:px-10 max-w-5xl mx-auto">
      {/* Top Content */}
      <div className="space-y-6 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#86B1AA]">
          Collaborative Orthodontic Care You Can Trust
        </h2>
        <div className="text-slate-600 space-y-4 leading-relaxed">
          <p>
            At <span className="font-bold text-slate-800">Perrystown Orthodontics</span>, we re proud to work in partnership with our local dental colleagues to provide specialist orthodontic care for patients of all ages. As an exclusively orthodontic practice, our focus is on delivering high-quality, specialist treatment plans that complement the excellent general dental care provided by our referring dentists.
          </p>
          <p>
            We greatly value the trust you place in us when you refer your patients. Throughout their orthodontic journey, we keep communication clear and consistent, ensuring youre fully informed of your patients progress. Patients are returned to your care for their ongoing dental maintenance and routine treatments.
          </p>
          <p>
            Our goal is to make the referral process simple, collaborative, and seamless, always putting the patients comfort and wellbeing at the centre of what we do. Thank you for choosing to work with Perrystown Orthodontics. Together, we can help every patient achieve a healthy, confident smile.
          </p>
        </div>
      </div>

      {/* Referral Form Card */}
      <div className="bg-white rounded-[32px] shadow-xl border border-slate-100 p-8 md:p-12">
        <h3 className="text-2xl font-bold text-slate-800 mb-8">Referral Form</h3>
        
        <form className="space-y-10">
          
          {/* Patient Details Section */}
          <div className="space-y-6">
            <h4 className="font-bold text-slate-700 border-b border-slate-100 pb-2">Patient Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Name <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Patient full name" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#86B1AA]/20 focus:border-[#86B1AA] outline-none transition" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Date of Birth <span className="text-red-500">*</span></label>
                <input type="date" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#86B1AA]/20 focus:border-[#86B1AA] outline-none transition" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Phone Number <span className="text-red-500">*</span></label>
                <input type="tel" placeholder="Phone number" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#86B1AA]/20 focus:border-[#86B1AA] outline-none transition" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Email <span className="text-red-500">*</span></label>
                <input type="email" placeholder="email@example.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#86B1AA]/20 focus:border-[#86B1AA] outline-none transition" />
              </div>
            </div>
          </div>

          {/* Dentist Details Section */}
          <div className="space-y-6">
            <h4 className="font-bold text-slate-700 border-b border-slate-100 pb-2">Dentist Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Name <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Dentist full name" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#86B1AA]/20 focus:border-[#86B1AA] outline-none transition" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Practice <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Practice name" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#86B1AA]/20 focus:border-[#86B1AA] outline-none transition" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Phone Number <span className="text-red-500">*</span></label>
                <input type="tel" placeholder="Phone number" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#86B1AA]/20 focus:border-[#86B1AA] outline-none transition" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Email <span className="text-red-500">*</span></label>
                <input type="email" placeholder="email@example.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#86B1AA]/20 focus:border-[#86B1AA] outline-none transition" />
              </div>
            </div>
          </div>

          {/* Further Information Section */}
          <div className="space-y-6">
            <h4 className="font-bold text-slate-700 border-b border-slate-100 pb-2">Further Information</h4>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600">Additional Notes</label>
              <textarea rows={4} placeholder="Please provide any additional information about the referral..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#86B1AA]/20 focus:border-[#86B1AA] outline-none transition resize-none"></textarea>
            </div>
          </div>

          {/* File Upload Section */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Upload Files or Images</label>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer group">
              <UploadCloud size={40} className="text-slate-400 group-hover:text-[#86B1AA] transition-colors mb-2" />
              <p className="text-sm text-slate-600 font-medium">Click to upload or drag and drop</p>
              <p className="text-xs text-slate-400 mt-1">PNG, JPG, PDF, DOC up to 10MB</p>
            </div>
          </div>

          {/* Footer & Submit */}
          <div className="space-y-6 pt-4">
            <div className="flex items-start gap-3">
              <input type="checkbox" id="referral-consent" className="mt-1 w-4 h-4 accent-[#86B1AA] cursor-pointer" />
              <label htmlFor="referral-consent" className="text-xs text-slate-500 leading-normal">
                I consent to being contacted about this referral request and have read the <span className="underline cursor-pointer">Privacy Policy</span>
              </label>
            </div>
            <button type="submit" className="w-full py-4 bg-[#86B1AA] hover:bg-[#769d96] text-white font-bold rounded-xl transition-all shadow-md active:scale-[0.98] uppercase tracking-wider">
              Submit Referral
            </button>
          </div>

        </form>
      </div>
    </section>
  );
};

export default ReferralFormSection;