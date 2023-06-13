import { UserWithId } from '@/models/user.model'
import SearchBar from '@components/generals/SeachBar'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import AdminModal from './AdminModal'

const FILTER_TYPES = ['email', 'nombre']
interface RequestUser {
  success: boolean
  currentPage: number
  count: number
  users: UserWithId[]
}

const requetsUsers = async (): Promise<RequestUser> => {
  const users = await fetch('/api/admin/users').then((res) => {
    if (!res.ok) throw new Error(`Error: ${res.status}`)
    return res.json()
  })
  return users as RequestUser
}

export default function AdminTable  ()  {
  const [users, setUSers] = useState<UserWithId[]>([])

  useEffect(() => {
    if (!users.length) {
      console.log('requested users');
      requetsUsers().then((users) => {
        setUSers(users.users)
      })
    }
  }, [])// eslint-disable-line

  const onSubmit = (inputSearch: string, filterBy?: string) => {
    console.log('INPUT:', inputSearch)
    console.log('FILTER:', filterBy)
  }
  return (
    <>
      <section className="w-full">
        <SearchBar
          filterType={FILTER_TYPES}
          onSubmit={onSubmit}
          title="User List"
        />
        <section className='mx-2 rounded-md shadow overflow-hidden'>
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr className='[&>th]:p-2'>
                <th className='w-10' >Imagen</th>
                <th >Nombre</th>
                <th >Email</th>
                <th >Status</th>
                <th >Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user, i) =>(<>
                <tr key={i} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                  <th><Image src={user.image} alt='imagen del usuario' width='40' height='40' className='rounded-full m-auto' /></th>
                  <th>{user.fullName}</th>
                  <th>{user.email}</th>
                  <th>{user.status}</th>
                  <th>
                    <AdminModal user={user} />
                  </th>
                </tr> 
                </>
                ))
              }
            </tbody>
          </table>
        </section>
      </section>
    </>
  )
}
