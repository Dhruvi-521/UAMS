const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },

        programId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Program",
            required: true,
        },

        semester: {
            type: Number,
            required: true,
        },

        examType: {
            type: String,
            enum: ["Mid Sem", "Final", "Unit Test"],
            required: true,
        },

        subjects: [
            {
                courseId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Course",
                    required: true
                },

                courseName: {
                    type: String,
                    required: true
                },

                marksObtained: {
                    type: Number,
                    required: true
                }
            }
        ],

        totalMarks: {
            type: Number,
            default: 0,
        },

        percentage: {
            type: Number,
            default: 0,
        },

        grade: {
            type: String,
        },

        status: {
            type: String,
            enum: ["Pass", "Fail"],
            default: "Pass",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Marks", marksSchema);