import { useSession } from 'next-auth/react'
import React from 'react'
import { useSelector } from 'react-redux'

const Index = () => {
  const {data: session} = useSession()
  const goals = useSelector((state : any) => state.PersonalReducer.goals)
  if(session){
    return(
      <>
        <button>Agregar meta</button>
      </>
    )
  } else {
    return (
      <h2> No iniciaste sesion</h2>
    )
  }
}

export default Index