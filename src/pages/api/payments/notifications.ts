import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const MP_SUBS_URL = 'https://api.mercadopago.com/'
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
  const { method, body } = req

  if (method === 'POST') {
    try {

    console.log('---------------------NOTIFICACTION--------------------')
    console.log(body)
    console.log('---------------------NOTIFICACTION--------------------')


    if(body.type === 'subscription_preapproval_plan'){
      const { data } = await axios(`${MP_SUBS_URL}preapproval_plan/${body.data.id}`, { headers })
      console.log(data);
    }else if (body.type=== ' subscription_preapproval'){
      const { data } = await axios(`${MP_SUBS_URL}preapproval/${body.data.id}`, { headers })
      console.log(data);
      
    }
      return res
        .status(200)
        .json({ success: true, message: 'Todo chido!', body })
    } catch (error) {
      console.error(error)
      return res.status(400).json({
        success: false,
        message: 'Algo paso mal :c',
      })
    }
  }
  console.log(req);
  console.log(body)
  res.status(501).json({ message: 'Method Not Implemented' })
}
