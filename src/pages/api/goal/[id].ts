import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../src-backend/db";
import { Goal } from "@/models/goal.model";

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
        res.status(200).json(updatedGoal)
      break;
    case "DELETE":
      const deletedGoal = await Goal.deleteOne({ _id: query.id });
      res
        .status(200)
        .json({ message: "delete a unique goal", result: deletedGoal.deletedCount === 1 ? query.id : 'error' });
      break;
    default:
      res.status(400).json({ error: "Invalid Method" });
      break;
  }
}
