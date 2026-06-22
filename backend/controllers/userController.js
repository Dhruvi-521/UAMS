const Users = require("../models/Users");
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const bcrypt = require("bcryptjs");
const PasswordResetOTP = require("../models/PasswordResetOTP");
const sendOTPEmail = require("../utils/sendMail");

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

// Password Reset 
exports.sendPasswordResetOTP = async (req, res) => {

    try {

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const user = await Users.findOne({
            username: email
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "University email not found"
            });
        }

        const otp =
            Math.floor(1000 + Math.random() * 9000).toString();

        await PasswordResetOTP.deleteMany({ email });

        await PasswordResetOTP.create({
            email,
            otp,
            expiresAt: new Date(
                Date.now() + 5 * 60 * 1000
            )
        });

        await sendOTPEmail(email, otp);

        res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.verifyPasswordResetOTP = async (req, res) => {

    try {

        const { email, otp } = req.body;

        const otpRecord =
            await PasswordResetOTP.findOne({
                email,
                otp
            });

        if (!otpRecord) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        if (otpRecord.expiresAt < new Date()) {

            await PasswordResetOTP.deleteOne({
                _id: otpRecord._id
            });

            return res.status(400).json({
                success: false,
                message: "OTP expired"
            });
        }

        res.status(200).json({
            success: true,
            message: "OTP verified"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.resetPassword = async (req, res) => {

    try {

        const {
            email,
            otp,
            newPassword
        } = req.body;

        const otpRecord =
            await PasswordResetOTP.findOne({
                email,
                otp
            });

        if (!otpRecord) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        if (otpRecord.expiresAt < new Date()) {

            return res.status(400).json({
                success: false,
                message: "OTP expired"
            });
        }

        const hashedPassword =
            await bcrypt.hash(newPassword, 10);

        const user = await Users.findOne({
            username: email
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.password = hashedPassword;
        await user.save();

        await PasswordResetOTP.deleteOne({
            _id: otpRecord._id
        });

        res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};