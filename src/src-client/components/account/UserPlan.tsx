import { faEnvelope, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useValidatePlan } from '@hooks/use-validate-plan'

const plansDicctionary = {
  free: 'Plan gratis',
  basic: 'Plan basico',
  premium: 'Plan premium',
}

export default function UserPlan() {
  const {  plan, timeToExpire, redirectToPricing } = useValidatePlan()
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
              onClick={()=>redirectToPricing('edit')}
            />
          </Link>
        </div>
      </div>
      <p className="text-white mt-2 text-md">
        {plansDicctionary[plan]}{' '}
        <span className="text-darkest-blue/40">{`vence ${timeToExpire}`}</span>
      </p>
      <hr className="border-main-yellow border-2"></hr>
    </>
  )
}
