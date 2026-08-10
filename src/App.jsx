import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DummyPage from "./pages/DummyPage";
import Hero from './pages/Hero';
import PrizePool from './pages/prizepool';
import Recruitment from './pages/Recruitment';
import Navbar from '../components/Navbar';
import Contact from './pages/Contact';

const App = () => {
  const MainEventPage = () => (
    <div className='w-screen min-h-screen overflow-x-hidden bg-[#0d0b09]'>
      <Navbar />
      <Hero />
      <PrizePool />
      <Recruitment />
      <Contact />
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