import { User } from '@/models/user.model'
import conn from '@backend/db'

import { NextApiRequest, NextApiResponse } from 'next'

const isDevelopment = process.env.NODE_ENV === 'development'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (isDevelopment) {
    await conn()
    const timestamp = new Date().getTime()
    // creo que queda claro que es un usuario test
    const user = new User({
      name: `TEST-${timestamp}`,
      lastname: `Doe`,
      email: `TEST-${timestamp}@test-email.test`,
      hashedPassword: 'super-secret-password-1234',
      provider: 'test',
    })
    await user.save()
    return res.status(200).json({ success: true, user })
  }
  return res
    .status(401)
    .json({ success: false, message: 'This enpoint is only Dev Enviroment' })
}
