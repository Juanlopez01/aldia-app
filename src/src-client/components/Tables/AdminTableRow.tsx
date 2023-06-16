import { UserWithId } from '@/models/user.model'
import Image from 'next/image'
import AdminModal from './AdminModal'
import { useEffect, useState } from 'react'
import { PlansTypes } from '@hooks/use-validate-plan'

const STATUS_DIC = {
  pending: 'Pendiente',
  active: 'Activo',
}

const PLANS_DIC = {
  free: 'Gratis',
  basic: 'Básico',
  premium: 'Premium',
}
const PROVIDERS_DIC = {
  manual: 'Manual',
  MP: 'Mercado Pago',
  initial: 'Inicial',
}

type Props = {
  user: UserWithId
  flag: number
}

export default function AdminTableRow({ user: userProp }: Props) {
  const [user, setUser] = useState<UserWithId>(userProp)
  const handlerChangeUser = (user: UserWithId) => {
    setUser(user)
  }

  useEffect(() => {
    setUser(userProp)
  }, [userProp])

  const [status, provider, plan] = user.status.split(' - ') as [
    'pending' | 'active',
    'MP' | 'manual' | 'initial',
    PlansTypes
  ]

  return (
    <>
      <tr
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 [&>th]:hover:bg-gray-200 
        [&>th]:px-2
        "
      >
        <th className="py-1">
          <Image
            src={user.image}
            alt="imagen del usuario"
            width="40"
            height="40"
            className="rounded-full m-auto"
          />
        </th>
        <th>{user.fullName ? user.fullName : "Sin nombre"}</th>
        <th>{user.email}</th>

        <th className="text-center"><span className={`${status==="active" ? "bg-[#28a745]" : "bg-[#dc3545]"} py-2 px-3 rounded-full text-white w-full`}>{STATUS_DIC[status]}</span></th>
        <th className="capitalize">{PLANS_DIC[plan]}</th>
        <th className="text-center">{PROVIDERS_DIC[provider]}</th>
        {/* <th className='text-center'>{PROVIDERS_DIC.MP}</th> */}

        <th>
          <AdminModal user={user} onSuccess={handlerChangeUser} />
        </th>
      </tr>
    </>
  )
}
