import { UserWithId } from "@/models/user.model"
import Image from 'next/image'
import AdminModal from "./AdminModal"

type Props = {
    user: UserWithId
}
export default function AdminTableRow({user}:Props) {
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
        <th>
          <span className={`${status==="active" ? "bg-[#28a745]" : "bg-[#dc3545]"} py-2 px-3 rounded-full text-white w-full`}>{status==="active" ? "Activo" : "Inactivo"}</span>
        </th>
        <th className="capitalize">{plan}</th>
        <th>
          <AdminModal user={user} />
        </th>
      </tr>
    </>
  )
}
