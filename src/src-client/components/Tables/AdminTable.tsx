import { UserWithId } from '@/models/user.model'
import SearchBar from '@components/generals/SeachBar'
import { useEffect, useState } from 'react'
import { requestAdminUsers } from '@/utils/request'
import AdminTableRow from './AdminTableRow'


const FILTER_TYPES = ['email', 'nombre']
interface RequestUser {
  success: boolean
  currentPage: number
  count: number
  users: UserWithId[]
}


export default function AdminTable() {
  const [users, setUSers] = useState<UserWithId[]>([])

  useEffect(() => {
    if (!users.length) {
      console.log('requested users')
      requestAdminUsers<RequestUser>().then((users) => {
        setUSers(users.users)
      })
    }
  }, []) // eslint-disable-line

  const onSubmit = (inputSearch: string, filterBy?: string) => {
    console.log('INPUT:', inputSearch)
    console.log('FILTER:', filterBy)
  }

  const stylesTH= "font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none border-b-solid tracking-none whitespace-nowrap text-sm text-slate-400 opacity-70 dark:text-black"

  return (
    <>
      <section className="min-h-[75vh] w-full bg-light-green dark:bg-violet-blue-landing px-2 pt-8">
        <SearchBar
          filterType={FILTER_TYPES}
          onSubmit={onSubmit}
          title="Lista de usuarios"
        />
        <section className="mx-2 rounded-md shadow overflow-x-auto mt-4">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase 
            dark:text-gray-400 border-b-[1px] border-b-gray-300 dark:border-b-gray-100 bg-white">
              <tr className="[&>th]:px-2">
                <th className={`w-[60px] py-2 px-6 pl-2 ${stylesTH}`}>Imagen</th>
                <th className={`py-3 px-6 pl-2 ${stylesTH}`}>Nombre</th>
                <th className={`py-3 px-6 pl-2 ${stylesTH}`}>Email</th>
                <th className={`py-3 px-6 pl-2 ${stylesTH}`}>Estado</th>
                <th className={`py-3 px-6 pl-2 ${stylesTH}`}>Plan</th>
                <th className={`py-3 px-6 pl-2 ${stylesTH}`}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <>
                  <AdminTableRow user={user} key={i}/>
                </>
              ))}
            </tbody>
          </table>
        </section>
      </section>
    </>
  )
}
