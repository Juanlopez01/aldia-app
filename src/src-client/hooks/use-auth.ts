import { UserType } from "@/models/user.model"
import { ERRORS_AUTH } from "@/utils/constants"
import { emailRegex,passRegex } from "@/utils/regexp"
import { ObjectId } from "mongodb"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react"
import Swal from "sweetalert2"

interface AuthInitialState {
  email?: string
  password?: string
  repeatPassword?: string
  name?: string
  lastname?: string
  validate?: boolean
}

interface BaseAuth{
  action: string 
  redirect?: string
  success:{
    title: string
    text: string
    timer?: number
  }
  validate?: boolean
  onSuccess?: Function 
}

interface signInParams extends BaseAuth {
   inputs: AuthInitialState
   update?:{
     /* Si se quiere actualizar varias propiedades
     hay que mandar un array de propiedades 
     y en las misma posiciones los valores
     EJEMPLO:
     property:['name', 'lastname']
     value: ['Jhon', 'Doe']
      */
    property: keyof UserType | Array<keyof UserType> | string
    value: any
    id: ObjectId
   }
}

interface AuthProps extends BaseAuth {
  initialState: AuthInitialState
}

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
  }else  if(email !== undefined && !emailRegex.test(email)){
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


export const useAuth = (authParams:AuthProps) => {
  const { initialState, ...restParams } = authParams
  const router = useRouter()
  const [inputs, setInputs] = useState(initialState)
  const [errors, setErrors] = useState<ErrorsValidate>({})
  const [isLoading, setLoading]=useState(false)

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
    return Object.keys(errors).length > 0
  }

const singInAction = async (params: signInParams)=>{
  const { action, inputs, success, redirect, validate, onSuccess, update  } = params
  const { email, password, name, lastname } = inputs
  if (validate&& validateInputs(inputs) )return 
if ( update && Array.isArray( update.property)  ){
  update.property = update.property.join(' #&&# ')
  update.value = update.value.join(' #&&# ')
}
  setLoading(true)
  const data = await signIn('credentials', {
    redirect: false,
    name,
    lastname,
    ...update,
    email,
    password,
    action,
    callbackUrl: `${window.location.origin}/${redirect}`,
  })
  setLoading(false)
  if(data === undefined) return Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Hubo un error al realizar la acción, intentelo más tarde',
  })
  const { error, ok, url } = data 
  // Redirect to the callback
  if (ok && url) {
    if (onSuccess !== undefined) onSuccess()
    return Swal.fire({
      icon: 'success',
      ...success,
    }).then(() => {
      setInputs(initialState)
      return (
        Boolean(redirect) && router.push(url)
      )
    })
  }

  if (error?.startsWith('EMAIL'))
  setErrors((prevState) => ({
    ...prevState,
    email: ERRORS_AUTH[error as keyof typeof ERRORS_AUTH],
  }))
  else if (error?.startsWith('PASS'))
  setErrors((prevState) => ({
    ...prevState,
    password: ERRORS_AUTH[error as keyof typeof ERRORS_AUTH],
  }))
  else
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Hubo un error al realizar la acción, intentelo más tarde',
  })
}

  const handlerFormSubmit = (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    singInAction({inputs, ...restParams})
  }

  return {
    errors,
    inputs,
    isLoading,
    handerInputsChange,
    validateInputs,
    singInAction,
    handlerFormSubmit,
  }
}