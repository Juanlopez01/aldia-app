import { IncomeType } from "@/models/income.model";
import mongoose, { Model, Schema } from "mongoose";
import { ExpenseType } from "./expense.model";
import { GoalsTypes } from "./goal.model";


export interface NotificationType {
  id: Schema.Types.ObjectId;
  name: string;
}
export interface CompanType {
  _id?: String;
  name: String;
  incomes: IncomeType[];
  expenses: ExpenseType[];
  users:Schema.Types.ObjectId[];
  notifications?: NotificationType[];
  goals?: GoalsTypes[] | [];
  categories?: string[] | [];
}

const companySchema = new Schema<CompanType, Model<CompanType>>({
  name: { type: String, required: true },
  incomes: [{ type: Schema.Types.ObjectId, ref: "Income", default: [] }],
  expenses: [{ type: Schema.Types.ObjectId, ref: "Expense", default: [] }],
  users:[{type: Schema.Types.ObjectId, ref: "User", default: [] }],
  categories:[{ type: String, ref: "Category", default:[] }],
  goals: [{ type: Schema.Types.ObjectId, ref: 'Goal', default: [] }],
  notifications:[{ type: Object, ref: 'Notification', default: []}],
});
companySchema.pre('save', function(next){
  this.goals = [];
  next()
})

export const Company =
  mongoose.models.Company || mongoose.model("Company", companySchema);
