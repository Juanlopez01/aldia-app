import { Company } from "@/models/company.model";
import { User } from "@/models/user.model";
import dbConnect from "@/src-backend/db";
import { Schema } from "mongoose";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";


export default async function companyID(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const { method, query} = req;
    const { company, user } = query;
   await dbConnect();
  switch (method) {
    case "POST":
      try {
        const companyObj = await Company.findOne({ _id: company});
        companyObj.notifications.push({
            user: user,
        })
        res.status(200).json({ status: "success" });
      } catch (error) {
        res.status(400).json({ status: "error", payload: 'error' });
      }
      break;

      default:
        res.status(400).json({ error: "Invalid Method" });
        break;
  }
}