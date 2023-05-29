import { ChangeEvent, FormEvent, MouseEventHandler, useState } from "react";
import Input from "./Input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Button from "./Button";

export default function Login({showRegister}:{showRegister: MouseEventHandler}) {
    const router = useRouter()
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>)=>{
        setInputs({
          ...inputs,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
           e.preventDefault()
           const { email, password }=inputs
           signIn("credentials", {
            redirect: false,
            email: email,
            password: password,
            action: 'login',
            callbackUrl: `${window.location.origin}/company`,
          }).then(data=>{
            console.log(data);
            if(data?.ok && data?.url) router.push(data?.url)
          })
        }
  return (
    <>
      <section>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold mb-2">Ingresa a tu cuenta</h1>
          <fieldset className="flex flex-col text-start gap-2 justify-start">
            <Input
              type="email"
              name="email"
              label="Email"
              onChange={handleInputChange}
              value={inputs.email}
            />
            <Input
              type="password"
              name="password"
              label="Contraseña"
              onChange={handleInputChange}
              value={inputs.password}
            />
          </fieldset>
          <Button>Ingresar</Button>
        </form>
      <p className="text-sm text-center mt-4">¿No tienes una cuenta? <span onClick={showRegister} className="hover:cursor-pointer font-semibold text-blue-600">Registrate</span></p>
      </section>
    </>
  )
}
