import {  signIn } from "next-auth/react";
import Register from "./auth/Register";
import Login from "./auth/Login";
import { useToggle } from "../hooks/use-toggle";
import Star from './svgs/star'
import Google from './svgs/google'
import Image from "next/image";


export default function Auth() {
  // TODO: validation
  const { toggle, toggleHandler } = useToggle()

return (
  <>
    <main className="flex flex-row w-full self-center h-[70vh]">
      <section className="w-1/3 bg-darkest-blue text p-8 flex justify-between text-white flex-col overflow-hidden -z-10">
        <header className="grid gap-2">
          <h1 className="text-5xl font-black ">Bienvendo a ALDIA</h1>
          <p>La aplicación de finanzas por exelencia</p>
        </header>
        <div>
          <article>
            <div className="flex mb-4">
              <Star /> <Star /> <Star /> <Star /> <Star />
            </div>
            <p>
              ¡Nos encantó Aldia! La uso todo el tiempo para administrar la
              contabilidad de mi empresa.
            </p>
          </article>
          <div className="flex gap-2">
            <Image
              src="/quote-img.webp"
              width="40"
              height="40"
              alt="quote image"
              className="rounded-full"
            />
            <div className="">
              <h4 className="font-semibold text-sm">Devon Lane</h4>
              <h5 className="text-xs ">CO-Founder, Desing.co</h5>
            </div>
          </div>
        </div>
        <div className=" absolute rounded-full border-4 border-white bottom-0 left-1/4 w-1/3 h-1/3 bg-transparent"></div>
        <div className=" absolute rounded-full border-4 border-white/20 top-0 -left-[20%] w-1/4 h-1/4 bg-transparent"></div>
      </section>
      <section className="flex flex-col max-w-lg m-auto self-center">
        {toggle ? (
          <Login showRegister={toggleHandler} />
        ) : (
          <Register showLogin={toggleHandler} />
        )}
        <hr />
        <section className="flex flex-col gap-4">
          <button
            onClick={() => signIn('google')}
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

