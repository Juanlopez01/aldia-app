import Spinner from '../svgs/spinner'

export default function Button({children, loading, classes }:{children: React.ReactNode, loading?: boolean, classes?: string}) {
  return (<>
    <button  className={`py-2 px-4 rounded bg-main-green dark:bg-darkest-blue text-white w-fit text-sm flex gap-2 items-center ${classes}`}><span className='h-6'>{children}</span> {loading && <Spinner/>}</button>
  </>
  )
}
