import { UserWithId } from '@/models/user.model'
import SearchBar from '@components/generals/SeachBar'
import { useEffect,  useState } from 'react'
import { requestAdminUsers } from '@/utils/request'
import AdminTableRow from './AdminTableRow'
import { PendingIcon } from '@components/svgs/pending'

const FILTER_TYPES = ['email', 'nombre']
interface RequestUser {
  success: boolean
  currentPage: number
  totalPages: number
  count: number
  users: UserWithId[]
}

export default function AdminTable() {
  const [users, setUSers] = useState<UserWithId[]>([])
  const [totalPages, setTotalPages] = useState<number>(0)
  const [filters , setFilters] = useState({
    search:'',
    by:'',
    pending: false,
    page:1
  })
  const handlerUsers = (path = '', config: RequestInit = {}) => {
    requestAdminUsers<RequestUser>(path, config).then((data) => {
      setUSers(data.users)
      setTotalPages(data.totalPages)
    })
  }
  useEffect(() => {
    if (!users.length) {
      handlerUsers()
    }
  }, []) // eslint-disable-line
  const handlerClickPage =(page:number)=>{
    const {search, by}= filters
    const setQuery = search && by ? `&${by}=${search}`: '' 
    handlerUsers(`?page=${page}${setQuery}`)
  }

  const handlerClickPending = ()=>{
    setFilters({...filters, pending: !filters.pending})
  }
  const onSubmit = (inputSearch: string, filterBy?: string  ) => {
    setFilters({...filters, search: inputSearch, by: filterBy || 'name', page:1})
    handlerUsers(`?${filterBy}=${inputSearch}`)
  }
  return (
    <>
      <section className="w-full">
        <SearchBar
          filterType={FILTER_TYPES}
          onSubmit={onSubmit}
          title="User List"
        >
          <button
          type='button'
          title='Usuarios pendientes de activar'
          onClick={handlerClickPending}
          >
            <PendingIcon className={`w-5 h-5 ${filters.pending && 'fill-medium-blue'}`} />
          </button>
        </SearchBar>
        <section>
          {
            new Array(totalPages).fill(0).map((_, i)=>{
              const page = i + 1
              return(
                <button 
                onClick={() => handlerClickPage(page)}
                key={i}
                >
                  {page}
                </button>
              )
            })
          }
        </section>
        <section className="mx-2 rounded-md shadow overflow-hidden">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="[&>th]:p-2">
                <th className="w-10">Imagen</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Status</th>
                <th>Plan</th>
                <th>Provider</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <>
                  <AdminTableRow user={user} key={i} />
                </>
              ))}
            </tbody>
          </table>
        </section>
      </section>
    </>
  )
}
