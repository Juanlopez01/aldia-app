import Image from 'next/image'
import Star from '../svgs/star'
import Check from '../svgs/check'

const PROS_QUOTES: String[] = ['Unite a decenas de personas que confían en nosotros','Unite a decenas de personas que confían en nosotros','Te ayuda a tomar mejores decisiones financieras']

export default function Welcome({contentToShow}:{contentToShow: Boolean}) {
  return (
    <>
      <section className={`w-1/3 bg-darkest-blue text p-8 flex ${ contentToShow? 'justify-between' : '' } text-white flex-col overflow-hidden -z-10`}>
        <header className="grid gap-2">
          <h1 className="text-5xl font-black ">Bienvendo a ALDIA</h1>
          <p>La aplicación de finanzas por exelencia</p>
        </header>
        {contentToShow ? (
          <>
            <div>
              <article>
                <div className="flex mb-4">
                  <Star /> <Star /> <Star /> <Star /> <Star />
                </div>
                <p>
                  ¡Nos encantó Aldia! La uso todo el tiempo para administrar la
                  contabilidad de mi empresa.
                </p>
              </article>
              <div className="flex gap-2">
                <Image
                  src="/quote-img.webp"
                  width="40"
                  height="40"
                  alt="quote image"
                  className="rounded-full"
                />
                <div className="">
                  <h4 className="font-semibold text-sm">Devon Lane</h4>
                  <h5 className="text-xs ">CO-Founder, Desing.co</h5>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='flex flex-col gap-2 z-0'>
              {PROS_QUOTES.map((quote, index) => (
                <article key={index} className='flex flex-row  items-center gap-2'>
                    <Check/>
                    <p className='m-0'>{quote}</p>
                </article>
              ))}
            </div>
          </>
        )}
        <div className=" absolute rounded-full border-4 border-white bottom-0 left-1/4 w-1/4 h-1/3 bg-transparent"></div>
        <div className=" absolute rounded-full border-4 border-white/20 top-0 -left-[20%] w-1/4 h-1/4 bg-transparent"></div>
      </section>
    </>
  )
}