const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema(
    {
        employee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            default: ""
        },

        trainer: {
            type: String,
            default: "HR Department"
        },

        date: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            enum: ["Upcoming", "Completed"],
            default: "Upcoming"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Training", trainingSchema);