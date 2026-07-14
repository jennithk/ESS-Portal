const User = require("../models/User");

const getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id).select("-password");

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });

        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getDashboard = async (req, res) => {

    try {

        const user = await User.findById(req.user._id).select("-password");

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });

        }

        res.status(200).json({

            success: true,

            dashboard: {

                employee: user,

                stats: {

                    attendance: 96,

                    leaveBalance: 12,

                    salary: 45000,

                    performance: "Excellent"

                },

                recentActivities: [

                    {
                        title: "Attendance Marked",
                        date: new Date()
                    },

                    {
                        title: "Leave Request Submitted",
                        date: new Date()
                    },

                    {
                        title: "Payroll Generated",
                        date: new Date()
                    }

                ],

                announcements: [

                    {
                        title: "Monthly Team Meeting",
                        description: "Monday 10:00 AM"
                    },

                    {
                        title: "React Training",
                        description: "Friday 2:00 PM"
                    }

                ]

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    getProfile,

    getDashboard

};