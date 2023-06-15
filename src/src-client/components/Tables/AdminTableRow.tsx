import { UserWithId } from "@/models/user.model"
import Image from 'next/image'
import AdminModal from "./AdminModal"
import { useState } from "react"

type Props = {
    user: UserWithId
}
export default function AdminTableRow({user:userProp}:Props) {
  const [user, setUser]=useState<UserWithId>(userProp)
  const handlerChangeUser = (user:UserWithId)=>{
setUser(user)
  }
    const [status, provider, plan]=user.status.split(' - ')
  return (
    <>
      <tr
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 [&>th]:hover:bg-gray-200 
        [&>th]:px-2 
        "
      >
        <th>
          <Image
            src={user.image}
            alt="imagen del usuario"
            width="40"
            height="40"
            className="rounded-full m-auto"
          />
        </th>
        <th>{user.fullName}</th>
        <th>{user.email}</th>
        <th>{status}</th>
        <th>{plan}</th>
        <th>{provider}</th>
        <th>
          <AdminModal user={user} onSuccess={handlerChangeUser} />
        </th>
      </tr>
    </>
  )
}
