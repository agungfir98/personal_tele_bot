import mongoose, { Schema } from "mongoose";
const Ide = mongoose.model("Ideas", new Schema({
    name: { type: String, required: true },
}, { timestamps: true }));
export default Ide;
//# sourceMappingURL=Ide.model.js.map