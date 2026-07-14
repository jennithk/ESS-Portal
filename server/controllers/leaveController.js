const Leave = require("../models/Leave");

const applyLeave = async (req, res) => {
    try {

        const {
            leaveType,
            fromDate,
            toDate,
            reason
        } = req.body;

        const leave = await Leave.create({
            employee: req.user._id,
            leaveType,
            fromDate,
            toDate,
            reason
        });

        res.status(201).json({
            success: true,
            message: "Leave request submitted successfully",
            leave
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getLeaves = async (req, res) => {
    try {

        const leaves = await Leave.find({
            employee: req.user._id
        }).sort({
            createdAt: -1
        });

        res.json({
            success: true,
            leaves
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getLeaveById = async (req, res) => {
    try {

        const leave = await Leave.findOne({
            _id: req.params.id,
            employee: req.user._id
        });

        if (!leave) {

            return res.status(404).json({
                success: false,
                message: "Leave request not found"
            });

        }

        res.json({
            success: true,
            leave
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    applyLeave,
    getLeaves,
    getLeaveById
};