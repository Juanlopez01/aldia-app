import { UserWithId } from "@/models/user.model"
import { PlansTypes } from "@hooks/use-validate-plan"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Swal from "sweetalert2"
import MercadoPagoLogo from "@components/svgs/mp-logo"

export default function BtnPaywithMP ({value }: {value: PlansTypes; children?: React.ReactNode; }){
    const { data: session, status } = useSession()
  const router = useRouter()
  const handlerClickPlan = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.target as HTMLButtonElement
    if (status !== 'authenticated') {
      router.push('/auth')
      return
    }
    const { _id: userId, email } = session?.user as unknown as UserWithId
    try {
      const res = await fetch('/api/payments/mercado-pago', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: value,
          userId,
          email,
        }),
      }).then((data) => data.json())
      router.push(res.redirection_url)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error al internar realizar el pago, intentelo más tarde',
      })
    }
  }
    return (
      <button value={value} onClick={handlerClickPlan} className="text-white bottom-2 rounded p-2 bg-medium-blue flex gap-2">
        Mercado Pago<MercadoPagoLogo className="w-8 h-8 "/>
      </button>
    )
  }