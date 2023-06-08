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
      // if(body.type === 'subscription_preapproval_plan'){
      //   const { data } = await axios(`${MP_SUBS_URL}preapproval_plan/${body.data.id}`, { headers })
      //   console.log(data);
      // }else
      // console.log(body)

      // if (body.type=== 'subscription_preapproval'){
      //   const { data } = await axios(`${MP_SUBS_URL}preapproval/${body.data.id}`, { headers })

      //   console.log('---------------------DATA--------------------')
      //   console.log(data);
      //   console.log('---------------------USER--------------------')
      //   console.log(user);
      //   console.log('---------------------END--------------------')
      // }
      // if (body.type === 'payment') {
      //   console.log('---------------------BODY--------------------')
      //   console.log(body)
      //   const paymentId = body.data.id;
      //   const response = await axios.get(`${MP_SUBS_URL}v1/payments/${paymentId}`, { headers });
      //   const paymentInfo = response.data;
      //   console.log('---------------------DATA--------------------')
      //   console.log(paymentInfo)
      //   console.log('---------------------END--------------------')
      // }

      if (body.type === 'subscription_authorized_payment') {
        console.log('---------------------BODY--------------------')
        console.log(body)
        // const paymentId = body.data.id;
        const { data } = await axios.get(
          `${MP_SUBS_URL}authorized_payments/${body.data.id}`,
          { headers }
        )
        if (data.payment.status === 'approved') {
          await conn()
          const plan = data.reason.split(' ').at(-1)
          const plan_id = data.preapproval_id
          const init_date = new Date(data.next_retry_date)
          const end_date = new Date(data.debit_date)

          // const paymentInfo = response.data;
          const user = await User.findById(data.external_reference)
          const payment = await Payment.create({
            plan,
            plan_id,
            init_date,
            end_date,
          })
          await user.payments.push(payment)
          const newUser = await user.save()
          console.log(new Date());
          console.log(newUser)
        }

        // console.log('---------------------DATA--------------------')
        // console.log(data)
        // console.log('---------------------END--------------------')
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
  console.log(req)
  console.log(body)
  res.status(501).json({ message: 'Method Not Implemented' })
}
