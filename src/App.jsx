import { Routes, Route } from "react-router-dom";
import React from 'react'
import Hero from './pages/Hero'
import Recruitment from './pages/Recruitment'
import Navbar from '../components/Navbar'
import Contact from './pages/Contact'
import InvictusFAQ from './pages/FAQs'

const App = () => {
  const MainEventPage = () => (
    <div className='w-screen min-h-screen overflow-x-hidden bg-[#0d0b09]'>
      <Navbar/>
      <Hero/>
      <Recruitment/>
      <Contact/>
      <InvictusFAQ/>

    </div>
  );

  return (
    <Routes>
      {/* Your Theatre of War landing page */}
      <Route path="/" element={<Home />} />
      
      {/* Navigates to the team's main website after the animation */}
      <Route path="/selected/:side" element={<MainEventPage />} />
      
      {/* Optional: Keep your DummyPage available just in case */}
      <Route path="/dummy" element={<DummyPage />} />
    </Routes>
  );
}

export default App;
