import { useAppSelector } from '@hooks/use-redux'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
interface searchBarProps {
  filterType?: string[]
  title?: string
  onSubmit: (inputSearch: string, filterBy?: string) => void
  children?: React.ReactNode
}

export default function SearchBar({ onSubmit, filterType, title , children}: searchBarProps) {
  const { image } = useAppSelector(
    (s) => s.PersonalReducer.user || { image: '/UserDeault.png' }
  )

  const handlerSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const inputSearch = formData.get('search') as string
    const selectFilter = formData.get('filter') as string
    onSubmit(inputSearch, selectFilter)
  }

  return (
    <>
      <header className="h-12 m-2 rounded shadow-md w-auto flex justify-center bg-white">
        <nav className="flex flex-row justify-between items-center w-full px-2 text-gray-800">
          <h1 className="text-lg font-bold m-0">{title}</h1>
          <form
            onSubmit={handlerSearchSubmit}
            className="flex flex-row gap-2 items-center"
          >
            <fieldset className="flex flex-row items-center bg-gray-300 rounded-lg gap-2 px-2 ">
              {/*  SOLO si se envian types muestra el select */}
              {filterType && (
                <select className="bg-transparent capitalize" name="filter">
                  {filterType.map((type, i) => (
                    <option key={i} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              )}
              <input
                type="text"
                name="search"
                className="bg-transparent "
                placeholder="Buscar..."
              />
            </fieldset>
            <button>
              <FontAwesomeIcon icon={faMagnifyingGlass} className="m-auto" />
            </button>
            {children}
          </form>
          <Image
            src={image}
            width="40"
            height="40"
            alt="imagen del usuario"
            className="rounded-full"
          />
        </nav>
      </header>
    </>
  )
}
