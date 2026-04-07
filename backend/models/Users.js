const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel' 
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Faculty', 'Student', 'Admin']
    },
    password: {
        type: String,
        default: "SU1234",
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'admin', 'faculty'],
        default: 'student'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { 
    // This is the "built-in" way. 
    // It automatically adds and manages createdAt and updatedAt fields.
    timestamps: true 
});

module.exports = mongoose.model("Users", usersSchema);