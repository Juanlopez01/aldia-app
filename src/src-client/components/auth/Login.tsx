import { MouseEventHandler } from "react";
import Input from "../generals/Input";
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
      <section className="flex flex-col gap-2 w-full md:min-h-[55vh] p-4">
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
              classes="max-w-[600px]"
            />
            <Input
              type="password"
              name="password"
              label="Contraseña"
              onChange={handerInputsChange}
              value={inputs.password || ''}
              error={errors.password}
              classes="max-w-[600px]"
            />
          </fieldset>
          <div className="py-3">
            <Button loading={isLoading} classes="w-full text-center flex justify-center max-w-[600px] my-2">Ingresar</Button>
          </div>
        </form>
        <ForgotPass />
        <p className="text-sm m-0">
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
