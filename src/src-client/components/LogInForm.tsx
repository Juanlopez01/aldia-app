
import {  signIn } from "next-auth/react";
import Register from "./auth/Register";
import { useState } from "react";
import Login from "./auth/Login";


export default function Auth() {
  const [toggleLogin, setToggleLogin] = useState(true)

return (
  <>
    <main className="flex flex-col max-w-lg self-center mx-auto">
      {toggleLogin ? <Login /> : <Register />}
      <p className="text-sm text-center mt-2">¿No tienes una cuenta? <span onClick={()=> setToggleLogin(!toggleLogin)} className="hover:cursor-pointer font-semibold text-blue-600">Registrate</span></p>
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
)
}

