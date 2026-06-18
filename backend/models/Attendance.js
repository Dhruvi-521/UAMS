const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
{
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },

    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },

    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
        required: true
    },

    division: {
        type: String,
        required: true
    },

    attendanceDate: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        enum: ["Present", "Absent"],
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model(
    "Attendance",
    attendanceSchema
);