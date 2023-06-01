import mongoose, { Model, Schema } from "mongoose";

export interface GoalsTypes {
  _id?: String;
  title: String;
  category: string;
  goalValue: Number;
  currentValue: Number;
  expires: string;
}

const goalsSchema = new Schema<GoalsTypes, Model<GoalsTypes>>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    goalValue: { type: Number, required: true },
    currentValue: { type: Number, required: true },
    expires: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Goal =
  mongoose.models.Goal || mongoose.model("Goal", goalsSchema);
