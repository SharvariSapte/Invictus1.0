import React from 'react';

const Recruitment = () => {
  return (
    <section 
      id="recruitment" 
      className="relative w-full min-h-screen flex justify-center items-center py-20 px-4 md:px-8 font-mono overflow-hidden"
      style={{
        backgroundImage: "url('desktop_heroo.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Dark overlay matching Hero & Contact sections */}
      <div className="absolute inset-0 bg-black/85"></div>

      {/* Main Tactical Container */}
      <div className="relative z-10 w-full max-w-4xl bg-black/60 border border-[#C49A2A]/40 p-6 sm:p-8 md:p-12 shadow-[0_0_35px_rgba(0,0,0,0.9)] backdrop-blur-sm flex flex-col items-center">
        
        {/* Classification Stamp */}
        <div className="absolute top-4 right-4 md:top-6 md:right-8 text-[#8b2222] border-2 border-[#8b2222] px-3 py-1 text-xs md:text-sm font-bold tracking-[0.2em] opacity-80 transform rotate-[12deg] pointer-events-none">
          OFFICIAL ENLISTMENT
        </div>

        {/* Section Header */}
        <div className="border-b border-[#C49A2A]/30 pb-6 mb-8 text-center flex flex-col gap-3 items-center w-full mt-4 sm:mt-0">
          <h2 className="text-[#e7cfa3] text-3xl md:text-4xl tracking-[0.15em] font-['Black_Ops_One'] uppercase drop-shadow-[0_0_15px_rgba(196,154,42,0.3)]">
            Recruitment HQ
          </h2>
          <div className="flex items-center gap-3 text-[#e8dfce] text-xs md:text-sm tracking-widest uppercase">
            <span>Enlistment Open</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#d7a832]"></span>
            <span>Join Operation Invictus</span>
          </div>
          <p className="text-[#C49A2A]/70 text-xs mt-1 tracking-widest font-mono">
            FILE REF: INVICTUS-RECRUITMENT-2026
          </p>
        </div>

        {/* Poster & CTA Container */}
        <div className="w-full flex flex-col items-center gap-8">
          
          {/* Recruitment Poster Frame */}
          <div className="relative group p-2 sm:p-3 bg-[#4B5320]/20 border border-[#C49A2A]/40 shadow-[0_0_30px_rgba(196,154,42,0.2)] rounded-sm max-w-full w-fit flex justify-center items-center transition-all duration-300 hover:border-[#d7a832]/70">
            
            {/* Tactical Corner Accents */}
            <div className="absolute top-1 left-1 text-[#d7a832] text-xs font-mono select-none">+</div>
            <div className="absolute top-1 right-1 text-[#d7a832] text-xs font-mono select-none">+</div>
            <div className="absolute bottom-1 left-1 text-[#d7a832] text-xs font-mono select-none">+</div>
            <div className="absolute bottom-1 right-1 text-[#d7a832] text-xs font-mono select-none">+</div>

            {/* Poster Image - Responsive, Aspect-Ratio Preserved, Uncropped & Centered */}
            <img 
              src="/recruitment_poster.png" 
              alt="Invictus 1.0 Recruitment Poster" 
              className="w-full h-auto object-contain max-h-[70vh] sm:max-h-[650px] max-w-[320px] sm:max-w-[420px] md:max-w-[480px] rounded-sm block mx-auto filter brightness-95 contrast-105 group-hover:brightness-100 transition-all duration-300"
            />
          </div>

          {/* Prominent Registration Button */}
          <div className="w-full flex flex-col items-center gap-3">
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSfDWzX2pvKTyXPa3YoZtdUhdbMJvKH1NNbghtDqtY-YlycBvw/viewform" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center w-full max-w-[320px] sm:max-w-[420px] py-4 px-8 text-center bg-gradient-to-r from-[#8b6e22] via-[#d7a832] to-[#8b6e22] hover:from-[#d7a832] hover:via-[#e7cfa3] hover:to-[#d7a832] text-[#15120f] font-['Black_Ops_One'] text-lg md:text-xl tracking-[0.2em] uppercase font-bold border-2 border-[#e7cfa3] shadow-[0_0_25px_rgba(215,168,50,0.5)] hover:shadow-[0_0_40px_rgba(231,207,163,0.85)] transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#d7a832]/60 cursor-pointer rounded-sm"
              aria-label="Register Now for Invictus 1.0 Recruitment"
            >
              <span className="mr-2 text-xl group-hover:translate-x-0.5 transition-transform duration-200">★</span>
              Register Now
              <span className="ml-2 text-xl group-hover:translate-x-1 transition-transform duration-200">➔</span>
            </a>

            {/* Tactical Status Indicator */}
            <p className="text-[#a99b85] text-[10px] md:text-[11px] tracking-[0.2em] uppercase mt-1 text-center flex items-center gap-2 font-mono">
              <span className="inline-block w-2 h-2 rounded-full bg-[#d7a832] animate-pulse"></span>
              ENLISTMENT STATIONS ACTIVE • LIMITED SLOTS AVAILABLE
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Recruitment;
