const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    // --- Academic Information ---
    program: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Program", // Reference to your Program model
        required: true  // Fixed typo here
    },
    
    semester: { type: Number, required: true },
    batch: { type: String , required: true},
    division: { type: String },
    
    // Note: timestamps: true already provides 'createdAt'
    studentId: { type: String, required: true, unique: true },
    rollNumber: { type: Number ,required:true },

    // --- Personal Information ---
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    dob: { type: Date },
    gender: { type: String, enum: ["Male", "Female", "Other"] },

    // --- Nested Address Information ---
    address: {
        fullAddress: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        pincode: { type: String }
    },

    // --- Contact Information ---
    universityEmail: { type: String, required: true, unique: true },
    personalEmail: { type: String },
    mobile: { type: String, required: true },
    parentContact: { type: String },

    // --- Status ---
    status: { 
        type: String, 
        enum: ["Active", "Inactive"], 
        default: "Inactive" 
    }
}, { 
    timestamps: true // This adds 'createdAt' and 'updatedAt' automatically
});

module.exports = mongoose.model("Student", studentSchema);