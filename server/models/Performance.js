const mongoose = require("mongoose");

const performanceSchema = new mongoose.Schema(
    {
        employee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        reviewPeriod: {
            type: String,
            required: true
        },

        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },

        goalsCompleted: {
            type: Number,
            default: 0
        },

        feedback: {
            type: String,
            default: ""
        },

        reviewer: {
            type: String,
            default: "HR Manager"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Performance", performanceSchema);