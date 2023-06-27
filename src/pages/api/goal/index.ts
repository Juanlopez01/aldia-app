import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../src-backend/db";
import { User, UserWithId } from "@/models/user.model";
import { Goal } from "@/models/goal.model";
import { dateFormatter } from "@/utils/dateFormatter";
import { Expense } from "@/models/expense.model";
import { CompanType, Company } from "@/models/company.model";
dbConnect();

export default async function goal(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
        const { email, type } = req.query;
        const {title, category, goalValue, priority, plazo, expiresDate} = req.body;
        switch (req.method) {
            case "GET":
                if(type === 'user'){
                    const result = await User.findOne({ email: email})
                    .populate('goals')
                    .lean();
                    res.status(200).json({goals: (result as UserWithId).goals});
                } else {
                    const result = await Company.findOne({ _id: email})
                    .populate('goals')
                    .lean();
                    res.status(200).json({goals: (result as CompanType).goals});
                }
            
                break;
            case 'POST':
                const date = await dateFormatter(expiresDate)
                console.log(expiresDate, category)
                const newGoal = await Goal.create({title, category, goalValue, priority, plazo, expires: date});
                if(type === 'user'){
                    const user = await User.findOne({email: email });
                    await user.goals.push(newGoal);
                    await user.save();
                } else {
                    const company = await Company.findOne({_id: email});
                    console.log(company)
                    company.goals.push(newGoal);
                    company.save();
                }
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