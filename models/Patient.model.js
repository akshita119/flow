import mongoose from "mongoose";
import { Donor } from "./donor"; // Import Donor model

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  bloodGroup: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    state: { type: String, required: true },
  },
  medicalDisease: { type: String },
  diagnosis: { type: String },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donor",
    requried:true
  },
});

export const Patient = mongoose.model("Patient", patientSchema);
