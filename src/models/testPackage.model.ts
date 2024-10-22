import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: false },
  price: { type: Number, required: false },
  code: { type: String, required: false },
  mrp: { type: Number, required: false },
  imageURL: { type: String, required: false },
  department: { type: String, required: false },
  specimen: { type: String, required: false },
  stability: [{
    type: { type: String, required: false },
    value: { type: String, required: false }
  }],
  method: { type: String, required: false },
  comment: { type: String, required: false },
  reportURL: { type: String, required: false },
  reportDesc: { type: String, required: false },
  usage: { type: String, required: false },
  doctorSpeciality: { type: String, required: false },
  disease: { type: String, required: false },
  parameters: [{ type: String, required: false }],  // Only for test
  organs: [{ type: String, required: false }],
  testIds: [{ type: mongoose.Schema.Types.ObjectId, required: false }],  // Only for packages    
  categoryIds: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: "category" }],
  homeCollection: { type: Boolean, required: false, default: true },
  preTestInformation: { type: String, required: false },
  requiredDocuments: [{ type: mongoose.Types.ObjectId, required: false, ref: "mandatoryDocuments" }],
  sampleType: { type: String, required: false },
  isFastingRequired: { type: Boolean, required: false },
  isPackage: { type: Boolean, required: false, default: false },
  isActive: { type: Boolean, required: false, default: true },
  isDeleted: { type: Boolean, required: false, default: false },
  createdAt: { type: Number, required: false, default: Date.now },
  updatedAt: { type: Number, required: false, default: null },
});

export default mongoose.model("testAndPackage", schema);