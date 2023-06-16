import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export type PageHanlderPropType = number | 'prev' | 'next'

export default function Pagination({
  currentPage,
  pages,
  handleClick,
}: {
  pages: number
  currentPage: number
  handleClick: (page: PageHanlderPropType) => void
}) {
  if(pages <=1){
    return (
      <section className=" min-h-8"></section>
    )
  }
  return (
    <section className=" min-h-8 flex flex-row justify-center items-center gap-2">
      <button
        className={`w-8 h-8  font-semibold border-[1px] rounded-sm text-center ${
          currentPage === 1
            ? 'bg-gray-400 border-gray-400 text-gray-300'
            : 'bg-white border-gray-200'
        }`}
        onClick={() => handleClick('prev')}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      {new Array(pages).fill(0).map((_, i) => {
        const page = i + 1
        return (
          <button
            className={`w-8 h-8 bg-white font-semibold border-[1px] rounded-sm text-center ${
              page === currentPage
                ? ' border-main-green text-main-green dark:border-medium-blue dark:text-medium-blue'
                : 'border-gray-200'
            }`}
            onClick={() => handleClick(page)}
            key={i}
          >
            {page}
          </button>
        )
      })}
      <button
        className={`w-8 h-8  font-semibold border-[1px] rounded-sm text-center ${
          currentPage === pages
            ? 'bg-gray-400 border-gray-400 text-gray-300'
            : 'bg-white border-gray-200'
        }`}
        onClick={() => handleClick('next')}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </section>
  )
}
