import mongoose from "mongoose";
const bloodUnitSchema = new mongoose.Schema({
  unitNumber: { type: String, required: true, unique: true }, // Unique identifier for each unit
  bloodType: { type: String, required: true }, // e.g., A+, O-, AB+

  expiryDate: { type: Date, required: true }, // Expiry date for the unit
  isAvailable: { type: Boolean, default: true }, // Availability status of the unit
});
const bloodBankSchema = new mongoose.Schema({
  name: { type: String, required: true },
  DMHORegNo: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    state: { type: String, required: true },
  },
  componentSeparationAvailable: { type: Boolean, required: true }, // Yes/No as Boolean
  availability: [bloodUnitSchema],
});

export const BloodBank = mongoose.model("BloodBank", bloodBankSchema);
