import Image from 'next/image'
import Star from '../svgs/star'
import Check from '../svgs/check'
import DarkMode from '../Navbar/DarkMode'

const PROS_QUOTES: String[] = ['Unite a decenas de personas que confían en nosotros','Unite a decenas de personas que confían en nosotros','Te ayuda a tomar mejores decisiones financieras']

export default function Welcome({contentToShow}:{contentToShow: Boolean}) {
  return (
    <>
      <section className={`w-full md:w-8/12 lg:w-1/2 xl:w-1/3 bg-main-green dark:bg-darkest-blue text p-8 ${ contentToShow? 'justify-between' : '' } text-white flex-col overflow-hidden md:py-16 relative z-[100] hidden md:flex`}>
        <header className="grid gap-2 pb-4">
          <h1 className="text-4xl md:text-5xl font-black ">Bienvendo a ALDIA</h1>
          <p>La aplicación de finanzas por excelencia</p>
          <DarkMode/>
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
        <div className=" absolute rounded-full border-4 border-white -bottom-1/3 left-2/3 w-3/4 h-1/2 bg-transparent"></div>
        <div className=" absolute rounded-full border-4 border-white/20 -top-[20%] -left-1/2 w-2/3 h-1/3 bg-transparent"></div>
      </section>
    </>
  )
}
