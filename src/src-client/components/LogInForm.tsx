import {  signIn } from "next-auth/react";
import Register from "./auth/Register";
import Login from "./auth/Login";
import { useToggle } from "../hooks/use-toggle";
import Google from './svgs/google'
import Welcome from "./auth/Welcome";


export default function Auth() {
  const { toggle, toggleHandler } = useToggle()

return (
  <>
    <main className="flex flex-row w-full self-center min-h-[70vh] ">
 <Welcome contentToShow={toggle} />
      <section className="flex flex-col max-w-lg m-auto self-center py-4">
        {toggle ? (
          <Login showRegister={toggleHandler} />
        ) : (
          <Register showLogin={toggleHandler} />
        )}
        <hr />
        <section className="flex flex-col gap-4">
          <button
            onClick={() => signIn('google',{
              callbackUrl: `${window.location.origin}/company`
            })}
            className="flex items-center justify-center gap-2 py-2 border-2 border-darknest-blue rounded"
          >
            <p className="m-0">Continuar con </p><Google className="h-4 w-4" />
          </button>
          {/* <button onClick={() => signIn('facebook')}>
              Continuar con Facebook
            </button> */}
        </section>
      </section>
    </main>
  </>
)}

