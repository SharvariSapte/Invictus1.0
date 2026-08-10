import React from 'react';

const Contact = () => {
  return (
    <section 
      id="contact-hq" 
      className="relative w-full min-h-screen flex justify-center items-center py-16 px-4 md:px-8 font-mono"
      style={{
        backgroundImage: "url('desktop_heroo.png')", //[cite: 1]
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Heavy dark overlay to match the moody lighting of the Hero section */}
      <div className="absolute inset-0 bg-black/85"></div>

      {/* Main Tactical Container */}
      <div className="relative z-10 w-full max-w-5xl bg-black/60 border border-[#C49A2A]/40 p-6 md:p-12 shadow-[0_0_30px_rgba(0,0,0,0.9)] backdrop-blur-sm flex flex-col">
        
        {/* Classification Stamp */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 text-[#8b2222] border-2 border-[#8b2222] px-3 py-1 text-xs md:text-sm font-bold tracking-[0.2em] opacity-80 transform rotate-[15deg]">
          RESTRICTED
        </div>

        {/* Header Section */}
        <div className="border-b border-[#C49A2A]/30 pb-6 mb-8 text-center flex flex-col gap-3 items-center mt-6 md:mt-0">
          <h2 className="text-[#e7cfa3] text-3xl md:text-4xl tracking-[0.15em] font-['Black_Ops_One'] uppercase drop-shadow-[0_0_15px_rgba(196,154,42,0.3)]">
            Communications HQ
          </h2>
          <div className="flex items-center gap-3 text-[#e8dfce] text-xs md:text-sm tracking-widest uppercase">
            <span>Direct Dispatches</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#d7a832]"></span>
            <span>Frontline Command</span>
          </div>
          <p className="text-[#C49A2A]/70 text-xs mt-1 tracking-widest">
            FILE REF: DJSCE-EXPRESS-08-2026
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
          
          {/* Left Column: Radio / Equipment */}
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="bg-[#4B5320]/20 border border-[#C49A2A]/30 p-4 w-full flex flex-col items-center shadow-inner max-w-[320px]">
              <img 
                src="/image.png" 
                alt="Field Radio" 
                className="w-full h-auto filter sepia-[.6] brightness-75 contrast-125 mix-blend-luminosity border border-black/50"
              />
              <p className="text-[#d7a832] text-[11px] tracking-widest mt-4 uppercase text-center font-bold">
                [ Signal Corps Freq Active ]
              </p>
            </div>
          </div>

          {/* Right Column: Personnel */}
          <div className="w-full md:w-2/3 flex flex-col text-[#e8dfce]">
            <h3 className="text-[#e7cfa3] text-sm md:text-base tracking-widest mb-6 border-l-2 border-[#d7a832] pl-3 uppercase">
              Approved Comm Channels
            </h3>
            
            <div className="flex flex-col gap-4">
              {/* Contact Row 1 */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#4B5320]/10 border border-[#C49A2A]/20 p-4 md:p-5 hover:bg-[#4B5320]/30 transition-colors">
                <div>
                  <p className="text-[10px] text-[#C49A2A] tracking-widest uppercase mb-1">PR Head</p>
                  <p className="text-lg tracking-wider font-bold">Nandish Vyas</p>
                </div>
                <a href="tel:+917039966655" className="text-[#d7a832] hover:text-[#e8dfce] transition-colors mt-2 sm:mt-0 tracking-wider">
                  +91 70399 66655
                </a>
              </div>

              {/* Contact Row 2 */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#4B5320]/10 border border-[#C49A2A]/20 p-4 md:p-5 hover:bg-[#4B5320]/30 transition-colors">
                <div>
                  <p className="text-[10px] text-[#C49A2A] tracking-widest uppercase mb-1">PR Head</p>
                  <p className="text-lg tracking-wider font-bold">Lavisha Boliya</p>
                </div>
                <a href="tel:+919324468782" className="text-[#d7a832] hover:text-[#e8dfce] transition-colors mt-2 sm:mt-0 tracking-wider">
                  +91 93244 68782
                </a>
              </div>

              {/* Contact Row 3 */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#4B5320]/20 border border-[#d7a832]/40 p-4 md:p-5 hover:bg-[#4B5320]/40 transition-colors relative overflow-hidden">
                <div className="absolute -right-7 top-2 bg-[#d7a832] text-black text-[10px] font-bold px-8 py-1.5 rotate-45">COMMAND</div>
                <div>
                  <p className="text-[10px] text-[#C49A2A] tracking-widest uppercase mb-1">Chairperson</p>
                  <p className="text-lg tracking-wider font-bold">Dhruv Thakur</p>
                </div>
                <a href="tel:+919076317135" className="text-[#d7a832] hover:text-[#e8dfce] transition-colors mt-2 sm:mt-0 tracking-wider mr-4">
                  +91 90763 17135
                </a>
              </div>
            </div>

            {/* Email Dispatch */}
            <div className="mt-8 bg-black/50 border border-[#C49A2A]/30 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[#C49A2A] text-sm tracking-widest uppercase font-bold">General Dispatch:</span>
              <a href="mailto:djsce.express@gmail.com" className="text-[#e8dfce] hover:text-[#d7a832] transition-colors tracking-widest underline decoration-[#C49A2A]/50 underline-offset-4">
                djsce.express@gmail.com
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;