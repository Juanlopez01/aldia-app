import { useToggle } from "@/src-client/hooks/use-toggle"
import { PlansTypes } from "@/src-client/hooks/use-validate-plan"
import Modal from "@client/components/generals/Modal"
import BtnPaywithMP from "./BtnPayWithMP"
import Swal from "sweetalert2"
import { useRouter } from "next/router"

type Props = {
    name: string,
    value: PlansTypes
classBtn: string
}
export default function CheckoutModal({classBtn,name,value}:Props) {
    const { toggle, toggleHandler } = useToggle(false)
    const router = useRouter()
if (value === 'free'){
    const planName= name.replace('o','a')
    return <button className={classBtn} onClick={()=>{
        Swal.fire({
            title:`Suscripción ${planName}`,
            text: `Para obtener tu suscripción ${planName} simplemente debes registarte en AlDía`,
            timer: 10000,
            showCloseButton:true,
            confirmButtonText: 'Registrate',
        }).then(result => {
            if(result.isConfirmed) router.push('/auth')
        })
    }}>
        Obtener suscripción {planName}
    </button>

}

  return (
    <>
    <button className={classBtn} onClick={toggleHandler}>
        Pagar suscripción {name}
    </button>
    <Modal title={`Paga tu suscripción ${name}`}  showModal={toggle} closeModal={toggleHandler} >
        <BtnPaywithMP {...{name, value}}/>
    </Modal>
    </>
  )
}
