import { CompanType, Company } from "@/models/company.model";
import { Income } from "@/models/income.model";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../src-backend/db";
import { User, UserWithId } from "@/models/user.model";
import { catTransactions } from "@/utils/categoriesTransactions";

dbConnect();

export default async function income(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body, query } = req;

  let company;
  const name = query.Id?.includes("@");

  switch (method) {
    case "GET":
      if (!name) {
        company = await Company.findById({ _id: query.Id })
          .populate("incomes")
          .lean();

        res.status(200).json({ message: "get", payload: (company as CompanType).incomes });
      } else {
        const account = await User.findOne({ email: query.Id })
          .populate("incomes")
          .lean();

        res.status(200).json({ message: "get", payload: (account as UserWithId).incomes });
      }
      break;
    case "POST":
      let result;
      if (body.type === "negocio") {
        company = await Company.findById({ _id: query.Id });
        if(!catTransactions.includes(body.category)) {
          await company.categories.push(body.category);
        }
        result = await Income.create(body);

        await company.incomes.push(result);
        await company.save();
      } else {
        let user = await User.findOne({ email: query.Id });
        if(!catTransactions.includes(body.category)) {
          await user.categories.push(body.category);
        }
        result = await Income.create(body);

        user.incomes.push(result);
        await user.save();
      }

      res.status(200).json({ message: "post", payload: result });
      break;

    default:
      res.status(400).json({ error: "Invalid Method" });
      break;
  }
}
