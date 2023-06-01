import {  MouseEventHandler } from "react";
import Input from "./Input";
import Button from "./Button";
import { useAuth } from "@/src-client/hooks/use-auth";

const authProps = {
  action: 'register',
  validate: true,
  initialState: {
    email: '',
    password: '',
    name:'',
    lastname: ''
  },
  success:{
    title: 'Te enviamos un email',
    text:'Revisa tu bandeja de entrada o la carpeta de spam'
  }
}
export default function Register({showLogin}:{showLogin: MouseEventHandler}) {


    const {handerInputsChange,inputs,handlerFormSubmit, errors, isLoading} = useAuth(authProps)
  return (
    <>
      <section className="flex flex-col">
        <h1 className="text-xl font-semibold mb-2">Registra tu cuenta</h1>
        <form onSubmit={handlerFormSubmit} className="flex flex-col gap-2">
          <fieldset className="flex flex-row gap-2">
            <div className="flex flex-col">
              <Input
                type="text"
                name="name"
                label="Nombre"
                placeholder="Jhon"
                value={inputs.name || ''}
                error={errors.name}
                onChange={handerInputsChange}
              />
            </div>
            <div className="flex flex-col">
              <Input
                type="text"
                name="lastname"
                label="Apellido"
                placeholder="Doe"
                value={inputs.lastname  || ''}
                error={errors.lastname}
                onChange={handerInputsChange}
              />
            </div>
          </fieldset>
          <Input
            type="email"
            name="email"
            label="Correo Electrónico"
            placeholder="jhon2023@gmail.com"
            value={inputs.email || ''}
            error={errors.email}
            onChange={handerInputsChange}
          />
          <Input
            type="password"
            name="password"
            label="Contraseña"
            placeholder="**********"
            value={inputs.password  || ''}
            error={errors.password}
            onChange={handerInputsChange}
          />
          <Button loading={isLoading} >Registrate</Button>
        </form>
      <p className="text-sm text-center mt-2">¿Tienes una cuenta? <span onClick={showLogin} className="hover:cursor-pointer font-semibold text-blue-600">Ingresá</span></p>
      </section>
    </>
  )
}
