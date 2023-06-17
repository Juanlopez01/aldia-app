import { PaymentType } from '@/models/payment.model'
import { UserWithId } from '@/models/user.model'
import { requestAdminUsers, fetchPayment } from '@/utils/request'
import { ObjectId } from 'mongodb'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

type Props = {
  user: UserWithId
  onSuccess: (user: UserWithId) => void
}

interface ResponseValidate {
  success: boolean
  message: string
  user: UserWithId
}

const validatePaymentUserManually = async (
  userId: ObjectId,
  planType: 'basic' | 'premium'
) => {
  const response = await requestAdminUsers<ResponseValidate>(`/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ plan: planType }),
  })
  return response
}

export default function UserAdminModal({ onSuccess, user }: Props) {
  const [lastPayment, setLastPayment] = useState<PaymentType>()
  const handlerValidateUser = async (planType: 'basic' | 'premium') => {
    try {
      const res = await validatePaymentUserManually(user._id, planType)
      onSuccess(res.user)
      Swal.fire({
        icon: 'success',
        text: res.message,
        timer: 3000,
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'Ocurrió un error al intentar validar el usuario',
      })
    }
  }
  useEffect(() => {
    const lastPayId = user.payments?.at(-1)
    if (lastPayId) {
      fetchPayment(lastPayId)
        .then(({ payment }) => {
          setLastPayment(payment)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }, [user.payments])

  return (
    <>
      <header className="flex flex-row w-full gap-2 items-center">
        <Image
          src={user.image}
          alt="imagen del usuario"
          width="40"
          height="40"
          className="rounded-full w-10 h-10"
        />
        <div className="flex flex-col gap-1">
          <h3 className="m-0 text-black font-bold text-lg">{user.fullName}</h3>
          <h4 className="m-0 text-gray-700 text-xs">{user.email}</h4>
        </div>
      </header>
      <section>
        <h2 className="m-0 text-sm text-center">Vencimiento de ultimo pago</h2>
      </section>
      <footer>
        <div className="flex flex-col gap-2 mt-4">
          <h2 className="text-xl font-bold text-center m-0">
            Validar Usuario con
          </h2>
          <div className="flex flex-row justify-around capitalize">
            <button
              onClick={() => handlerValidateUser('basic')}
              className="p-2 rounded text-white bg-main-yellow capitalize "
            >
              plan básico
            </button>
            <button
              onClick={() => handlerValidateUser('premium')}
              className="p-2 rounded text-white bg-darkest-blue capitalize"
            >
              plan premium
            </button>
          </div>
        </div>
      </footer>
    </>
  )
}
