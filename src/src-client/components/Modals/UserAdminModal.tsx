import { PaymentType } from '@/models/payment.model'
import { UserWithId } from '@/models/user.model'
import { validatePaymentUserManually, fetchPayment } from '@/utils/request'
import { getRelativeTime } from '@/utils/time-helpers'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

type Props = {
  user: UserWithId
  onSuccess: (user: UserWithId) => void
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
      <section className="my-4">
        {user?.status?.split(' - ')[1] === 'initial' ? (
          <>
            <p className="m-0 text-center">El usuario tiene el plan inical</p>
          </>
        ) : (
          <>
            <p className="m-0 text-center">
              Vencimiento de ultimo pago{' '}
              <span className='text-medium-blue'>
                {lastPayment?.end_date &&
                  getRelativeTime(lastPayment?.end_date)}
              </span>
            </p>
            <p className="m-0 text-center">
              Pago realizado el{' '}
              {lastPayment?.end_date && (
                <span className='text-medium-blue'>
                  {new Date(lastPayment?.end_date).toLocaleDateString()}
                </span>
              )}
            </p>
          </>
        )}
      </section>
      <footer>
        <div className="flex flex-col gap-2 ">
          <h2 className="text-xl font-bold text-center m-0">
            Validar Usuario con
          </h2>
          <div className="flex flex-row justify-around capitalize">
            <button
              onClick={() => handlerValidateUser('basic')}
              className="p-2 rounded text-white bg-main-yellow capitalize"
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
