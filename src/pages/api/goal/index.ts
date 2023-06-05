import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../src-backend/db";
import { User } from "@/models/user.model";
import { Goal } from "@/models/goal.model";
import { dateFormatter } from "@/utils/dateFormatter";
import { Expense } from "@/models/expense.model";
dbConnect();

export default async function goal(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
        const { email } = req.query;
        const {title, category, goalValue, priority, plazo, expiresDate} = req.body;
        switch (req.method) {
            case "GET":
                const result = await User.findOne({ email: email})
                .populate('goals')
                .lean();
                res.status(200).json({goals: result.goals});
                break;
            case 'POST':
                const date = await dateFormatter(expiresDate)
                const newGoal = await Goal.create({title, category, goalValue, priority, plazo, expires: date});
                const user = await User.findOne({email: email });
                await user.goals.push(newGoal);
                await user.save();
                res.status(200).json({message: 'created ', goal: newGoal});
                break;
            default:
                res.status(404).json({message: 'Invalid Method'});
                break;
        }


    } catch (error) {
        res.status(400).json(error);
    }
  }