import { dbConnect } from "@/src-backend/db";
import { Company } from "@/models/company.model";
import { Income } from "@/models/income.model";
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/models/user.model";

dbConnect();

export default async function personalIncome(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body, query } = req;
  let result;
  switch (method) {
    case "GET":
      const account = await User.findOne({ email: query.email })
        .populate("incomes")
        .lean();

      res.status(200).json({ status: "success", payload: account.incomes });

      break;
    case "POST":
      let user = await User.findOne({ email: query.email });
      result = await Income.create(body);

      user.incomes.push(result);
      await user.save();

      res.status(200).json({ message: "post", payload: result });
      break;

    default:
      res.status(400).json({ error: "Invalid Method" });
      break;
  }
}
