import { useSession } from 'next-auth/react'
import React from 'react'

const Index = () => {
  const {data: session} = useSession()
  console.log(session)
  if(session){
    return(
      <h1>Inicio sesion</h1>

    )
  } else {
    return (
      <h2> No iniciaste sesion</h2>
    )
  }
}

export default Index