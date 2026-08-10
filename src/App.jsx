import React from 'react'
import Hero from './pages/Hero'
import Recruitment from './pages/Recruitment'
import Navbar from '../components/Navbar'
import Contact from './pages/Contact'

const App = () => {
  return (
    <div className='w-screen min-h-screen overflow-x-hidden bg-[#0d0b09]'>
      <Navbar/>
      <Hero/>
      <Recruitment/>
      <Contact/>
    </div>
  )
}

export default App