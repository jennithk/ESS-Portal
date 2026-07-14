const Notification = require("../models/Notification");

const getNotifications = async (req, res) => {
    try {

        const notifications = await Notification.find({
            employee: req.user._id
        }).sort({
            createdAt: -1
        });

        res.json({
            success: true,
            notifications
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const createNotification = async (req, res) => {
    try {

        const {
            employee,
            title,
            message
        } = req.body;

        const notification = await Notification.create({
            employee,
            title,
            message
        });

        res.status(201).json({
            success: true,
            message: "Notification sent successfully",
            notification
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const markAsRead = async (req, res) => {
    try {

        const notification = await Notification.findOne({
            _id: req.params.id,
            employee: req.user._id
        });

        if (!notification) {

            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });

        }

        notification.isRead = true;

        await notification.save();

        res.json({
            success: true,
            message: "Notification marked as read",
            notification
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    getNotifications,
    createNotification,
    markAsRead
};