import { Company } from "@/models/company.model";

import dbConnect from "@/src-backend/db";
import { Schema } from "mongoose";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";


export default async function companyID(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

   await dbConnect();
  switch (method) {
    case "GET":
      try {
        
        const companies = await Company.find({});
        res.status(200).json({ status: "success", payload: companies });
      } catch (error) {
        res.status(400).json({ status: "error", payload: 'error' });
      }
      break;

      default:
        res.status(400).json({ error: "Invalid Method" });
        break;
  }
}