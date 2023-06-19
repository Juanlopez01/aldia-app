import { UserWithId } from '@/models/user.model'
import { PlansTypes } from '@/types/models.type'
import { fetchPayment } from '@/utils/request'
import {
  getRelativeTime,
  calculateNextMonth,
  isAvaliablePlan,
} from '@/utils/time-helpers'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'


export const useValidatePlan = () => {
  const { data: session, status } = useSession({ required: true })
  const router = useRouter()
  const [plan, setPlan] = useState<PlansTypes>('free')
  const [timeToExpire, setTimeToExpire] = useState<string>('')

  
  const redirectToPricing = (to?: string) => {
    router.push(`/pricing${to ? `?to=${to}` : ''}`)
  }
  
  useEffect(() => {
    const user = session?.user as unknown as UserWithId
    if (
      user?.payments?.length &&
      status === 'authenticated' &&
      user.payments.length
    ) {
      const lastPayId = user.payments.at(-1)
      if (!lastPayId) return
      fetchPayment(lastPayId)
        .then(({ payment: pay }) => {
          setPlan(pay.plan)

          // Verifico que el plan haya expirado
          if (!isAvaliablePlan(pay.end_date)) return redirectToPricing(pay.plan)

          setTimeToExpire(getRelativeTime(pay.end_date))
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (!user?.payments?.length && status === 'authenticated') {
      setPlan('free')
      const dateToExpireFreePlan = calculateNextMonth(user?.createdAt)
      // si la diferencia es negativa es por que su plan ya venció
      if (!isAvaliablePlan(dateToExpireFreePlan)) redirectToPricing('free')

      setTimeToExpire(getRelativeTime(dateToExpireFreePlan))
    }
  }, [status, session]) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    timeToExpire,
    plan,
    session,
    status,
    redirectToPricing,
  }
}
