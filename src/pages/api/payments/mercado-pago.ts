import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const MP_SUBS_URL = 'https://api.mercadopago.com/preapproval_plan'
const { MP_ACCESS_TOKEN } = process.env
const headers= {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body} = req

  if (method === 'POST') {
    try {
      const bodyToSend = {
        reason: `Suscripcion a AlDía ${body.plan}`,
        auto_recurring: {
          frequency: 1,
          frequency_type: 'days',
          transaction_amount: 10,
          currency_id: 'ARS',
        },
        back_url: 'https://google.com.ar/',
        // payer_email:'test_user_1719808280@testuser.com',
        external_reference: body.userId
      }
      const { data } = await axios.post(MP_SUBS_URL, bodyToSend, {
        headers
      })

    console.log('---------------------PAYMENT--------------------')
    console.log(data )
    console.log('---------------------PAYMENT--------------------')

      return res.status(200).json({success: true, redirection_url: data.init_point})
    } catch (error) {
      console.error(error)
      return res.status(400).json({
        success: false,
        message: 'Algo paso mal al intentar realizar el pago',
      })
    }
  }
  res.status(501).json({ message: 'Method Not Implemented' })
}
