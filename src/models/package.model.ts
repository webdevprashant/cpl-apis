import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: false },
  price: { type: Number, required: true },
  code: { type: String, required: false },
  imageURL: { type: String, required: false },
  department: { type: String, required: false  },
  mrp: { type: Number, required: false },
  specimen: { type: String, required: false  },
  stability: [{ 
    type: {type: String, required: false},  
    value: {type: String, required: false}  
  }],
  method: { type: String, required: false  },
  comment: { type: String, required: false },
  reportURL: { type: String, required: false },
  reportDesc: { type: String, required: false },
  usage: { type: String, required: false  },
  doctorSpeciality: { type: String, required: false  },
  disease: { type: String, required: false  },
  organs: [{ type: String, required: false }],
  homeCollection: { type: Boolean, required: false, default: true },
  preTestInformation: { type: String, required: false  },
  sampleType: { type: String, required: false },
  isDeleted: { type: Boolean, required: false, default: false },
  isFastingRequired: { type: Boolean, required: false },
  isPackage: { type: Boolean, required: false, default: true },
  testIds: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "tests" }],
  isActive: { type: Boolean, required: false , default: true},
  createdAt: { type: Number, required: false, default: Date.now },
  updatedAt: { type: Number, required: false },
});

export default mongoose.model("package", schema);