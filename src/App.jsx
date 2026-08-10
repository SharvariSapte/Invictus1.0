import React from 'react'
import Hero from './pages/Hero'
import Navbar from '../components/Navbar'
import Contact from './pages/Contact'

const App = () => {
  return (
    <div className='w-screen min-h-screen'>
      <Navbar/>
      <Hero/>
      <Contact/>
    </div>
  )
}

export default App