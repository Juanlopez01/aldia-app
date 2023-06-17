import { PaymentType } from '@/models/payment.model'

export async function requestAdminUsers<T>(
  path = '',
  config: RequestInit = {}
): Promise<T> {
  const users = await fetch(`/api/admin/users${path}`, config).then((res) => {
    if (!res.ok) throw new Error(`Error: ${res.status}`)
    return res.json()
  })
  return users as T
}

type ResponseFetchPayment = {
  success: boolean
  payment: PaymentType
}

export const fetchPayment = async (
  idPayment: PaymentType 
): Promise<ResponseFetchPayment> => {
  return await fetch(`api/personal/payments/${idPayment}`).then((res) => {
    if (!res.ok) throw new Error('Failed to: ' + res.status)
    return res.json()
  })
}
