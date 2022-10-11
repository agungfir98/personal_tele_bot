import mongoose, { Schema } from "mongoose";
import { balanceHistory } from "../types/type.js";

export const HistoryBalance = mongoose.model<balanceHistory>(
  "History",
  new Schema({
    bank: { type: mongoose.SchemaTypes.ObjectId, ref: "Balance" },
    date: { type: Date, default: () => Date.now() },
    title: { type: String },
    type: { type: String, enum: ["fnb", "fuel", "goods", "parking", "narik"] },
    value: { type: Number, min: [0, "yakali minus ngab"] },
    balance: { type: Number, min: [0, "yakali minus ngab"] },
    in_wallet: { type: Number, min: [0, "yakali minus ngab"] },
    balance_left: { type: Number, min: [0, "yakali minus ngab"] },
    in_wallet_left: { type: Number, min: [0, "yakali minus ngab"] },
  })
);
