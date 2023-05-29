
import {  signIn } from "next-auth/react";
import Register from "./auth/Register";


export default function Auth() {

return(
<>
<main className='flex flex-col max-w-lg self-center mx-auto' >
<Register />
<hr />
  <section className="flex flex-col gap-4">
            <button onClick={() => signIn('google').then(data=>console.log(data) )}>
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

