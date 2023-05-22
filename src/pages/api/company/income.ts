import { Company } from "@/models/company.model";
import { Income } from "@/models/income.model";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../src-backend/db";
import { Schema } from "mongoose";
dbConnect();

export default async function companyIncome(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body, query } = req;

  let company;
  let incomes;
  switch (method) {
    case "GET":
      company = await Company.findById({ _id: query.Id })
        .populate("incomes")
        .lean();

      res.status(200).json({ message: "get", payload: company.incomes });

      break;
    case "POST":
      company = await Company.findById({ _id: query.Id });
      incomes = await Income.create(body);
      await company.incomes.push(incomes);
      await company.save();

      res.status(200).json({ message: "post", payload: incomes });
      break;
    case "PUT":
      incomes = await Income.findOneAndUpdate({ _id: query.id }, body, {
        new: true,
      });

      res
        .status(200)
        .json({ message: "update a unique income", payload: incomes });
      break;
    case "DELETE":
      company = await Company.findOne({ _id: query.company });
      let result = await Income.deleteOne({ _id: query.id });
      company.incomes = await company.incomes.filter(
        (c: Schema.Types.ObjectId) => {
          if (c.toString() !== query.id) return c;
        }
      );
      await company.save();
      res
        .status(200)
        .json({
          message: "delete a unique income",
          result: result,
          id: query.id,
        });
      break;

    default:
      res.status(400).json({ error: "Invalid Method" });
      break;
  }
}
