import mongoose, { Model, Schema } from "mongoose";

export interface GoalsTypes {
  _id?: String;
  title: String;
  category: string;
  goalValue: Number;
  expires: string;
  priority: Number;
  plazo: String;
  status: String;
}

const goalsSchema = new Schema<GoalsTypes, Model<GoalsTypes>>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    goalValue: { type: Number, required: true },
    expires: { type: String, required: true },
    priority: { type: Number, required: true},
    plazo: {type: String, enum: ['Largo plazo', 'Corto plazo'], required: true},
    status: {type: String, enum: ['Completed', 'Pending'], required: true, default: 'Pending'}
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Goal =
  mongoose.models.Goal || mongoose.model("Goal", goalsSchema);
