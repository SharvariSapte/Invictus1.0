import { Routes, Route } from "react-router-dom";
import React from 'react'
import Hero from './pages/Hero'
import Timeline from './pages/Timeline'
import PrizePool from './pages/prizepool'
import Recruitment from './pages/Recruitment'
import Navbar from '../components/Navbar'
import Contact from './pages/Contact'
import InvictusFAQ from './pages/FAQs'
import Home from './pages/Home'

const App = () => {
  const MainEventPage = () => (
    <div className='w-full min-h-screen overflow-x-hidden bg-[#0d0b09]'>
      <Navbar />
      <Hero />
      <Timeline />
      <PrizePool />
      <Recruitment />
      <Contact />
      <InvictusFAQ />
    </div>
  );

  return (
    <Routes>
      {/* Your Theatre of War landing page */}
      <Route path="/" element={<Home />} />

      {/* Navigates to the team's main website after the animation */}
      <Route path="/selected/:side" element={<MainEventPage />} />

    </Routes>
  );
}

export default App;
