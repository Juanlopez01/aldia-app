import { PaymentType } from "@/models/payment.model"
import { UserWithId } from "@/models/user.model"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const DATE_UNITS: Record<string, number> = {
    year: 31536000,
    month: 2629800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  } as const
  
  const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' })
  const getMonthTimeDifference = (time: Date) => {
    const date = new Date(time)
    const started = new Date(date).getTime()
    const toExpire = new Date(date.setMonth(date.getMonth() + 1)).getTime()
  
    const difference = toExpire - started 
    return {
      started,
      toExpire,
      difference,
    }
  }
  export const getRelativeTime = (epochTime: Date) => {
    const { difference } = getMonthTimeDifference(epochTime)
    const elapsed = difference / 1000
  
    for (const unit in DATE_UNITS) {
      const absoluteElapsed = Math.abs(elapsed)
  
      if (absoluteElapsed > DATE_UNITS[unit] || unit === 'second') {
        return rtf.format(
          Math.round(elapsed / DATE_UNITS[unit]),
          unit as Intl.RelativeTimeFormatUnit
        )
      }
    }
  
    return ''
  }
  
export type PlansTypes = 'free' | 'basic' | 'premium'

export const useValidatePlan = () => {
    const {data: session, status}= useSession({required: true})
    const router = useRouter()
    
    const {createdAt, payments}= session?.user as unknown as UserWithId

    const [plan, setPlan] = useState<PlansTypes>('free')
    const [timeToExpire, setTimeToExpire] = useState<string>('')
    const redirectToPricing= (to?:string)=>{
        router.push('/pricing')
    }
  useEffect(() => {
    
    if (payments?.length && status ==='authenticated') {
        fetch(`api/personal/payments/${payments.at(-1)}`)
        .then((res) => res.json())
        //TODO: handle error
        .then(({ payment }) => {
          const pay = payment as PaymentType
          setPlan(pay.plan)
    
          const { difference } = getMonthTimeDifference(pay.init_date)
          // si la diferencia es negativa es por que su plan ya venció
          if (difference < 0) {
            redirectToPricing(pay.plan)
          }
          setTimeToExpire(getRelativeTime(pay.init_date))
        })
    } else if(!payments?.length && status ==='authenticated'){
        setPlan('free')
        const { difference } = getMonthTimeDifference(createdAt)
        // si la diferencia es negativa es por que su plan ya venció
        if (difference < 0) {
          console.log('aaaaaaa')
          redirectToPricing('free')
      }
        setTimeToExpire(getRelativeTime(createdAt))
    }
  }, [createdAt, payments])// eslint-disable-line react-hooks/exhaustive-deps

  return {
    timeToExpire,
    plan,
    redirectToPricing,
  }
}