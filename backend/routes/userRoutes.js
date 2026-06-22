const express = require("express");
const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
    getProfile,
    sendPasswordResetOTP,
    verifyPasswordResetOTP,
    resetPassword
} = require("../controllers/userController");

router.get(
    "/profile",
    authMiddleware,
    getProfile
);

router.post(
    "/forgot-password/send-otp",
    sendPasswordResetOTP
);

router.post(
    "/forgot-password/verify-otp",
    verifyPasswordResetOTP
);

router.post(
    "/forgot-password/reset",
    resetPassword
);

const sendOTPEmail = require("../utils/sendMail");

router.get("/test-mail", async (req, res) => {

    try {

        await sendOTPEmail(
            process.env.EMAIL_USER,
            "1234"
        );

        res.json({
            success: true,
            message: "Mail sent"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

module.exports = router;