import mongoose, { Model } from "mongoose";
import { CompanType } from "./company.model";
import { IncomeType } from "./income.model";
import { ExpenseType } from "./expense.model";
import { GoalsTypes } from "./goal.model";
import { ObjectId } from "mongodb";
import { Currency } from "@/types/auth.type";
import { Payment, PaymentType } from "./payment.model";

const Schema = mongoose.Schema;

export interface UserType {
  name: String;
  lastname: String;
  fullName: String;
  provider: String;
  email: String;
  emailVerified: Boolean;
  hashedPassword?: String;
  image: string;
  currency: Currency;
  company?: CompanType[] | [];
  incomes?: IncomeType[] | [];
  expenses?: ExpenseType[] | [];
  goals?: GoalsTypes[] | [];
  payments?: PaymentType[] | [];
  role: String;
  status: String;
  createdAt: Date;
  updatedAt: Date;
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
    fullName: {
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
    currency: {
      type: String,
      default: 'USD',
    },

    company: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        default: [],
      },
    ],
    incomes: [{ type: Schema.Types.ObjectId, ref: 'Income', default: [] }],
    payments: [{ type: Schema.Types.ObjectId, ref: 'Payment', default: [] }],
    expenses: [{ type: Schema.Types.ObjectId, ref: 'Expense', default: [] }],
    goals: [{ type: Schema.Types.ObjectId, ref: 'Goal', default: [] }],
  },
  { versionKey: false, timestamps: true }
)
userSchema.pre('save', function(next){
  this.fullName = `${this.name} ${this.lastname}`;
  next()
})
export const isPropertyOfUser = (key: string): boolean => {
  return !!userSchema.path(key);
};


export const User = mongoose.models.User || mongoose.model("User", userSchema);
