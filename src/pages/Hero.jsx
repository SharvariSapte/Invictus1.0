import React, { useEffect, useState } from 'react'
const Hero = () => {
  const TARGET_DATE = new Date('2026-08-17T09:00:00+05:30')
  function useCountdown(target) {
    const calc = () => {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 }
      const s = Math.floor(diff / 1000)
      return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 }
    }
    const [t, setT] = useState(calc)
    useEffect(() => {
      const id = setInterval(() => setT(calc()), 1000)
      return () => clearInterval(id)
    }, [])
    return t
  }

  const pad = (n) => String(n).padStart(2, '0')
  const countdown = useCountdown(TARGET_DATE)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const resizeBg = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", resizeBg);

    return () => {
      window.removeEventListener("resize", resizeBg);
    };
  }, []);
  return (
    <>
      <div id="briefing" className="w-screen min-h-screen relative flex justify-center items-center"
        style={{
          backgroundImage: isMobile ? "url('/Mobile_hero.png')" : "url('/desktop_heroo.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}>
        <div className='absolute top-[28vh] md:top-32 md:left-[10vw] lg:left-[17vw] w-[clamp(300px,40%,400px)]'>

          <div className='flex flex-col gap-4 items-center'>

            <img src="/Heading.png" alt="Heading" />

            <div className='text-[#e8dfce] flex w-[90%] justify-between items-baseline font-mono'>
              <span>STRATEGY</span>
              <span className='h-1 w-1 rounded-full bg-[#e8dfce]'></span>
              <span>LEADERSHIP</span>
              <span className='h-1 w-1 rounded-full bg-[#e8dfce]'></span>
              <span>VICTORY</span></div>
          </div>

          <div className='flex flex-col gap-1 items-center text-center text-[#e8dfce] 
          text-[12px] md:text-[15px]
          font-mono mt-4'>
            <div>History has shown that the greatest victories</div>
            <div>are shaped not by strength alone,</div>
            <div>but by strategy and leadership</div>
          </div>
          <div className='bg-black/70 flex flex-col items-center mt-8'>
            <div className="text-[#e7cfa3] font-mono md:text-lg mt-3">OPERATION BEGINS IN</div>
            <div className="flex items-center justify-center gap-1 sm:gap-2 my-4 w-full flex-nowrap scale-80">
              {[{ v: countdown.d, l: 'DAYS' }, { v: countdown.h, l: 'HRS' }, { v: countdown.m, l: 'MIN' }, { v: countdown.s, l: 'SEC' }].map(({ v, l }, i) => (
                <div key={l} className="flex items-center gap-2">
                  <div className="flex flex-col items-center bg-[#4B5320]/20 border border-[#C49A2A]/30 px-3 sm:px-4 pt-2 pb-1 min-w-[3.5rem] sm:min-w-[4.5rem]">
                    <span className="font-['Black_Ops_One'] text-[clamp(1.6rem,5vw,2.8rem)] text-[#EADDCA] leading-none tracking-wide drop-shadow-[0_0_20px_rgba(196,154,42,0.35)]">{pad(v)}</span>
                    <span className="font-['Courier_Prime'] text-[0.55rem] tracking-[0.3em] text-[#d7a832] uppercase mt-1">{l}</span>
                  </div>
                  {i < 3 && <span className="font-['Black_Ops_One'] text-[clamp(1.4rem,4vw,2.2rem)] text-[#d7a832]/90 animate-pulse mx-0.5 leading-none -translate-y-3 sm:-translate-y-4">:</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero