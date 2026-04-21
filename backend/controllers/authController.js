const Users = require("../models/Users");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Find user
        const user = await Users.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 2. Check active
        if (!user.isActive) {
            return res.status(403).json({ message: "User is inactive" });
        }

        // 3. Compare password (IMPORTANT)
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // 4. Send role + user
        res.status(200).json({
            message: "Login successful",
            role: user.role,
            userId: user._id,
            username: user.username
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};