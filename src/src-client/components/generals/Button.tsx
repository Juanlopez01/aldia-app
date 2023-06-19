import Spinner from '../svgs/spinner'

export default function Button({children, loading, classes, onClick }:{children: React.ReactNode, loading?: boolean, classes?: string , onClick?: ()=> void}) {
  return (<>
    <button  onClick={onClick} className={`py-2 px-4 rounded bg-main-green dark:bg-darkest-blue text-white w-fit text-sm flex gap-2 items-center ${classes}`}><span className='h-6'>{children}</span> {loading && <Spinner/>}</button>
  </>
  )
}
