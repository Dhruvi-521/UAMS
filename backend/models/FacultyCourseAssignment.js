const mongoose = require("mongoose");

const facultyCourseAssignmentSchema = new mongoose.Schema({
    facultyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
        required: true
    },

    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model(
    "FacultyCourseAssignment",
    facultyCourseAssignmentSchema
);
