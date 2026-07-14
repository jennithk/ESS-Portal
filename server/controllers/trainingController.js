const Training = require("../models/Training");

const getTrainings = async (req, res) => {
    try {

        const trainings = await Training.find({
            employee: req.user._id
        }).sort({
            date: 1
        });

        res.json({
            success: true,
            trainings
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getTrainingById = async (req, res) => {
    try {

        const training = await Training.findOne({
            _id: req.params.id,
            employee: req.user._id
        });

        if (!training) {

            return res.status(404).json({
                success: false,
                message: "Training not found"
            });

        }

        res.json({
            success: true,
            training
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const createTraining = async (req, res) => {
    try {

        const {
            title,
            description,
            trainer,
            date,
            status
        } = req.body;

        const training = await Training.create({
            employee: req.user._id,
            title,
            description,
            trainer,
            date,
            status
        });

        res.status(201).json({
            success: true,
            message: "Training created successfully",
            training
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    getTrainings,
    getTrainingById,
    createTraining
};