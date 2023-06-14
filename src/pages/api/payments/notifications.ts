import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import conn from '@backend/db'
import { User } from '@/models/user.model'
import { Payment } from '@/models/payment.model'

const MP_SUBS_URL = 'https://api.mercadopago.com/'
const { MP_ACCESS_TOKEN } = process.env
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req

  if (method === 'POST') {
    try {
      if (body.type === 'subscription_authorized_payment') {
        // Hago la peticion para obtener los datos del pago
        // y así saber que usuario realizó el pago
        const { data } = await axios.get(
          `${MP_SUBS_URL}authorized_payments/${body.data.id}`,
          { headers }
        )
        // verfico que el estado del pago este aprobado
        // por que puede haber sido rechazado o cancelado
        if (data.payment.status === 'approved') {
          await conn()
          const {
            reason,
            preapproval_id: plan_id,
            next_retry_date,
            debit_date,
          } = data
          // El tipo de plan es la ultima palabra de reason
          const plan = reason.split(' ').at(-1)
          const end_date = new Date(next_retry_date)
          const init_date = new Date(debit_date)

          const user = await User.findById(data.external_reference)
          const payment = await Payment.create({
            plan,
            plan_id,
            init_date,
            end_date,
            provider: 'mercadoPago'
          })
          await user.payments.push(payment)
          user.status = `active - MP - ${plan}`
          await user.save()
        }
      }

      return res.status(200).json({ success: true })
    } catch (error) {
      console.error(error)
      return res.status(400).json({
        success: false,
        message: 'Algo paso mal :c',
      })
    }
  }
  res.status(501).json({ message: 'Method Not Implemented' })
}
