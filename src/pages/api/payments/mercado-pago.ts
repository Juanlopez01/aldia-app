import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const MP_SUBS_URL = 'https://api.mercadopago.com/preapproval_plan'
const { MP_ACCESS_TOKEN } = process.env

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  if (method === 'GET') {
    try {
      const body = {
        reason: 'sub de ejemplo xdd',
        auto_recurring: {
          frequency: 1,
          frequency_type: 'months',
          transaction_amount: 10,
          currency_id: 'ARS',
        },
        back_url: 'https://google.com.ar/',
      }
      const { data } = await axios.post(MP_SUBS_URL, body, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
        },
      })
      console.log(data)

      res.status(200).json({ success: true, data })
    } catch (error) {
      console.error(error)
      res.status(400).json({
        success: false,
        message: 'Algo paso mal al intentar realizar el pago',
      })
    }
  }
  res.status(501).json({ message: 'Method Not Implemented' })
}
