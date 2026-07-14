const Performance = require("../models/Performance");

const getAllPerformance = async (req, res) => {

    try {

        const performances = await Performance.find()
            .populate("employee", "firstName lastName employeeId email")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            performances
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const createPerformance = async (req, res) => {

    try {

        const {
            employee,
            reviewPeriod,
            rating,
            goalsCompleted,
            feedback,
            reviewer
        } = req.body;

        const performance = await Performance.create({
            employee,
            reviewPeriod,
            rating,
            goalsCompleted,
            feedback,
            reviewer
        });

        res.status(201).json({
            success: true,
            message: "Performance review added successfully",
            performance
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    getAllPerformance,
    createPerformance
};