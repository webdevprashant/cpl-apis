import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: false },
  description: { type: String, required: false },
});

export default mongoose.model("role", schema);