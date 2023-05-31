import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../src-backend/db";
import { User } from "@/models/user.model";
import { Goal } from "@/models/goal.model";
import { dateFormatter } from "@/utils/dateFormatter";
dbConnect();

export default async function goal(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
        switch (req.method) {
            case "GET":
                const { email } = req.body;
                const result = await User.findOne({ email: email})
                .populate('Goal');
                res.status(200).json(result)
                break;
            case 'POST':
                //const {title, category, goalValue, currentValue, expires} = req.body;
                const date = await dateFormatter('a week')
                //const newGoal = await Goal.create({title, category, goalValue, currentValue, expires});
                res.status(200).json({message: date})
                break;
        }


    } catch (error) {
        
    }
  }