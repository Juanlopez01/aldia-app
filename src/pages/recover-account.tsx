import { UserType } from '@/models/user.model';
import Button from '@/src-client/components/auth/Button';
import Input from '@/src-client/components/auth/Input';
import { useAuth } from '@/src-client/hooks/use-auth';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import  { FormEvent, useCallback, useEffect, useState } from 'react'

const authProps ={
  redirect: '',
  action: '',
  initialState: {
    password: '',
    repeatPassword: '',
    email: '',
  }
}

const BASE_URL = `/api/recover-account?token=`

export default function Page() {
  const searchParams = useSearchParams()
  const [user , setUser ] = useState<UserType | null>(null)
  const {inputs, errors, handerInputsChange, validateInputs} = useAuth(authProps)

  const getUser = useCallback(async({token}: {token: string|null})=>{
  const res = await fetch(`${BASE_URL}${token}`)
  const { user } = await res.json() as { user: UserType }
  console.log(user);
  setUser(user)
  },[])

  useEffect(() => {
    const token = searchParams.get('token')
    getUser({ token })
  }, [searchParams, getUser])

  const handlerSubmit =async (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
  validateInputs(inputs)

  const token = searchParams.get('token')
  const res = await fetch(`${BASE_URL}${token}`,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ newPassword: inputs.password })
  })
const {success, user} = await res.json()
if (success) {
  signIn('credentials', {
    redirect: true,
    email: user.email,
    password: inputs.password,
    action: 'login',
    callbackUrl: `${window.location.origin}/company`,
  })
}
  }
  return (
    <>
      <main className="min-h-[74vh] w-full grid place-content-center my-2">
        <section className="grid place-content-center">
          <Image
            src={(user?.image as string) || '/UserDefault.png'}
            alt={`Foto de pefil de ${user?.name}`}
            width="200"
            height="200"
          />
          <p className='m-0 text-lg text-center'>Hola {`${user?.name} ${user?.lastname}`}</p>
        </section>
        <form onSubmit={handlerSubmit} className='w-72 grid gap-2'>
          <h1 className='m-0 text-xl font-semibold text-center'>Recupera tu cuenta</h1>
          <Input
            type="password"
            name="password"
            label="Nueva contraseña"
            value={inputs.password || ''}
            onChange={handerInputsChange}
            error={errors.password}
            placeholder="******"
          />
          <Input
            type="password"
            name="repeatPassword"
            label="Repite la contraseña"
            value={inputs.repeatPassword || ''}
            onChange={handerInputsChange}
            error={errors.repeatPassword}
            placeholder="******"
          />
          <Button>Cambiar contraseña</Button>
        </form>
      </main>
    </>
  )
}

