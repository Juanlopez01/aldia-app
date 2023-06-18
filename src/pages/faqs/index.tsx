import Contact from '@/src-client/components/Landing/Contact'
import {
  FAQuestion,
  QuestionType,
} from '@/src-client/components/faqs/FAQuestions'

const questions: QuestionType[] = [
  {
    question: '¿Has realizado un pago y no tienes el plan que pagaste?',
    solution:
      'La verificación del pago puede demorar alguno minutos o hasta horas, pero si ha pasado mas de 1 día comumnicate via email o whatsapp para agilizar la activación de tu plan',
    extra: 'Whatsapp: +53 123 345 1231235',
  },
  {
    question: '¿Has realizado un pago y no tienes el plan que pagaste?',
    solution:
      'La verificación del pago puede demorar alguno minutos o hasta horas, pero si ha pasado mas de 1 día comumnicate via email o whatsapp para agilizar la activación de tu plan',
    extra: 'Whatsapp: +53 123 345 1231235',
  },
  {
    question: '¿Has realizado un pago y no tienes el plan que pagaste?',
    solution:
      'La verificación del pago puede demorar alguno minutos o hasta horas, pero si ha pasado mas de 1 día comumnicate via email o whatsapp para agilizar la activación de tu plan',
    extra: 'Whatsapp: +53 123 345 1231235',
  },
  {
    question: '¿Has realizado un pago y no tienes el plan que pagaste?',
    solution:
      'La verificación del pago puede demorar alguno minutos o hasta horas, pero si ha pasado mas de 1 día comumnicate via email o whatsapp para agilizar la activación de tu plan',
    extra: 'Whatsapp: +53 123 345 1231235',
  },
]

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
            Si no encuetras una FAQ que solicione tu unconveniente, no dudes en
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
