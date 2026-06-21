const mongoose = require("mongoose");

const mentoringSlotSchema = new mongoose.Schema(
  {
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
    },

    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
      required: true,
    },

    semester: {
      type: Number,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["OPEN", "BOOKED", "CANCELLED"],
      default: "OPEN",
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

mentoringSlotSchema.index(
  {
    faculty: 1,
    date: 1,
    startTime: 1,
    endTime: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model(
  "MentoringSlot",
  mentoringSlotSchema
);