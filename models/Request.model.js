import mongoose from "mongoose";

const bloodRequestSchema = new mongoose.Schema({
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital", // Reference to Hospital model
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient", // Reference to Patient model
    required: true,
  },
  urgency: {
    type: String,
    enum: ["regular", "urgent", "life-saving"], // Options for urgency level
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true, // Blood group (e.g., "A+", "O-", etc.)
  },
  unitsRequired: {
    type: Number,
    required: true, // Number of blood units required
  },
  requestDate: {
    type: Date,
    default: Date.now, // Automatically set to the current date
  },
});

export const BloodRequest = mongoose.model("BloodRequest", bloodRequestSchema);
