const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const payrollRoutes = require("./routes/payrollRoutes");
const performanceRoutes = require("./routes/performanceRoutes");
const trainingRoutes = require("./routes/trainingRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const hrRoutes = require("./routes/hrRoutes");
const hrLeaveRoutes = require("./routes/hrLeaveRoutes");
const hrPayrollRoutes = require("./routes/hrPayrollRoutes");
const hrPerformanceRoutes = require("./routes/hrPerformanceRoutes");

const adminRoutes = require("./routes/adminRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "ESS Portal API Running"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/payroll", payrollRoutes);
app.use("/api/performance", performanceRoutes);
app.use("/api/training", trainingRoutes);
app.use("/api/notifications", notificationRoutes);

app.use("/api/hr", hrRoutes);
app.use("/api/hr/leaves", hrLeaveRoutes);
app.use("/api/hr/payroll", hrPayrollRoutes);
app.use("/api/hr/performance", hrPerformanceRoutes);

app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on Port ${PORT}`);
});