import mongoose from "mongoose";

const schema = new mongoose.Schema({
  roleId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "role" },
  firstName: { type: String, required: true },
  lastName: { type: String, required: false  },
  mobile: { type: Number, required: true },
  password: { type: String, required: true },
  email: { type: String, required: false },
  dob: { type: Number, required: false },
  age: { type: Number, required: false },
  address: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },
  gender: { type: String, required: true },
  createdAt: { type: Number, required: false, default: Date.now },
  updatedAt: { type: Number, required: false },
  isActive: { type: Boolean, required: false, default: true },
  isDeleted: { type: Boolean, required: false, default: false },
});

export default mongoose.model("user", schema);