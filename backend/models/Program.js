const mongoose = require('mongoose');
const { type } = require('node:os');

const programSchema = new mongoose.Schema({
    programName: { 
        type: String, 
        required: true,
        unique: true
    },

    departmentName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",                     
        required: true
    },

    totalYearsProgram: { type: Number, required: true },

    totalCredit:{
        type:Number,
        required:true
    },

    StartDate: { 
        type: Date, 
        default: Date.now   
    },

    isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model("Program", programSchema);