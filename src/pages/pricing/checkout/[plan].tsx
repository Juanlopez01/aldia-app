import Image from 'next/image'
import React from 'react'
import QrSvg from '@public/svgs/qr.svg'
import { useRouter } from 'next/router'

const PLANS = {
  basic: {
    name: 'Básico',
    price: 10,
  },
  premium: {
    name: 'Premium',
    price: 20,
  },
}

export default function Checkout() {
  const router = useRouter()
  const { plan } = router.query as { plan: keyof typeof PLANS }
  return (
    <>
      <main className="flex justify-center">
        <ul className="max-w-4xl m-0 p-0 flex-grow px-4 my-4">
          <li className="flex flex-row w-full justify-between ">
            <article className="w-1/2 [&>p]:m-0 flex flex-col justify-around">
              <header className="">
                <h1 className="text-4xl font-bold m-0 ">
                  <span className="text-medium-blue mr-2">1.</span> Paga tu
                  sucripción
                </h1>
              </header>
              <p>
                Realiza tu pago escaneando el codigo qr o haciendo un deposito
                al siguiente CVU con el motivo &quot;Suscripción a AlDía nivel{' '}
                {PLANS[plan].name}&quot; con un monto de {PLANS[plan].price}{' '}
                soles
              </p>
              <p>CVU: alskdnoalds-asidnoasld-asd1901292os</p>
            </article>
            <figure className="flex justify-center items-center m-auto">
              <Image
                src={QrSvg}
                alt="QR to pay suscription"
                height="400"
                width="400"
              />
            </figure>
          </li>
          <li className="flex flex-row-reverse w-full justify-between mt-4">
            <article className="w-1/2 [&>p]:m-0 flex flex-col justify-around">
              <header className="">
                <h1 className="text-4xl font-bold m-0 ">
                  <span className="text-medium-blue mr-2">2.</span>
                  Envía un notificación
                </h1>
              </header>
              <p>
                Envia el comprobante de pago al siguiente Whatsapp con tu email
                de la cuenta que tienes del aldía
              </p>
              <footer>whatsapp: +69 1313 040613</footer>
            </article>
            <figure className="flex justify-center items-center m-auto">
              <Image
                src="/wpp-image.png"
                alt="QR to pay suscription"
                height="400"
                width="400"
              />
            </figure>
          </li>
          <li className="flex flex-row w-full justify-between mt-4">
            <article className="w-1/2 [&>p]:m-0 flex flex-col justify-around">
              <header className="">
                <h1 className="text-4xl font-bold m-0 ">
                  <span className="text-medium-blue mr-2">3.</span>
                  Espera
                </h1>
              </header>
              <p>
                Un vez realizado los pasos anteriores, tu pago será procesado,
                tu cuenta será activada y podras disfrutar de todos los
                beneficios del plan que seleccionaste
              </p>
              <p>
                Dale click al siguiente boton 1 vez para notificar al
                administrador que realizaste el pago
              </p>
              <footer>
                <button>Notificar al administrador</button>
              </footer>
            </article>
            <figure className="flex justify-center items-center m-auto">
              <Image
                src="/ilustration-wait.jpg"
                alt="QR to pay suscription"
                height="400"
                width="400"
              />
            </figure>
          </li>
        </ul>
      </main>
    </>
  )
}
