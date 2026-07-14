const User = require("../models/User");

const getEmployees = async (req, res) => {

    try {

        const employees = await User.find({})
            .select("-password")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            employees
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getEmployee = async (req, res) => {

    try {

        const employee = await User.findById(req.params.id)
            .select("-password");

        if (!employee) {

            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });

        }

        res.json({
            success: true,
            employee
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    getEmployees,
    getEmployee
};