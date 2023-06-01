import Spinner from '../svgs/spinner'

export default function Button({children, loading }:{children: React.ReactNode, loading?: boolean}) {
  return (<>
    <button  className="py-2 px-4 rounded bg-darkest-blue text-white w-fit text-sm flex gap-2 items-center "><span className='h-6'>{children}</span> {loading && <Spinner/>}</button>
  </>
  )
}
