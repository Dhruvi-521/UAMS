const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  address: String,
  phone: String,
  email: String
}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema);