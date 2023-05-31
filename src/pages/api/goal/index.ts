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
        const { email, id } = req.query;
        const {title, category, goalValue, currentValue, expiresDate} = req.body;
        switch (req.method) {
            case "GET":
                const result = await User.findOne({ email: email})
                .populate('Goal');
                res.status(200).json(result)
                break;
            case 'POST':
                const date = await dateFormatter(expiresDate)
                const newGoal = await Goal.create({title, category, goalValue, currentValue, expires: date});
                const user = await User.findOne({email: email });
                await user.goals.push(newGoal);
                await user.save();
                res.status(200).json({message: 'created ', goal: newGoal})
                break;
            case 'PUT':
                const updatedGoal = await Goal.findOneAndUpdate({_id: id}, {
                    currentValue,
                },
                {new: true})
                res.status(200).json(updatedGoal)
                break;
            default:
                res.status(404).json({message: 'Not Found'});
                break;
        }


    } catch (error) {
        res.status(400).json(error);
    }
  }