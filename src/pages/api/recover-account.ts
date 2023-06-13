import { User } from "@/models/user.model";
import conn from "@/src-backend/db";
import { hash } from "bcrypt";
import { JsonWebTokenError, verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";



export default async function handler(req: NextApiRequest,res: NextApiResponse){
    const { method, query, body } = req
    const { token = '' }= query

    try {
        
        const { id } = verify(
          token?.toString(),
          process.env.NEXTAUTH_JWT_SECRET || ''
        ) as { id: string }
            
            if(!id) throw new CustomError('Invalid token', 400)
            await conn()
            if(method === "GET"){

                const user = await User.findById(id)
                if(!user) throw new CustomError('User not found', 404)
                return res.status(200).json({ user })

            } else if (method === "PUT"){

                const { newPassword } = body
                const hashedPassword = await hash(newPassword, 12)
                const user = await User.findByIdAndUpdate(id, { hashedPassword })
                if (!user) throw new CustomError('User not found',404)
                return res.status(200).json({ success: true, user })
            }

            } catch (error) {
            if(error instanceof CustomError) return res.status(error.statusCode).json({ success: false, message: error.message})
            else if(error instanceof JsonWebTokenError ) return res.status(400).json({ success: false, message: error.message})
            console.log(error);
            res.status(500).json({ success: false, message: 'Error trying to recover account' })
        }

}