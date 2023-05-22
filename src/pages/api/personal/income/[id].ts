import { dbConnect } from "@/src-backend/db";
import { Income } from "@/models/income.model";
import { NextApiRequest, NextApiResponse } from "next";
import { connection } from "mongoose";

dbConnect();
interface IncomeApi {
  type: string;
  description: string;
}

export default async function personalIncomeID(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query, body } = req;

  let result;
  let income;

  switch (method) {
    case "GET":
      try {
        income = await Income.findOne({ _id: query.id });
        res.status(200).json({ status: "sucess", payload: income });
      } catch (error) {
        res.status(400).json({ message: income });
      }
      break;
    case "PUT":
      try {
        income = await Income.findOneAndUpdate({ _id: query.id }, body, {
          new: true,
        });
        res.status(200).json({ status: "sucess", payload: income });
      } catch (error) {
        res.status(400).json({ status: "error", message: error });
      }
      break;
    case "DELETE":
      try {
        result = await Income.deleteOne({ _id: query.id });
        res.status(200).json({ message: "sucess", result: result });
      } catch (error) {
        res.status(400).json({ status: "error", message: error });
      }
      break;
    default:
      res.status(400).json({ error: "Invalid Method" });
      break;
  }
}
