import  dbConnect  from '@backend/db'
import { User } from '@/models/user.model'
import { CustomError } from '@/utils/custom-error'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const { method}= req
    try {
        
        await dbConnect()
        if(method === 'GET'){
            const {id}=req.query
            const user = await User.findById(id)         
           return res.status(200).json({success:true, user})
            
        }else throw new CustomError('Method invalid', 400)
    } catch (e) {
        if(e instanceof CustomError) return res.status(e.statusCode).json({success:false,message: e.message })
        console.log(e);
        res.status(500).json({success:false, message:'Internal Error'})

    }
}
