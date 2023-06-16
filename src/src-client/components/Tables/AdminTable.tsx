import { UserWithId } from '@/models/user.model'
import SearchBar from '@components/generals/SeachBar'
import { useEffect, useState } from 'react'
import { requestAdminUsers } from '@/utils/request'
import AdminTableRow from './AdminTableRow'
import { PendingIcon } from '@components/svgs/pending'
import Pagination, {
  PageHanlderPropType,
} from '@components/generals/Pagination'
import { faRepeat } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FILTER_TYPES = ['email', 'name']
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
}
const initalPages = {
  currentPage:1,
  totalPages: 1,
}

const stylesTH =
'px-6 pl-2  font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none border-b-solid tracking-none whitespace-nowrap text-sm text-slate-400 opacity-70 dark:text-black'


export default function AdminTable() {
  const [users, setUSers] = useState<UserWithId[]>([])
  const [pages, setPages] = useState(initalPages)
  const [filters, setFilters] = useState(filtersInitalState)
  const handlerUsers = (path = '', config: RequestInit = {}) => {
    requestAdminUsers<RequestUser>(path, config).then(({users, totalPages, currentPage}) => {
      setUSers(users)
      setPages({totalPages, currentPage})
    })
  }
  const resetUsers = () => {
    setFilters(filtersInitalState)
    handlerUsers()
  }
  useEffect(() => {
    if (!users.length) {
      handlerUsers()
    }
  }, []) // eslint-disable-line


  const handlerClickPage = (pageEvent: PageHanlderPropType) => {
    const { search, by, pending } = filters
    const {currentPage,totalPages}= pages
    const setQuery = search && by ? `&${by}=${search}` : ''
    const setPend = pending ? `&pending=${pending}` : ''

    if (pageEvent === 'next'){
      if (currentPage  === totalPages)return
      handlerUsers(`?page=${currentPage + 1}${setQuery}${setPend}`)}
    else if (pageEvent === 'prev'){
      if (currentPage <= 1) return
      handlerUsers(`?page=${currentPage - 1}${setQuery}${setPend}`)}
    else handlerUsers(`?page=${pageEvent}${setQuery}${setPend}`)
  }

  const handlerClickPending = () => {
    setFilters({ ...filters, pending: !filters.pending })
    const { search, by, pending } = filters
    const setQuery = search && by ? `&${by}=${search}` : ''
    handlerUsers(`?pending=${!pending}${setQuery}`)
  }

  const onSubmit = (inputSearch: string, filterBy?: string) => {
    setFilters({
      ...filters,
      search: inputSearch,
      by: filterBy || 'name'
    })
    handlerUsers(`?${filterBy}=${inputSearch}`)
  }

  return (
    <>
      <section className="min-h-[75vh] w-full bg-light-green dark:bg-violet-blue-landing px-2 pt-8 ">
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
        <Pagination pages={pages.totalPages} currentPage={pages.currentPage} handleClick={handlerClickPage} />
        <section className="mx-2 rounded-md shadow overflow-x-auto mt-2">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
            <thead
              className="text-xs text-gray-700 uppercase 
            dark:text-gray-400 border-b-[1px] border-b-gray-300 dark:border-b-gray-100 bg-white"
            >
              <tr className="[&>th]:px-2">
                <th className={`w-[60px] py-2 px-6 pl-2 ${stylesTH}`}>
                  Imagen
                </th>
                <th className={`py-3 ${stylesTH}`}>Nombre</th>
                <th className={`py-3 ${stylesTH}`}>Email</th>
                <th className={`text-center py-3 ${stylesTH}`}>
                  Estado
                </th>
                <th className={`text-center py-3 ${stylesTH}`}>
                  Plan
                </th>
                <th className={`text-center py-3 ${stylesTH}`}>
                  Provider
                </th>
                <th className={`text-center py-3 ${stylesTH}`}>
                  Acciones
                </th>
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
