import { ERRORS_AUTH } from "@/utils/constants"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react"

interface AuthInitialState {
  email: string
  password?: string
  repeatPassword?: string
  name?: string
  lastname?: string
}

interface AuthProps{
  action: string
  redirect: string
  initialState: AuthInitialState
}

const emailRegex= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const passRegex= /^(?=.*[a-z])(?=.*\d).{8,}$/

interface ErrorsValidate {
  email?: string
  password?: string
  name?: string
  lastname?: string
  repeatPassword?: string
}

const validateAuth = ({email, password, name,lastname, repeatPassword}:AuthInitialState)=>{
  const errors = {} as ErrorsValidate
  if(email === ''){
    errors.email = "Se requiere un email"
  }else  if(!emailRegex.test(email)){
    errors.email = "Email invalido"
  }
  if (password === '') {
    errors.password = 'Se requiere una contraseña'
  } else if (password !== undefined && !passRegex.test(password)) {
    errors.password =
      'La contraseña debe contener almenos 8 caracteres, una letra y un número'
  }

  if(repeatPassword !== undefined && repeatPassword !== password){
    errors.repeatPassword = 'Las contraseñas deben ser iguales'
  }
  if(name === ''){
    errors.name = "Se requiere un nombre"
  } 
  if(lastname  === ''){
    errors.lastname = "Se requiere un apellido"
  } 
  return errors
}

export const useAuth = ({action, initialState, redirect}:AuthProps) => {
  const router = useRouter()
  const [inputs, setInputs] = useState(initialState)
  const [errors, setErrors] = useState<ErrorsValidate>({})

  const handerInputsChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { value, name } = e.target
    setInputs((prevState) => ({ ...prevState, [name]: value }))
  }

  // Validations
  const validateInputs = (inputsToValidate: AuthInitialState) => {
    const errors = validateAuth(inputsToValidate)
    setErrors(errors)
    if (Object.keys(errors).length > 0) {
      return
    }
  }


  const handlerFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { email, password, name, lastname } = inputs

    if (action === 'register') validateInputs(inputs)
    signIn('credentials', {
      redirect: false,
      name,
      lastname,
      email,
      password,
      action,
      callbackUrl: `${window.location.origin}/${redirect}`,
    }).then((data) => {

      console.log(data)

      // Redirect to the callback
      if (data?.ok && data?.url) return router.push(data?.url)
      const { error } = data as { error: string }

      if (error.startsWith('EMAIL'))
        setErrors((prevState) => ({
          ...prevState,
          email: ERRORS_AUTH[error as keyof typeof ERRORS_AUTH],
        }))
      else if (error.startsWith('PASS'))
        setErrors((prevState) => ({
          ...prevState,
          password: ERRORS_AUTH[error as keyof typeof ERRORS_AUTH],
        }))
    })
  }

  return {
    errors,
    inputs,
    handerInputsChange,
    validateInputs,
    handlerFormSubmit,
  }
}