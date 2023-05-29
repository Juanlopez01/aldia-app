import {  signIn } from "next-auth/react";
import Register from "./auth/Register";
import { useState } from "react";
import Login from "./auth/Login";
import { useToggle } from "../hooks/use-toggle";


export default function Auth() {
  // TODO: validation
  const { toggle, toggleHandler } = useToggle()

return (
  <>
    <main className="flex flex-col max-w-lg self-center mx-auto">
      {toggle ? <Login showRegister={toggleHandler}/> : <Register showLogin={toggleHandler} />}
      <hr />
      <section className="flex flex-col gap-4">
        <button
          onClick={() => signIn('google').then((data) => console.log(data))}
        >
          Continuar con Google
        </button>
        {/* <button onClick={() => signIn('facebook')}>
              Continuar con Facebook
            </button> */}
      </section>
    </main>
  </>
)}

