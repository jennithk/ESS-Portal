const Payroll = require("../models/Payroll");

const getPayrolls = async (req, res) => {
    try {

        const payrolls = await Payroll.find({
            employee: req.user._id
        }).sort({
            year: -1,
            createdAt: -1
        });

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

const getPayrollById = async (req, res) => {
    try {

        const payroll = await Payroll.findOne({
            _id: req.params.id,
            employee: req.user._id
        });

        if (!payroll) {

            return res.status(404).json({
                success: false,
                message: "Payroll record not found"
            });

        }

        res.json({
            success: true,
            payroll
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
            employee: req.user._id,
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
    getPayrolls,
    getPayrollById,
    createPayroll
};