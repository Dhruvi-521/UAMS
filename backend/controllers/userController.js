const Users = require("../models/Users");
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");

exports.getProfile = async (req, res) => {
    try {

        const user = await Users.findById(
            req.user.userId
        );

        let profile = null;

        if (user.onModel === "Student") {
            profile = await Student.findById(user.userID);
        }

        if (user.onModel === "Faculty") {
            profile = await Faculty.findById(user.userID);
        }

        res.status(200).json({
            role: user.role,
            profile
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};