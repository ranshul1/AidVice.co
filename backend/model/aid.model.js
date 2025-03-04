import mongoose from "mongoose";

const aidSchema = mongoose.Schema({
    type: String,
    name: String,
    data: String,
});
const Aid = mongoose.model("Aid", aidSchema);
export default Aid;