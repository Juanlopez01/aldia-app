import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export type PageHanlderPropType =  number | 'prev' | 'next'

export default function Pagination({
  currentPage,
  pages,
  handleClick,
}: {
  pages: number
  currentPage: number
  handleClick: (page:PageHanlderPropType) => void
}) {
  return (
    <section>
      <button onClick={() => handleClick('prev')}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      {new Array(pages).fill(0).map((_, i) => {
        const page = i + 1
        return (
          <button onClick={() => handleClick(page)} key={i}>
            {page}
          </button>
        )
      })}
      <button onClick={() => handleClick('next')}>
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </section>
  )
}
