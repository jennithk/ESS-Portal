const Payroll = require("../models/Payroll");

const getAllPayrolls = async (req, res) => {

    try {

        const payrolls = await Payroll.find()
            .populate("employee", "firstName lastName employeeId email")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            payrolls
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const createPayroll = async (req, res) => {

    try {

        const {
            employee,
            month,
            year,
            basicSalary,
            hra,
            bonus,
            deductions
        } = req.body;

        const netSalary =
            Number(basicSalary) +
            Number(hra) +
            Number(bonus) -
            Number(deductions);

        const payroll = await Payroll.create({
            employee,
            month,
            year,
            basicSalary,
            hra,
            bonus,
            deductions,
            netSalary
        });

        res.status(201).json({
            success: true,
            message: "Payroll created successfully",
            payroll
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    getAllPayrolls,
    createPayroll
};