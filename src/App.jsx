import React from 'react'
import Hero from './pages/Hero'
import Navbar from '../components/Navbar'

const App = () => {
  return (
    <div className='w-screen min-h-screen'>
      <Navbar/>
      <Hero/>
    </div>
  )
}

export default App