import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const MP_SUBS_URL = 'https://api.mercadopago.com/preapproval_plan'
const { MP_ACCESS_TOKEN } = process.env
const headers= {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
}

interface PlansType{
  basic: {
    frequency: 1,
    frequency_type: 'months',
    transaction_amount: 10,
    currency_id: 'ARS',
  },
  premium: {
    frequency: 1,
    frequency_type: 'months',
    transaction_amount: 20,
    currency_id: 'ARS',
  },
  
}

const PLANS:PlansType ={
  basic: {
    frequency: 1,
    frequency_type: 'months',
    transaction_amount: 10,
    currency_id: 'ARS',
  },
  premium: {
    frequency: 1,
    frequency_type: 'months',
    transaction_amount: 20,
    currency_id: 'ARS',
  },
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body} = req

  if (method === 'POST') {
    try {
      const plan = body.plan  as keyof PlansType
      if(!(plan in PLANS))throw new  Error('Invalid plan type')
      if(!body.userId)throw new  Error('UserId is required')
      const bodyToSend = {
        reason: `AlDía ${plan}`,
        auto_recurring: PLANS[plan],
        /* una vez deployado hay que cambiar esta propiedad
        por la de /pricing/finish-payment o cualquier otra que 
        le diga al usuario que su pago esta siendo procesado */
        back_url: 'https://google.com.ar/',
        external_reference: body.userId,
      }
      const { data } = await axios.post(MP_SUBS_URL, bodyToSend, {
        headers
      })

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
