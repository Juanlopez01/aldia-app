import { useAuth } from "@/src-client/hooks/use-auth"
import Input from "./Input"
import Button from "./Button"
import { MouseEventHandler } from "react"

const authProps = {
  action: 'forgot',
  initialState: {
    email: '',
  },
  success:{
    title: 'Te enviamos un email',
    text:'Revisa tu bandeja de entrada o la carpeta de spam'
  }
}

export default function ForgotPass({
  closeModal,
}: {
  closeModal: MouseEventHandler
}) {
  const { errors, handerInputsChange, handlerFormSubmit, inputs, isLoading } =
    useAuth({...authProps, onSuccess: closeModal})
  return (
    <>
      <section className="w-full h-screen fixed z-[9999999]  backdrop-blur-sm grid place-content-center top-0 left-0">
        <div className="bg-white w-96  rounded shadow-md shadow-black p-4">
          <header className="flex justify-between">
          <h1 className="text-xl font-semibold">Recupera tu cuenta</h1>
          <button onClick={closeModal} className="font-extrabold text-xl ">X</button>
          </header>
          <form onSubmit={handlerFormSubmit} className="flex flex-col gap-2">
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="jhondoe@example.com"
              value={inputs.email || ''}
              onChange={handerInputsChange}
              error={errors.email}
            />
            <Button loading={isLoading}>Recuper cuenta</Button>
          </form>
          <footer className="mt-4">
            <p className="text-sm text-gray-500">Se te enviará un email para que puedas cambiar tu contraseña y así recuperar tu cuenta</p>
          </footer>
        </div>
      </section>
    </>
  )
}
