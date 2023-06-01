import { useAuth } from "@/src-client/hooks/use-auth"
import Input from "./Input"
import Button from "../generals/Button"
import { useToggle } from '@/src-client/hooks/use-toggle'
import Modal from '@/src-client/components/generals/Modal'

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




export default function ForgotPass() {
  const {toggle,toggleHandler} = useToggle(false)
  const { errors, handerInputsChange, handlerFormSubmit, inputs, isLoading } =
    useAuth({ ...authProps, onSuccess: toggleHandler })
  return (
    <>
      <p
        className="text-sm m-0 hover:underline hover:text-medium-blue hover:cursor-pointer"
        onClick={toggleHandler}
      >
        Me olvidé mi constraseña
      </p>
      <Modal
        title="Recupera tu cuenta"
        showModal={toggle}
        closeModal={toggleHandler}
        footer="Se te enviará un email para que puedas cambiar tu contraseña y así recuperar tu cuenta"
      >
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
      </Modal>
    </>
  )
}
