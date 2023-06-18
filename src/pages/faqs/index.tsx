import Contact from '@/src-client/components/Landing/Contact'
import {
  FAQuestion,
} from '@/src-client/components/faqs/FAQuestions'
import { questions } from '@/utils/data'



export default function PageFQAs() {
  return (
    <>
      <main className=" bg-light-green dark:bg-violet-blue-landing pt-12 flex flex-col justify-center items-center w-full">
        <header className='text-center max-w-lg flex flex-col gap-2'>
          <h1 className='m-0 text-4xl font-extrabold'>¡Hola!</h1>
          <h2 className='m-0 text-xl font-bold'>¿En que podemos ayudarte?</h2>
          <p className='m-0 text-base'>
            Esta es la pagina ayuda, preguntas frecuentes o FAQs
            {`(Frequently Asked Questions en inglés)`}
          </p>
          <p className='m-0 text-base'>
            Si no encuetras una FAQ que solicione tu inconveniente, no dudes en
            enviar un Email en la seccion de &lsquo;Contáctate con
            nosotros&lsquo; y en campo de &lsquo;Asunto&lsquo; coloca el
            problema que tuviste
          </p>
        </header>
        <section className='max-w-2xl'>
          {questions.map((question, i) => (
            <FAQuestion key={i} {...question} />
          ))}
        </section>
        <footer>
          <Contact />
        </footer>
      </main>
    </>
  )
}
