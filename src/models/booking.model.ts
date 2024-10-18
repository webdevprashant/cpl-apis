import { Schema, model } from "mongoose";

const schema = new Schema({
  patientName: { type: String, required: true },
  contactNumber: { type: Number, required: true },
  address: { type: String, required: true },
  email: { type: String, required: false },
  schedule: { 
    start: { type: Number, required: true },
    end: { type: Number, required: true }
   },
  userId: { type: Schema.Types.ObjectId, required: true },
  allocatedTo: { type: Schema.Types.ObjectId, required: true },  // Collection Boy Id
  status: { type: Number, required: true, default: 0 },   // ( 0 - pending, 1 - allocated, 2 - collected, 3 - submitted, 4 - Report generated)
  testIds: [{ type: Schema.Types.ObjectId, required: false }],
  packageIds: [{ type: Schema.Types.ObjectId, required: false }],
  paymentStatus: { type: Number, required: true },
  finalPrice: { type: Number, required: true },
  createdAt: { type: Number, required: true, default: Date.now },
  updatedAt: { type: Number, required: false, default: null },
  isDeleted: { type: Boolean, required: true, default: false },
});

export default model("booking" , schema);