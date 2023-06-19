import { useToggle } from '@/src-client/hooks/use-toggle'
import { QuestionType } from '@/types/general.types'

export const FAQuestion = ({ question, solution, extra }: QuestionType) => {
  const { toggle, toggleHandler } = useToggle(false)
  return (
    <>
      <article className='text-center m-2 shadow shadow-darkest-blue p-4 flex flex-col gap-2 w-full'>
        <button onClick={toggleHandler}>
          <h3 className='text-medium-blue text-xl font-semibold text-center m-0'>{question}</h3>
        </button>
        {toggle && (
          <>
            <p>{solution}</p>
            {extra && <footer>{extra}</footer>}
          </>
        )}
      </article>
    </>
  )
}
