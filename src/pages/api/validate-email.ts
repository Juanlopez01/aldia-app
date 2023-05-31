import { NextApiRequest, NextApiResponse } from "next";
import conn from "@/src-backend/db";
import {JwtPayload, verify} from 'jsonwebtoken'
import { User } from "@/models/user.model";

interface decodedToken extends JwtPayload{
    id: string;
}

export default async function handler(req: NextApiRequest,res: NextApiResponse){
const { method, query }= req;
if(method === 'GET'){
    await conn()
const { token='' } = query
try {
    
    const {id} = verify(token?.toString() , process.env.NEXTAUTH_JWT_SECRET || '') as decodedToken
    const user = await User.findByIdAndUpdate(id,{ emailVerified: true })
    if(!user)throw new Error('User not found')
    return res.redirect('/email-validated')
} catch (err) {
    const error = err as Error
    return res.status(401).json({ success:false, message: error.message})
}
}
return res.status(400).json({success: false,message: `ERROR: ${method} is not implemented`})
}