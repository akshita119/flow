import mongoose from "mongoose";

const authoritySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // The name of the authority
  },
  level: {
    type: String,
    enum: ["admin", "supervisor", "manager", "staff"], // Example levels of authority
    required: true, // The level of the authority
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure the email is unique
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"], // Simple email validation
  },
  mobile: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"], // Mobile number validation
  },
  password: {
    type: String,
    required: true, // The password for the authority
    minlength: 6, // Minimum password length
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the date when the authority is created
  },
});

export const Authority = mongoose.model("Authority", authoritySchema);
