const Leave = require("../models/Leave");

const getAllLeaves = async (req, res) => {

    try {

        const leaves = await Leave.find()
            .populate("employee", "firstName lastName email employeeId")
            .sort({ createdAt: -1 });

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

const updateLeaveStatus = async (req, res) => {

    try {

        const { status } = req.body;

        const leave = await Leave.findById(req.params.id);

        if (!leave) {

            return res.status(404).json({
                success: false,
                message: "Leave request not found"
            });

        }

        leave.status = status;

        await leave.save();

        res.json({
            success: true,
            message: "Leave updated successfully",
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
    getAllLeaves,
    updateLeaveStatus
};