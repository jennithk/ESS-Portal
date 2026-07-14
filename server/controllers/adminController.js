const User = require("../models/User");

const getDashboard = async (req, res) => {
    try {

        const totalEmployees = await User.countDocuments();

        const totalHR = await User.countDocuments({
            role: "HR"
        });

        const totalAdmins = await User.countDocuments({
            role: "Admin"
        });

        res.json({
            success: true,
            dashboard: {
                totalEmployees,
                totalHR,
                totalAdmins
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getUsers = async (req, res) => {
    try {

        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    getDashboard,
    getUsers
};