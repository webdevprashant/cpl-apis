import mongoose from "mongoose";

const schema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false  },
  mobile: { type: Number, required: true },
  password: { type: String, required: true },
  email: { type: String, required: false },
  dob: { type: Number, required: false },
  age: { type: Number, required: false },
  bookingIds: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: "booking" }],
  cartItems: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: "testAndPackage" }],
  address: [
    {
      houseNo: { type: String, required: false, default: null },
      street: { type: String, required: false, default: null },
      city: { type: String, required: false, default: null },
      state: { type: String, required: false, default: null },
      country: { type: String, required: false, default: null },
      pincode: { type: Number, required: false, default: null },
      landmark: { type: String, required: false, default: null },
      phoneNumber: { type: Number, required: false, default: null },
      alternateNumber: { type: Number, required: false, default: null },
      type: { type: String, required: false, default: null },
      isDefault: { type: Boolean, required: false, default: null },
    },
  ],
  gender: { type: String, required: true },
  createdAt: { type: Number, required: false, default: Date.now },
  updatedAt: { type: Number, required: false },
  isActive: { type: Boolean, required: false, default: true },
  isDeleted: { type: Boolean, required: false, default: false },
})


export default mongoose.model("customer", schema);