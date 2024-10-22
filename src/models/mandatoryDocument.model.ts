import { Schema, model } from "mongoose";

const schema = new Schema({
  name: { type: String, required: true },
  isActive: { type: Boolean, required: true, default: true },
  fileURL: { type: String, required: false },
  isDeleted: { type: Boolean, required: true, default: false },
  createdAt: { type: Number, required: false, default: Date.now },
  updatedAt: { type: Number, required: false, default: null },
});

export default model("mandatoryDocument" , schema);