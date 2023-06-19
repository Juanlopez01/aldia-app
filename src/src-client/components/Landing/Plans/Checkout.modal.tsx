import { useToggle } from '@/src-client/hooks/use-toggle'
import Modal from '@client/components/generals/Modal'
import BtnPaywithMP from './BtnPayWithMP'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQrcode } from "@fortawesome/free-solid-svg-icons"
import Link from 'next/link'
import { PlansTypes } from '@/types/models.type'

type Props = {
  name: string
  value: PlansTypes
  classBtn: string
}
export default function CheckoutModal({ classBtn, name, value }: Props) {
  const { toggle, toggleHandler } = useToggle(false)
  const router = useRouter()
  if (value === 'free') {
    const planName = name.replace('o', 'a')
    return (
      <button
        className={classBtn}
        onClick={() => {
          Swal.fire({
            title: `Suscripción ${planName}`,
            text: `Para obtener tu suscripción ${planName} simplemente debes registarte en AlDía`,
            timer: 10000,
            showCloseButton: true,
            confirmButtonText: 'Registrate',
          }).then((result) => {
            if (result.isConfirmed) router.push('/auth')
          })
        }}
      >
        Obtener suscripción {planName}
      </button>
    )
  }

  return (
    <>
      <button className={classBtn} onClick={toggleHandler}>
        Pagar suscripción {name}
      </button>
      <Modal
        title={`Paga tu suscripción ${name}`}
        showModal={toggle}
        closeModal={toggleHandler}
      >
      <section className="flex flex-row justify-around">
        <BtnPaywithMP {...{ name, value }} />
      <Link href={`/pricing/checkout/${value}`}  className="text-black no-underline bottom-2 rounded p-2 bg-main-yellow  gap-2 font-bold flex flex-row items-center">
        Otra opción <FontAwesomeIcon icon={faQrcode} className="w-8 h-8 text-black" />
      </Link>
      </section>
      </Modal>
    </>
  )
}
