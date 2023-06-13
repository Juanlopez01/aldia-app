import { PaymentType } from '@/models/payment.model'
import { UserWithId } from '@/models/user.model'
import {
  getRelativeTime,
  calculateNextMonth,
  isAvaliablePlan
} from '@/utils/time-helpers'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
export type PlansTypes = 'free' | 'basic' | 'premium'

export const useValidatePlan = () => {
  const { data: session, status } = useSession({ required: true })
  const router = useRouter()

  const { createdAt, payments } = session?.user as unknown as UserWithId

  const [plan, setPlan] = useState<PlansTypes>('free')
  const [timeToExpire, setTimeToExpire] = useState<string>('')

  const redirectToPricing = (to?: string) => {
    router.push(`/pricing${to ? '?to=' + to : ''}`)
  }

  useEffect(() => {
    if (payments?.length && status === 'authenticated') {
      fetch(`api/personal/payments/${payments.at(-1)}`)
        .then((res) => res.json())
        .then(({ payment }) => {
          const pay = payment as PaymentType
          setPlan(pay.plan)

          // Verifico que el plan haya expirado
          if (isAvaliablePlan(pay.end_date)) return redirectToPricing(pay.plan)

          setTimeToExpire(getRelativeTime(pay.end_date))
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (!payments?.length && status === 'authenticated') {
      setPlan('free')
      const dateToExpireFreePlan = calculateNextMonth(createdAt)
      // si la diferencia es negativa es por que su plan ya venció
      if (isAvaliablePlan(dateToExpireFreePlan)) redirectToPricing('free')

      setTimeToExpire(getRelativeTime(dateToExpireFreePlan))
    }
    
  }, [createdAt, payments]) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    timeToExpire,
    plan,
    redirectToPricing,
  }
}
