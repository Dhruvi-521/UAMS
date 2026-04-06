const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    DepartmentName: { 
        type: String, 
        required: true,
        unique: true
    },
    HeadOfDepartment: { type: String, required: true },

    StartDate: { 
        type: Date, 
        default: Date.now   
    },

    isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model("Department", departmentSchema);