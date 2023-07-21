import React from 'react'
import Plans from './Plans/Plans'
import Hero from './Hero'
import SectionUno from './Section-1'
import Contact from './Contact'
import TaskSection from './Section-1/Task-Section'

const Landing = () => {
  return (
    <div>
      <Hero />
      <SectionUno />
      <TaskSection/>
      <Contact showInfo={true}/>
      <Plans />
    </div>
  )
}

export default Landing

//