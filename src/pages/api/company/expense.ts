import { Company } from "@/models/company.model";
import { Expense } from "@/models/expense.model";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../src-backend/db";
import {Schema} from 'mongoose'
dbConnect();

export default async function companyExpense(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body, query } = req;

  let company;
  let expenses;
  switch (method) {
    case "GET":
        company = await Company.findById({ _id: query.Id })
          .populate("expenses")
          .lean();

        res.status(200).json({ message: "get", payload: company.expenses });
      
      break;
    case "POST":
      
        company = await Company.findById({ _id: query.Id });
        expenses = await Expense.create(body);
        await company.expenses.push(expenses);
        await company.save();
      
      res.status(200).json({ message: "post", payload: expenses });
      break;
    case "PUT":
        expenses = await Expense.findOneAndUpdate(
          { _id: query.id },
            body,
          {
            new: true,
          }
        );
        res
          .status(200)
          .json({ message: "update a unique income", payload: expenses });
        break;
      case "DELETE":
        company = await Company.findOne({ _id: query.company });
        let result = await Expense.deleteOne({ _id: query.id });
        company.expenses = await company.expenses.filter((c : Schema.Types.ObjectId)=> {
            if(c.toString() !== query.id) return c
        })
        await company.save(); 
        res
          .status(200)
          .json({ message: "delete a unique income", result: result, id: query.id});
        break;
        
    default:
      res.status(400).json({ error: "Invalid Method" });
      break;
  }
}