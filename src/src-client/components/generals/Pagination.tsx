export default function Pagination({
  pages,
  handleClick,
}: {
  pages: number
  handleClick: (page: number) => void
}) {
  return (
    <section>
      {new Array(pages).fill(0).map((_, i) => {
        const page = i + 1
        return (
          <button onClick={() => handleClick(page)} key={i}>
            {page}
          </button>
        )
      })}
    </section>
  )
}
