import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
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
  },
  company:[{
    type: Schema.Types.ObjectId,
    ref:'Company',
    default: []
  }],
  incomes: [{ type: Schema.Types.ObjectId, ref: "Income", default: [] }],
  expenses: [{ type: Schema.Types.ObjectId, ref: "Expense", default: [] }],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;