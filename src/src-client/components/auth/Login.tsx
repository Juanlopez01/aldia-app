import { MouseEventHandler } from "react";
import Input from "./Input";
import Button from "./Button";
import { useAuth } from "@/src-client/hooks/use-auth";

const authProps = {
  action: 'login',
  redirect: 'company',
  initialState: {
    email: '',
    password: '',
  },
}


export default function Login({showRegister}:{showRegister: MouseEventHandler}) {
    const { handerInputsChange, inputs, handlerFormSubmit, errors } =
      useAuth(authProps)
  return (
    <>
      <section>
        <form onSubmit={handlerFormSubmit} className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold mb-2">Ingresa a tu cuenta</h1>
          <fieldset className="flex flex-col text-start gap-2 justify-start">
            <Input
              type="email"
              name="email"
              label="Email"
              onChange={handerInputsChange}
              value={inputs.email}
              error={errors.email}
            />
            <Input
              type="password"
              name="password"
              label="Contraseña"
              onChange={handerInputsChange}
              value={inputs.password}
              error={errors.password}
            />
          </fieldset>
          <Button>Ingresar</Button>
        </form>
        <p className="text-sm text-center mt-4">
          ¿No tienes una cuenta?{' '}
          <span
            onClick={showRegister}
            className="hover:cursor-pointer font-semibold text-blue-600"
          >
            Registrate
          </span>
        </p>
      </section>
    </>
  )
}
