const Attendance = require("../models/Attendance");

const getToday = () => {
    return new Date().toISOString().split("T")[0];
};

const checkIn = async (req, res) => {
    try {

        const employeeId = req.user.id;
        const today = getToday();

        let attendance = await Attendance.findOne({
            employee: employeeId,
            date: today
        });

        if (attendance) {
            return res.status(400).json({
                success: false,
                message: "Already checked in today"
            });
        }

        attendance = await Attendance.create({
            employee: employeeId,
            date: today,
            checkIn: new Date(),
            status: "Present"
        });

        res.status(201).json({
            success: true,
            message: "Check In Successful",
            attendance
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const checkOut = async (req, res) => {
    try {

        const employeeId = req.user.id;
        const today = getToday();

        const attendance = await Attendance.findOne({
            employee: employeeId,
            date: today
        });

        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: "Check In First"
            });
        }

        if (attendance.checkOut) {
            return res.status(400).json({
                success: false,
                message: "Already checked out"
            });
        }

        attendance.checkOut = new Date();

        const hours =
            (attendance.checkOut - attendance.checkIn) /
            (1000 * 60 * 60);

        attendance.workingHours = Number(hours.toFixed(2));

        await attendance.save();

        res.json({
            success: true,
            message: "Check Out Successful",
            attendance
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getAttendance = async (req, res) => {
    try {

        const attendance = await Attendance.find({
            employee: req.user.id
        }).sort({
            createdAt: -1
        });

        res.json({
            success: true,
            attendance
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    checkIn,
    checkOut,
    getAttendance
};