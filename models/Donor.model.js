import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    ABHA: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    dob: { type: Date, required: true }, 
    fathersName: { type: String, required: true },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "others"],
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: String, required: true },
      state: { type: String, required: true },
    },
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },

    noOfPrevDonations: { type: Number, required: true, default: 0 }, 
    medicalStatus: {
      type: String,
      required: true,
      enum: ["fit", "unfit", "temporary"],
      default: "fit",
    },
  },
  {
    timestamps: true,
  }
);

export const Donor = mongoose.model("Donor", UserSchema);
