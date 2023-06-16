import { UserWithId } from '@/models/user.model'
import SearchBar from '@components/generals/SeachBar'
import { useEffect, useState } from 'react'
import { requestAdminUsers } from '@/utils/request'
import AdminTableRow from './AdminTableRow'
import { PendingIcon } from '@components/svgs/pending'
import Pagination from '@components/generals/Pagination'
import { faRepeat } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FILTER_TYPES = ['email', 'nombre']
interface RequestUser {
  success: boolean
  currentPage: number
  totalPages: number
  count: number
  users: UserWithId[]
}
const filtersInitalState = {
  search: '',
  by: '',
  pending: false,
  page: 1,
}

export default function AdminTable() {
  const [users, setUSers] = useState<UserWithId[]>([])
  const [totalPages, setTotalPages] = useState<number>(0)
  const [filters, setFilters] = useState(filtersInitalState)
  const handlerUsers = (path = '', config: RequestInit = {}) => {
    requestAdminUsers<RequestUser>(path, config).then((data) => {
      setUSers(data.users)
      setTotalPages(data.totalPages)
    })
  }

  const resetUsers = () => {
    handlerUsers()
  }
  useEffect(() => {
    if (!users.length) {
      handlerUsers()
    }
  }, []) // eslint-disable-line
  const handlerClickPage = (page: number) => {
    const { search, by, pending } = filters
    const setQuery = search && by ? `&${by}=${search}` : ''
    const setPend = pending ? `&pending=${pending}` : ''
    handlerUsers(`?page=${page}${setQuery}${setPend}`)
  }

  const handlerClickPending = () => {
    setFilters({ ...filters, pending: !filters.pending, page: 1 })
    const { search, by, pending } = filters
    const setQuery = search && by ? `&${by}=${search}` : ''
    handlerUsers(`?pending=${!pending}${setQuery}`)
  }

  const onSubmit = (inputSearch: string, filterBy?: string) => {
    setFilters({
      ...filters,
      search: inputSearch,
      by: filterBy || 'name',
      page: 1,
    })
    handlerUsers(`?${filterBy}=${inputSearch}`)
  }

  const stylesTH= "font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none border-b-solid tracking-none whitespace-nowrap text-sm text-slate-400 opacity-70 dark:text-black"

  return (
    <>
      <section className="min-h-[75vh] w-full bg-light-green dark:bg-violet-blue-landing px-2 pt-8">
        <SearchBar
          filterType={FILTER_TYPES}
          onSubmit={onSubmit}
          title="Lista de usuarios"
        >
                <button
            type="button"
            title="Usuarios pendientes de activar"
            onClick={handlerClickPending}
          >
            <PendingIcon
              className={`w-5 h-5 ${filters.pending && 'fill-medium-blue'}`}
            />
          </button>
          <button type="reset" title="Limpiar filtros" onClick={resetUsers}>
            <FontAwesomeIcon icon={faRepeat} className="" />
          </button>
        </SearchBar>
        <Pagination pages={totalPages} handleClick={handlerClickPage} />
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
                <th className={`py-3 px-6 pl-2 ${stylesTH}`}>Provider</th>
                <th className={`py-3 px-6 pl-2 ${stylesTH}`}>Acciones</th>

              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <>
                  <AdminTableRow user={user} key={i} flag={totalPages} />
                </>
              ))}
            </tbody>
          </table>
        </section>
      </section>
    </>
  )
}
