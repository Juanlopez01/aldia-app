import { plans } from '@/utils/data'
import React from 'react'
import PlanCard from './PlanCard'

const Plans = () => {
  return (
    <div className='flex flex-wrap justify-center py-12 gap-3 bg-darkest-blue'>
      {plans?.map((plan, index)=><PlanCard key={index} plan={plan}/>)}
    </div>
  )
}

export default Plans
