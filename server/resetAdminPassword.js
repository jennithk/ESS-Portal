const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

async function resetPassword() {
    try {

        await mongoose.connect(process.env.MONGODB_URI);

        const hashedPassword = await bcrypt.hash("Admin@123", 10);

        await User.updateOne(
            { email: "admin@example.com" },
            {
                $set: {
                    password: hashedPassword
                }
            }
        );

        console.log("✅ Admin password reset successfully.");
        console.log("Email: admin@example.com");
        console.log("Password: Admin@123");

        process.exit();

    } catch (error) {

        console.error(error);

        process.exit(1);

    }
}

resetPassword();