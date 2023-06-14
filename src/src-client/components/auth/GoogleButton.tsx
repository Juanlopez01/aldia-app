import React, { Children } from 'react'
import Google from "../../components/svgs/google";
import { signIn } from 'next-auth/react';

const GoogleButton = (props: {children: string}) => {
  return (
    
    <section className="flex flex-col gap-4 md:max-w-[230px] pb-4 md:py-4 pr-4">
    <button
      onClick={() =>
        signIn("google", {
          callbackUrl: `${window.location.origin}/company`,
        })
      }
      className="flex items-center justify-center gap-2 py-2 border-2 border-main-green dark:border-darkest-blue bg-white rounded "
    >
      <p className="m-0 ">{props?.children}</p>
      <Google className="h-4 w-4" />
    </button>
    {/* <button onClick={() => signIn('facebook')}>
    Continuar con Facebook
  </button> */}
  </section>
  )
}

export default GoogleButton
