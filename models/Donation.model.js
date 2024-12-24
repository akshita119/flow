import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  unitNo: { type: String, required: true, unique: true },
  bloodGroup: { type: String, required: true },
  donor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  date: { type: Date, required: true },
  bloodFit: { type: Boolean, required: true },
});

export default mongoose.model("Donation", donationSchema);
