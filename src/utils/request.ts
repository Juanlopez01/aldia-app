import { PaymentType } from '@/models/payment.model'
import { UserWithId } from '@/models/user.model'
import { ObjectId } from 'mongodb'

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

interface ResponseValidate {
  success: boolean
  message: string
  user: UserWithId
}

export const validatePaymentUserManually = async (
  userId: ObjectId,
  planType: 'basic' | 'premium'
) => {
  const response = await requestAdminUsers<ResponseValidate>(`/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ plan: planType }),
  })
  return response
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
