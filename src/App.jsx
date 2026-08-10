import React, { useState } from 'react'
import Hero from './pages/Hero'
import PrizePool from './pages/prizepool'
import Recruitment from './pages/Recruitment'
import Navbar from '../components/Navbar'
import Contact from './pages/Contact'
import Landing from './pages/Landing'

const App = () => {
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const defaultShow = params.has('landing') ? params.get('landing') === '1' : true;
  const [showLanding, setShowLanding] = useState(defaultShow);

  const handleLandingJoin = (side) => {
    setShowLanding(false);
    try {
      window.dispatchEvent(new CustomEvent('landingJoin', { detail: { side } }));
    } catch (e) {
      // ignore
    }

    // Keep the main site as the normal scrollable page after the
    // landing animation finishes.
    requestAnimationFrame(() => {
      const el = document.getElementById('briefing');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleLogoClick = () => {
    // The logo always brings the cinematic landing screen back.
    window.scrollTo({ top: 0, behavior: 'auto' });
    setShowLanding(true);
  };

  return (
    <div className='w-screen min-h-screen overflow-x-hidden bg-[#0d0b09]'>
      <Navbar onLogoClick={handleLogoClick}/>

      <Hero/>
      <PrizePool/>
      <Recruitment/>
      <Contact/>

      {showLanding && (
        <div style={{position: 'fixed', inset: 0, zIndex: 9999}}>
          <Landing onJoinComplete={handleLandingJoin} />
        </div>
      )}
    </div>
  )
}

export default App