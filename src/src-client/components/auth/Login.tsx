import { ChangeEvent, FormEvent, useState } from "react";
import Input from "./Input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
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
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
          <h1 className="text-xl text-center">Login</h1>
          <fieldset className="flex flex-col text-start">
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
          <button  className="text-center">Login</button>
        </form>
      </section>
    </>
  )
}
