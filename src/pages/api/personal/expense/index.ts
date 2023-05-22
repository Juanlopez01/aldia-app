import { dbConnect } from "@/src-backend/db";
import { Company } from "@/models/company.model";
import { Expense } from "@/models/expense.model";
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/models/user.model";

dbConnect();

export default async function income(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body, query } = req;

  let expenses;
  switch (method) {
    case "GET":
      const account = await User.findOne({ email: query.email })
        .populate("expenses")
        .lean();

      res.status(200).json({ status: "success", payload: account.expenses });

      break;
    case "POST":
      let result;

      let user = await User.findOne({ email: query.email });
      result = await Expense.create(body);

      await user.expenses.push(result);
      await user.save();
      res.status(200).json({ message: "post", payload: result });
      break;

    default:
      res.status(400).json({ error: "Invalid Method" });
      break;
  }
}
