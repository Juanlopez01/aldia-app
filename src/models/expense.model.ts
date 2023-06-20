import mongoose, { Model, Schema } from "mongoose";

export interface ExpenseType {
  _id?: String;
  type: String;
  description: String;
  category: string;
  value: number;
  date: string;
  credit: string;
}

const expenseSchema = new Schema<ExpenseType, Model<ExpenseType>>(
  {
    type: { type: [String], enum: ["negocio", "personales"], required: true },
    value: { type: Number, required: true },
    description: { type: String, required: false },
    category: { type: String, required: true },
    date: {type: String, required: true},
    credit: { type: String, required: true, default: 'Un pago'}
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export const Expense =
  mongoose.models.Expense || mongoose.model("Expense", expenseSchema);
