import React from 'react'
import Plans from './Plans/Plans'
import Hero from './Hero'
import SectionUno from './Section-1'
import Contact from './Contact'

const Landing = () => {
  return (
    <div>
      <Hero />
      <SectionUno />
      <Contact showInfo={true}/>
      <Plans />
    </div>
  )
}

export default Landing

//