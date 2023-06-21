import Image from 'next/image'
import React from 'react'
import QrSvg from '@public/svgs/qr.svg'
import { useRouter } from 'next/router'
import NotifyBtn from '@components/checkout/NotifyBtn'

const PLANS = {
  basic: {
    name: 'Básico',
    price: 10,
  },
  premium: {
    name: 'Premium',
    price: 100,
  },
}

export default function Checkout() {
  const router = useRouter()
  const { plan } = router.query as { plan: keyof typeof PLANS }
  if(PLANS[plan] === undefined) {
    router.push('/pricing')
    return null
  }
  
  return (
    <>
      <main className="flex justify-center bg-light-green dark:bg-violet-blue-landing py-16">
        <ul className="flex flex-wrap gap-8 justify-center m-0 p-0 flex-grow px-4 my-4">
          {/* 1. pay your subscription */}
          <li className="max-w-[450px] flex flex-col items-start justify-between shadow-plan py-6 px-8 rounded-lg">
            <article className="[&>p]:m-0 mt-2 flex flex-col justify-around">
              <header className="">
                <h2 className="text-3xl font-bold my-4 drop-shadow-xl text-center">
                  <span className="text-main-green dark:text-medium-blue mr-2">01.</span> Paga tu
                  suscripción
                </h2>
              </header>
              <p>
                Realiza tu pago escaneando el codigo QR o haciendo un deposito
                al siguiente CVU con el motivo &quot;Suscripción a AlDía nivel{' '}
                {PLANS[plan].name}&quot; con un monto de {PLANS[plan].price}{' '}
                soles.
              </p>
            </article>
            <p className='font-bold'>CVU: alskdnoalds-asidnoasld-asd1901292os</p>
            <figure className="mt-3">
              <Image
                src={QrSvg}
                alt="QR to pay suscription"
                height="300"
                width="300"
              />
            </figure>
          </li>

          {/* 2. notification */}
          <li className="max-w-[450px] flex flex-col items-start justify-between shadow-plan py-6 px-8 rounded-lg">
            <article className="[&>p]:m-0 mt-2 flex flex-col justify-around">
              <header className="">
                <h2 className="text-3xl font-bold m-0 my-4 drop-shadow-xl text-center">
                  <span className="text-main-green dark:text-medium-blue mr-2">02.</span>
                  Envía una notificación
                </h2>
              </header>
              <p>
                Envia el comprobante de pago al siguiente Whatsapp con tu email
                de la cuenta que tienes del aldía.
              </p>
            </article>

            <footer>
              <p className='font-bold mt-3'>Whatsapp: +69 1313 040613.</p>
            </footer>

            <figure className="flex pt-4">
              <Image
                src="/wpp-image.png"
                alt="QR to pay suscription"
                height="350"
                width="350"
              />
            </figure>
          </li>

          {/* 3. espera */}
          <li className="max-w-[600px] flex flex-col items-start justify-between shadow-plan py-6 px-8 rounded-lg">
            <article className="mt-2 [&>p]:m-0 flex flex-col justify-around">
              <header className="">
                <h2 className="text-3xl font-bold m-0 my-4 text-center">
                  <span className="text-main-green dark:text-medium-blue mr-2 mb-2 drop-shadow-xl">03.</span>
                  Espera
                </h2>
              </header>
              <p>
                Un vez realizado los pasos anteriores, tu pago será procesado,
                tu cuenta será activada y podras disfrutar de todos los
                beneficios del plan que seleccionaste.
              </p>
              <p>
                Dale click al siguiente boton 1 vez para notificar al
                administrador que realizaste el pago.
              </p>
              <footer className='grid max-w-[250px] mt-4'>
                <NotifyBtn plan={plan} />
              </footer>
            </article>
            <figure className="mt-4">
              <Image
                src="/ilustration-wait.jpg"
                alt="QR to pay suscription"
                height="300"
                width="300"
              />
            </figure>
          </li>
        </ul>
      </main>
    </>
  )
}
