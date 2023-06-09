import { UserWithId } from '@/models/user.model'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ButtonHTMLAttributes, MouseEvent } from 'react'
import Swal from 'sweetalert2'

export default function Page() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const handlerClickPlan = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.target as HTMLButtonElement
    if (status !== 'authenticated') {
      router.push('/auth')
      return
    }
    const { _id: userId, email } = session?.user as unknown as UserWithId
    try {
      const res = await fetch('/api/payments/mercado-pago', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: value,
          userId,
          email,
        }),
      }).then((data) => data.json())
      router.push(res.redirection_url)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error al internar realizar el pago, intentelo más tarde',
      })
    }
  }
  return (
    <>
      <main className="grid place-content-center">
        <h1 className="text-3xl">PLANES</h1>
        <section>
          <button value="basic" onClick={handlerClickPlan}>
            plan 1
          </button>
          <button value="premium" onClick={handlerClickPlan}>
            plan 2
          </button>
        </section>
      </main>
    </>
  )
}
