import { dbConnect } from "@/src-backend/db";
import { Expense } from "@/models/expense.model";
import { Income } from "@/models/income.model";
import { NextApiRequest, NextApiResponse } from "next";

dbConnect();

export default async function expenseID(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query, body } = req;

  let expense;
  switch (method) {
    case "GET":
      expense = await Expense.findOne({ _id: query.id });
      res.status(200).json({ message: expense });
      break;
    case "PUT":
      expense = await Expense.findOneAndUpdate({ _id: query.id }, body, {
        new: true,
      });

      res
        .status(200)
        .json({ message: "update a unique income", payload: expense });
      break;
    case "DELETE":
      let result = await Expense.deleteOne({ _id: query.id });
      res
        .status(200)
        .json({ message: "delete a unique income", result: result });
      break;
    default:
      res.status(400).json({ error: "Invalid Method" });
      break;
  }
}
