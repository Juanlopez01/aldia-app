import { Payment } from "@/models/payment.model";
import { User } from "@/models/user.model";
import dbConnect from "@/src-backend/db";
import { NextApiRequest, NextApiResponse } from "next";



export default async function handler(req:NextApiRequest, res:NextApiResponse) {
const {method,query}=req
if(method === 'GET'){
  await dbConnect()
  try {
    const { id } = query
    const payment = await Payment.findById(id)
    return res.status(200).json({success: true, payment })
  } catch (error) {
    console.log(error);
    return res.status(400).json({success:false, message: ''})
  }
}
return res
  .status(501)
  .json({ success: false, message: 'method not implemeted' })

}