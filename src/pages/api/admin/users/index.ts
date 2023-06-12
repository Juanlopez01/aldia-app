import { User } from '@/models/user.model';
import conn from '@backend/db';
import { NextApiRequest, NextApiResponse } from "next";
type queryInput ={
    name?:string | string[],
    email?:string | string[],
 }
type queryOutput = {
  fullName?: RegExp
  email?: RegExp
}
const setQuery=({name, email}:queryInput):queryOutput => {
    const query:queryOutput = {};
    if(email && typeof email === 'string')query.email = new RegExp(email, 'i') ;
    if(name && typeof name === 'string')query.fullName = new RegExp(name, 'i');
    return query
}

export default async function handler (req:NextApiRequest,res:NextApiResponse){
    const {page = 1, name , email}= req.query
    const  currentPage = Number(page)
    const query = setQuery({name, email})
    try {
        await conn()
        const [users, count] = await Promise.all([User.find(query).limit(10).skip(( currentPage - 1 ) * 10).exec(), User.estimatedDocumentCount(query)])

        res.status(200).json({
            success: true,
            currentPage,
            count,
            users
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({success: false, message: ''})
    }
    
}