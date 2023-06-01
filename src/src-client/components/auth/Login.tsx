import { MouseEventHandler } from "react";
import Input from "./Input";
import Button from "../generals/Button";
import { useAuth } from "@/src-client/hooks/use-auth";
import ForgotPass from "./ForgotPass";

const authProps = {
  action: 'login',
  redirect: 'company',
  initialState: {
    email: '',
    password: '',
  },
  success:{
    title: '¡Te has logueado correctamente!',
    text:'Ya puedes seguir manejando tus finanzas',
    timer: 1000
  }
}


export default function Login({showRegister}:{showRegister: MouseEventHandler}) {
    const { handerInputsChange, inputs, handlerFormSubmit, errors,isLoading } =
      useAuth(authProps)
  return (
    <>
      <section className="flex flex-col gap-2">
        <form onSubmit={handlerFormSubmit} className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold mb-2">Ingresa a tu cuenta</h1>
          <fieldset className="flex flex-col text-start gap-2 justify-start">
            <Input
              type="email"
              name="email"
              label="Email"
              onChange={handerInputsChange}
              value={inputs.email || ''}
              error={errors.email}
            />
            <Input
              type="password"
              name="password"
              label="Contraseña"
              onChange={handerInputsChange}
              value={inputs.password || ''}
              error={errors.password}
            />
          </fieldset>
          <Button loading={isLoading}>Ingresar</Button>
        </form>
        <ForgotPass />
        <p className="text-sm text-center m-0">
          ¿No tienes una cuenta?{' '}
          <span
            onClick={showRegister}
            className="hover:cursor-pointer font-semibold text-medium-blue"
          >
            Registrate
          </span>
        </p>
      </section>
    </>
  )
}
