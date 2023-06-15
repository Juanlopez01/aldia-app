import { UserWithId } from '@/models/user.model'
import { ObjectId } from 'mongodb'
import { useSession } from 'next-auth/react'
import Swal from 'sweetalert2'
type PayPlanes = 'basic' | 'premium'

const nofityAdmin = async (userId: ObjectId, plan: PayPlanes) => {

  return await fetch('/api/payments/notifications', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, plan }),
  }).then((res) => {
    if (!res.ok)
    throw new Error(
        'Hubo un error al enviar la notificación, inténtalo más tarde'
      )

    return res.json()
  })
}

export default function NotifyBtn({ plan }: { plan: PayPlanes }) {
  const { data: session, status } = useSession()
  if (status !== 'authenticated') return null
  const { _id } = session.user as unknown as UserWithId
  const handlerClick = async () => {
    try {
      const data = await nofityAdmin(_id, plan)
      Swal.fire({
        icon: 'success',
        title: 'Exito!',
        text: data.message
      })
    } catch (error) {
        if( error instanceof Error)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message
        })
    }
  }
  return (
    <button
      onClick={handlerClick}
      className="py-1 px-4 bg-main-yellow dark:bg-light-blue dark:text-gray-300 text-gray-900 rounded font-semibold"
    >
      Notificar al administrador
    </button>
  )
}
