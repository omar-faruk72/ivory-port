const ContactMap = () => {
  return (
    <section className="w-full px-6 md:px-10 max-w-7xl mx-auto py-10">
      <div className="w-full h-[450px] rounded-[32px] overflow-hidden shadow-sm border border-slate-100">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.405117778547!2d90.3520817768775!3d22.713178979391987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375535002d5eb207%3A0x256292170a806d28!2sRafiq%20Place!5e0!3m2!1sen!2sbd!4v1771223620627!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Perrystown Orthodontics Location Map"
          className="grayscale-[20%] hover:grayscale-0 transition-all duration-500"
        ></iframe>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-slate-400 text-sm italic">
          * Click on the map to interact and get directions to our clinic.
        </p>
      </div>
    </section>
  );
};

export default ContactMap;