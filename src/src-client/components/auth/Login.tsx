import { MouseEventHandler } from "react";
import Input from "./Input";
import Button from "./Button";
import { useAuth } from "@/src-client/hooks/use-auth";
import { useToggle } from "@/src-client/hooks/use-toggle";
import ForgotPass from "./ForgotPass.modal";

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
      const {toggle,toggleHandler}= useToggle()
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
        <p className="text-sm m-0 hover:underline hover:text-medium-blue hover:cursor-pointer" onClick={toggleHandler}>
          Me olvidé mi constraseña
        </p>
        <p className="text-sm text-center m-0">
          ¿No tienes una cuenta?{' '}
          <span
            onClick={showRegister}
            className="hover:cursor-pointer font-semibold text-medium-blue"
          >
            Registrate
          </span>
        </p>
        {!toggle && <ForgotPass closeModal={toggleHandler} /> }
      </section>
    </>
  )
}
