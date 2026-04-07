const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  facultyId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // university email
  phone: { type: String, required: true }, // personal phone
  familyPhone: { type: String },
  department: { type: String, required: true },
  designation: { type: String },
  qualification: { type: String }, // degree
  experience: { type: Number, default: 0 },
  dob: { type: String },
  joiningDate: { type: Date, default: Date.now },
  gender: { type: String },
  specialization: {
    type: [String], // array of strings
    default: [],
  },
  address: {
    fullAddress: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    pincode: { type: String },
  },
  personalEmail: { type: String }, // personal email
}, { timestamps: true });

// CRITICAL: The string "Faculty" here must match the enum in Users.js
module.exports = mongoose.model("Faculty", facultySchema);