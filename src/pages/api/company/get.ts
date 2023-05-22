import { Company } from "@/models/company.model";
import { Expense } from "@/models/expense.model";
import { Income } from "@/models/income.model";

import dbConnect from "@/src-backend/db";
import { Schema } from "mongoose";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";


export default async function companyID(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  let company;

   await dbConnect();
  Income;
  Expense;
  switch (method) {
    case "GET":
      try {
        
        company = await Company.findOne({ _id: query.id })
        .populate('expenses')
        .populate('incomes')
        res.status(200).json({ status: "success", payload: company });
      } catch (error) {
        res.status(400).json({ status: "error", payload: 'error' });
      }
      break;

    default:
      break;
  }
}
