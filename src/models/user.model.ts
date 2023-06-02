import mongoose, { Model } from "mongoose";
import { CompanType } from "./company.model";
import { IncomeType } from "./income.model";
import { ExpenseType } from "./expense.model";
import { GoalsTypes } from "./goal.model";
import { ObjectId } from "mongodb";

const Schema = mongoose.Schema;

export interface UserType {
  name: String;
  lastname: String;
  provider: String;
  email: String;
  emailVerified: Boolean;
  hashedPassword?: String;
  image: String;
  company?: CompanType[] | [];
  incomes?: IncomeType[] | [];
  expenses?: ExpenseType[] | [];
  goals?: GoalsTypes[] | [];
  role: String;
  status: String;
}
export interface UserWithId extends UserType{
  _id: ObjectId
}

const userSchema = new Schema<UserType, Model<UserType>>(
  {
    name: {
      type: String,
      requeired: true,
    },
    lastname: {
      type: String,
    },
    provider: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        'https://icon-library.com/images/generic-user-icon/generic-user-icon-18.jpg',
    },
    role: {
      type: String,
      default: 'user',
    },
    status: {
      type: String,
      default: 'disabled',
    },

    company: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        default: [],
      },
    ],
    incomes: [{ type: Schema.Types.ObjectId, ref: 'Income', default: [] }],
    expenses: [{ type: Schema.Types.ObjectId, ref: 'Expense', default: [] }],
    goals: [{ type: Schema.Types.ObjectId, ref: 'Goal', default: [] }],
  },
  { versionKey: false }
)

export const isPropertyOfUser = (key: string): boolean => {
  return !!userSchema.path(key);
};


export const User = mongoose.models.User || mongoose.model("User", userSchema);
