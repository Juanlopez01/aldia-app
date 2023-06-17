import { Payment } from "@/models/payment.model";
import { User } from "@/models/user.model";
import dbConnect from "@/src-backend/db";
import { CustomError } from "@/utils/custom-error";
import { NextApiRequest, NextApiResponse } from "next";



export default async function handler(req:NextApiRequest, res:NextApiResponse) {
const {method,query}=req
if(method === 'GET'){
  await dbConnect()
  try {
    const { id } = query
    if(!id) throw new CustomError('Payments Id is required',400)
    const payment = await Payment.findById(id)
    return res.status(200).json({success: true, payment })
  } catch (error) {
    if(error instanceof CustomError) res.status(error.statusCode).json({success:false, message: error.message})
    console.log(error);
    return res.status(400).json({success:false, message: ''})
  }
}
return res
  .status(501)
  .json({ success: false, message: 'method not implemeted' })

}