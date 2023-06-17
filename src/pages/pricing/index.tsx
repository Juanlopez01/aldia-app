import { PlansTypes } from '@hooks/use-validate-plan'
import Plans from '@components/Landing/Plans/Plans'
import { useSearchParams } from 'next/navigation'
import Swal from 'sweetalert2'

type ToType = null | PlansTypes | 'edit'
const showAlert = (to: ToType) => {
  if (to != null) {
    switch (to) {
      case 'edit':
        Swal.fire({
          icon: 'question',
          title: '¿Quieres editar tu plan actual?',
          text: 'Elije uno de los siguientes planes para seguir navegando en AlDía',
          timer: 10000,
        })
        break
      case 'free':
        Swal.fire({
          icon: 'warning',
          title: 'Tu plan gratuito se ha terminado',
          text: 'Elije uno de los siguientes planes para seguir navegando en AlDía',
          timer: 10000,
        })
        break
      case 'basic':
        Swal.fire({
          icon: 'warning',
          title: 'Tu plan Basico se ha terminado',
          text: 'Elije uno de los siguientes planes para seguir navegando en AlDía',
          timer: 10000,
        })
        break
      case 'premium':
        Swal.fire({
          icon: 'warning',
          title: 'Tu plan Premium se ha terminado',
          text: 'Elije uno de los siguientes planes para seguir navegando en AlDía',
          timer: 10000,
        })
        break
    }
  }
}

export default function Page() {
  const searchParams = useSearchParams()
  const to = searchParams.get('to') as ToType

  showAlert(to)

  return (
    <>
      <Plans isPricingPage />
    </>
  )
}
