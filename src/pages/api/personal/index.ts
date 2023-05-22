import { Expense } from "@/models/expense.model";
import { Income } from "@/models/income.model";
import { User } from "@/models/user.model";
import dbConnect from "@/src-backend/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function personal(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  Expense;
  Income;

  const { method, query, body } = req;

  let user;
  switch (method) {
    case "GET":
      try {
        user = await User.findOne({ email: query.email })
          .select("-hashedPassword")
          .populate("incomes")
          .populate("expenses");
      } catch (error) {
        console.log(error);
      }

      res.status(200).json({ payload: user });

      break;
    default:
      res.status(400).json({ error: "Invalid Method" });
      break;
  }
}
