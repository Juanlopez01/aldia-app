import dbConnect from '@backend/db'
import { User } from '@/models/user.model'
import { CustomError } from '@/utils/custom-error'
import { NextApiRequest, NextApiResponse } from 'next'
import { Payment } from '@/models/payment.model'

const getInitialDates = (date = new Date ) => {
  const init_date = new Date()
  const end_date = new Date(date.setMonth(date.getMonth() + 1))
  return {
    init_date,
    end_date,
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req
  try {
    await dbConnect()

    const { id } = req.query
    if (method === 'GET') {
      const user = await User.findById(id)
      return res.status(200).json({ success: true, user })
    } else if (method === 'PATCH') {
      const { plan } = body
      if (!plan) throw new CustomError('Plan required', 400)

      const user = await User.findById(id)
      if (!user) throw new CustomError('User not found', 404)

      let dates;
      if(user.payments.length) {
        const lastPay = await Payment.findById(user.payments.at(-1))
        dates = getInitialDates(lastPay.end_date)
      }else dates = getInitialDates()

      const { init_date, end_date } = dates

      const payment = await Payment.create({
        plan,
        plan_id: '',
        init_date,
        end_date,
        provider: 'manual',
      })

      await user.payments.push(payment)
      user.status = `active - manual - ${plan}`
      await user.save()
      res
        .status(201)
        .json({
          success: true,
          user,
          message: `El usuario ${user.fullName} fue activado correctamente con el plan ${plan}`,
        })
    } else throw new CustomError('Method invalid', 400)
  } catch (e) {
    if (e instanceof CustomError)
      return res
        .status(e.statusCode)
        .json({ success: false, message: e.message })
    console.log(e)
    res.status(500).json({ success: false, message: 'Internal Error' })
  }
}
