import mongoose, { Model, Schema } from "mongoose";

export interface IncomeType {
  _id?: String;
  type: String;
  description: String;
  category: string;
  value: number;
}

const incomeSchema = new Schema<IncomeType, Model<IncomeType>>(
  {
    type: { type: [String], enum: ["negocio", "personales"], required: true },
    value: { type: Number, required: true },
    description: { type: String, required: false },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Income =
  mongoose.models.Income || mongoose.model("Income", incomeSchema);
