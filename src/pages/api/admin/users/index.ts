import conn from '@backend/db'
import { User } from '@/models/user.model'
import { CustomError } from '@/utils/custom-error'
import { NextApiRequest, NextApiResponse } from 'next'
type queryInput = {
  name?: string | string[]
  email?: string | string[]
}
type queryOutput = {
  fullName?: RegExp
  email?: RegExp
}
const setQuery = ({ name, email }: queryInput): queryOutput => {
  const query: queryOutput = {}
  if (email && typeof email === 'string') query.email = new RegExp(email, 'i')
  if (name && typeof name === 'string') query.fullName = new RegExp(name, 'i')
  return query
}

const LIMIT_USERS = 10

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  const { page = 1, name, email } = req.query
  const currentPage = Number(page)
  const query = setQuery({ name, email })
  try {
    await conn()
    if (method === 'GET') {
      const [users, count] = await Promise.all([
        User.find(query)
          .limit(LIMIT_USERS)
          .skip((currentPage - 1) * LIMIT_USERS)
          .exec(),
        User.countDocuments(query),
      ])

      return res.status(200).json({
        success: true,
        currentPage,
        count,
        totalPages: Math.ceil(count / LIMIT_USERS),
        users,
      })
    } else throw new CustomError('Invalid Method', 400)
  } catch (error) {
    if (error instanceof CustomError)
      return res
        .status(error.statusCode)
        .json({ success: false, message: error.message })

    console.error(error)
    return res.status(500).json({ success: false, message: '' })
  }
}
