const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require('../services/emailService')
const vendorModelSchema = require("../models/vendorModelSchema")

const vendorSignUp = async (req, res) => {
    try {
        const isEmailExists = await vendorModelSchema.findOne({ vendorEmail: req.body.vendorEmail });
        if (isEmailExists) {
            res.status(409).json({
                success: "false",
                message: "Email already exists for this vendor"
            });
        }
        else {
            const registerData = await new vendorModelSchema(req.body)
            try {
                const salt = await bcrypt.genSalt(10);
                registerData.password = await bcrypt.hash(req.body.password, salt)
                registerData.save();
                res.status(201).json({
                    success: true,
                    message: "Registration successfull for the new vendor",
                });
            } catch (err) {
                res.status(400).json({
                    success: false,
                    error: err.message,
                });
            }
        }
    } catch (err) {
        console.log(err)
    }
}

const vendorLogin = async (req, res) => {
    try {
        const { vendorEmail, password } = req.body;
        if (vendorEmail && password) {
            const vendorData = await vendorModelSchema.findOne({ vendorEmail: vendorEmail })
            if (vendorData != null) {
                const isPasswordMatch = await bcrypt.compare(password, vendorData.password);
                if (vendorData.vendorEmail === vendorEmail && isPasswordMatch) {
                    const token = jwt.sign({ vendorId: vendorData._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
                    res.status(200).send({
                        success: "success",
                        message: "Login successfull for vendor",
                        token: token
                    });
                } else {
                    res.status(401).send({
                        success: "failure",
                        message: "Email or password is not valid for this vendor",
                    });
                }
            } else {
                res.status(400).json({
                    success: "failure",
                    message: "You are not a register vendor",
                });
            }
        }
    } catch (err) {
        res.status(400).json({
            success: "failure",
            message: "Error occur" + err.message
        });
    }
}

const resetPasswordSendEmail = async (req, res) => {
    const { vendorEmail } = req.body;
    try {
        const vendor = await vendorModelSchema.findOne({ vendorEmail: vendorEmail });
        if (vendor != null) {
            const secret = process.env.JWT_SECRET_KEY;
            const token = jwt.sign({ vendorID: vendor.id }, secret, {
                expiresIn: "20m"
            });
            const emailSend = sendEmail(vendorEmail, token)
            return res.status(201).json({
                success: "success",
                message: "Email sent successfully",
                token: token,
                vendorID: vendor.id,
            });
        } else {
            res.status(403).json({
                success: "failure",
                message: "Email vendor is not found"
            })
        }
    } catch (err) {
        res.status(500).json({
            success: "failure",
            message: err.message,
        });
    }
}


const vendorResetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { newPassword, confirmPassword } = req.body;
    try {
        const checkVendor = await vendorModelSchema.findById(id);
        if (checkVendor != null) {
            const secretKey = process.env.JWT_SECRET_KEY;
            jwt.verify(token, secretKey);
            if (newPassword === confirmPassword) {
                const salt = await bcrypt.genSalt(10);
                const password = await bcrypt.hash(confirmPassword, salt);
                await vendorModelSchema.findByIdAndUpdate(checkVendor._id, {
                    $set: { password: password },
                });
                res.status(200).json({
                    success: "success",
                    message: "Password update successfully"
                });
            } else {
                res.status(403).json({
                    success: "failure",
                    message: "Password and confirm password is not match"
                });
            }
        } else {
            res.status(403).json({
                success: "failure",
                message: "Email is not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            success: "failure",
            message: err.message,
        });
    }
}


module.exports = {
    vendorSignUp,
    vendorLogin,
    resetPasswordSendEmail,
    vendorResetPassword
}