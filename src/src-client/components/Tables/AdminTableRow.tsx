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
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
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
        <th>
          <AdminModal user={user} />
        </th>
      </tr>
    </>
  )
}
