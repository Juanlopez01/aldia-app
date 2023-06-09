import { faEnvelope, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PaymentType } from '@/models/payment.model'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
type Props = {
  createdAt: Date
  payments?: Array<PaymentType>
}

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


const useValidatePlan = ({ createdAt, payments }: Props) => {
    const router = useRouter()
    const [plan, setPlan] = useState<'free' | 'basic' | 'premium'>('free')
    const [timeToExpire, setTimeToExpire] = useState<string>()

    const redirectToPricing= (to?:string)=>{
        router.push('/pricing')
    }
  useEffect(() => {
    if (!payments?.length) {
      setPlan('free')
      const { difference } = getMonthTimeDifference(createdAt)
      // si la diferencia es negativa es por que su plan ya venció
      if (difference < 0) {
        console.log('aaaaaaa')
        redirectToPricing('free')
    }
      setTimeToExpire(getRelativeTime(createdAt))
    } else {
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
    }
  }, [createdAt, payments])// eslint-disable-line react-hooks/exhaustive-deps

  return {
    timeToExpire,
    plan,
    redirectToPricing,
  }
}
const plansDicctionary = {
  free: 'Plan gratis',
  basic: 'Plan basico',
  premium: 'Plan premium',
}

export default function UserPlan({ createdAt, payments }: Props) {
  const {  plan, timeToExpire } = useValidatePlan({
    createdAt,
    payments,
  })
  return (
    <>
      <div className="text-main-yellow flex items-center justify-between w-full">
        <div className="flex items-center gap-1 text-md">
          <FontAwesomeIcon icon={faEnvelope} />
          <span className="ml-1">Estado de plan</span>
          <Link href="/pricing">
            <FontAwesomeIcon
              icon={faPencil}
              className="text-white hover:cursor-pointer"
            />
          </Link>
        </div>
      </div>
      <p className="text-white mt-2 text-md">
        {plansDicctionary[plan]}{' '}
        <span className="text-gray-950/40">{`vence ${timeToExpire}`}</span>
      </p>
      <hr className="border-main-yellow border-2"></hr>
    </>
  )
}
