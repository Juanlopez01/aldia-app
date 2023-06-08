import { UserWithId } from '@/models/user.model'
import { useSession } from 'next-auth/react'
import { ButtonHTMLAttributes, MouseEvent } from 'react'

export default function Page() {
  const { data: session } = useSession()

  const handlerClickPlan = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.target as HTMLButtonElement

    const {
      _id: userId,
      email,
      currency = 'USD',
    } = session?.user as unknown as UserWithId

    const res = await fetch('/api/payments/mercado-pago', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        plan: value,
        userId,
        currency,
        email,
      }),
    }).then((data) => data.json())
    window.location.href = res.redirection_url
  }
  return (
    <>
      <main className="grid place-content-center">
        <h1 className="text-3xl">PLANES</h1>
        <section>
          <button value="basic" onClick={handlerClickPlan}>
            plan 1
          </button>
          <button value="premium">plan 2</button>
        </section>
      </main>
    </>
  )
}
