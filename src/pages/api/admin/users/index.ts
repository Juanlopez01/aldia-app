import { User } from '@/models/user.model'
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  const { page = 1, name, email } = req.query
  const currentPage = Number(page)
  const query = setQuery({ name, email })
  try {

    if (method === 'GET') {
      const [users, count] = await Promise.all([
        User.find(query)
          .limit(10)
          .skip((currentPage - 1) * 10)
          .exec(),
        User.estimatedDocumentCount(query),
      ])
      return res.status(200).json({
        success: true,
        currentPage,
        count,
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
