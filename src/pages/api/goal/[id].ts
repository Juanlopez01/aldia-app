import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../src-backend/db";
import { Goal } from "@/models/goal.model";
import { Expense } from "@/models/expense.model";

dbConnect();

export default async function expenseID(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query, body } = req;

  switch (method) {
    case "GET":
        const result = await Goal.findOne({_id: query.id})
        res.status(200).json(result)
      break;
    case "PUT":
        const {currentValue} = body;
        const updatedGoal = await Goal.findOneAndUpdate({_id: query.id}, {
            currentValue,
        },
        {new: true})
        const updateExpense = await Expense.findOneAndUpdate({description: updatedGoal.title, category: 'Metas'}, {
          value: currentValue,
        },
        {new: true})
        res.status(200).json({goal: updatedGoal, expense: updateExpense});
      break;
    case "DELETE":
      const deletedGoal = await Goal.findOneAndDelete({ _id: query.id });
      const deletedExpense = await Expense.findOneAndDelete({category: 'Metas', description: deletedGoal.title});
      res
        .status(200)
        .json({ message: "delete a unique goal", result: deletedGoal, expense: deletedExpense._id});
      break;
    default:
      res.status(400).json({ error: "Invalid Method" });
      break;
  }
}
