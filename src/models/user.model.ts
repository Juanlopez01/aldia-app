import mongoose, { Model } from "mongoose";
import { CompanType } from "./company.model";
import { IncomeType } from "./income.model";
import { ExpenseType } from "./expense.model";

const Schema = mongoose.Schema;

export interface UserType {
  name: String;
  email: String;
  hashedPassword?: String;
  image: String;
  company?: CompanType[] | [];
  incomes?: IncomeType[] | [];
  expenses?: ExpenseType[] | [];
  role: String;
  status: String;
}

const userSchema = new Schema<UserType, Model<UserType>>(
  {
    name: {
      type: String,
      requeired: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: true,
      minlength: 5,
    },
    image: {
      type: String,
      default:
        "https://icon-library.com/images/generic-user-icon/generic-user-icon-18.jpg",
    },
    role:{
      type: String,
      default: 'User'
    },
    status:{
      type: String,
      default: 'disabled'
    },
    company: [
      {
        type: Schema.Types.ObjectId,
        ref: "Company",
        default: [],
      },
    ],
    incomes: [
      { type: Schema.Types.ObjectId, ref: "Income", default: [{ id: "1" }] },
    ],
    expenses: [
      { type: Schema.Types.ObjectId, ref: "Expense", default: [{ id: "1" }] },
    ],
  },
  { versionKey: false }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
