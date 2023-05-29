import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";
import Input from "./Input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter()
  const [inputs, setInputs] = useState({
    name: "",
    lastname:'',
    email: "",
    password: ""
  })
  const handerInputsChange: ChangeEventHandler<HTMLInputElement> = (e:ChangeEvent<HTMLInputElement>)=> {
    const { value, name } = e.target
    setInputs(prevState =>({...prevState, [name]: value}))
  }
  const handlerFormSubmit=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const {email, password, name, lastname } = inputs
  // TODO: error handling
    signIn("credentials", {
      redirect: false,
      name,lastname,
      email: email,
      password: password,
      action: 'register',
      callbackUrl: `${window.location.origin}/check-email`,
    }).then(data=>{
      console.log(data);
      if(data?.ok && data?.url) router.push(data?.url)
    })
  }
  return (
    <>
      <section className="flex flex-col">
        <h1 className="text-center text-xl">Register</h1>
        <form onSubmit={handlerFormSubmit} className="flex flex-col gap-2">
          <fieldset className="flex flex-row gap-2">
            <div className="flex flex-col">
              <Input
                type="text"
                name="name"
                label="Nombre"
                placeholder="Jhon"
                value={inputs.name}
                onChange={handerInputsChange}
              />
            </div>
            <div className="flex flex-col">
              <Input
                type="text"
                name="lastname"
                label="Apellido"
                placeholder="Doe"
                value={inputs.lastname}
                onChange={handerInputsChange}
              />
            </div>
          </fieldset>
          <Input
            type="email"
            name="email"
            label="Correo Electrónico"
            placeholder="jhon2023@gmail.com"
            value={inputs.email}
            onChange={handerInputsChange}
          />
          <Input
            type="password"
            name="password"
            label="Contraseña"
            placeholder="**********"
            value={inputs.password}
            onChange={handerInputsChange}
          />
          <button className="">Registrarme</button>
        </form>
      </section>
    </>
  )
}
