import mongoose, { Schema, Model } from "mongoose";

export interface PaymentType {
    init_date: Date;
    end_date: Date;
    plan_id: string;
    plan: 'basic' | 'premium';
    provider: 'mercadoPago'
}

const paymentSchema = new Schema<PaymentType, Model<PaymentType>>({
  init_date: { type: Date },
  end_date: { type: Date },
  plan: { type: String },
  plan_id: { type: String },
  provider:{type: String}
})


export const Payment =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);