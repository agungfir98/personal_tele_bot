import mongoose, { Schema } from "mongoose";
const Balance = mongoose.model("Balance", new Schema({
    bank: { type: String },
    balance: {
        type: Number,
        min: [0, "yakali mines ngab?"],
    },
    in_wallet: {
        type: Number,
        default: 0,
        min: [0, "yakali mines ngab?"],
    },
    history: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "History",
        },
    ],
}, { timestamps: true }));
export default Balance;
//# sourceMappingURL=balance.model.js.map