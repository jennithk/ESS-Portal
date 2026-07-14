const Performance = require("../models/Performance");

const getPerformances = async (req, res) => {
    try {

        const performances = await Performance.find({
            employee: req.user._id
        }).sort({
            createdAt: -1
        });

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

const getPerformanceById = async (req, res) => {
    try {

        const performance = await Performance.findOne({
            _id: req.params.id,
            employee: req.user._id
        });

        if (!performance) {

            return res.status(404).json({
                success: false,
                message: "Performance record not found"
            });

        }

        res.json({
            success: true,
            performance
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
            reviewPeriod,
            rating,
            goalsCompleted,
            feedback,
            reviewer
        } = req.body;

        const performance = await Performance.create({
            employee: req.user._id,
            reviewPeriod,
            rating,
            goalsCompleted,
            feedback,
            reviewer
        });

        res.status(201).json({
            success: true,
            message: "Performance review created successfully",
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
    getPerformances,
    getPerformanceById,
    createPerformance
};