const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  programId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program",
    required: true,
  },

  semesterNumber: {
    type: Number,
    required: true,
  },

  courseId: {
    type: String,
    required: true,
  },

  courseName: {
    type: String,
    required: true,
  },

  totalCredits: {
    type: Number,
    required: true,
  },

  StartDate: {
    type: Date,
    default: Date.now,
  },

  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Course", courseSchema);