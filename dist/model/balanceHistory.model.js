import mongoose, { Schema } from "mongoose";
export const HistoryBalance = mongoose.model("History", new Schema({
    bank: { type: mongoose.SchemaTypes.ObjectId, ref: "Balance" },
    date: { type: Date, default: () => Date.now() },
    title: { type: String },
    type: {
        type: String,
        enum: ["fnb", "fuel", "goods", "parking", "tarik_tunai"],
    },
    value: { type: Number, min: [0, "yakali minus ngab"] },
    balance: { type: Number, min: [0, "yakali minus ngab"] },
    in_wallet: { type: Number, min: [0, "yakali minus ngab"] },
    balance_left: { type: Number, min: [0, "yakali minus ngab"] },
    in_wallet_left: { type: Number, min: [0, "yakali minus ngab"] },
}));
//# sourceMappingURL=balanceHistory.model.js.map