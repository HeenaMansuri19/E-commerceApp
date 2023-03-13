const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require('../services/emailService')
const userModelSchema = require("../models/userModelSchema")

const userSignUp = async (req, res) => {
    try {
        const isEmailExists = await userModelSchema.findOne({ userEmail: req.body.userEmail });
        if (isEmailExists) {
            res.status(409).json({
                success: "false",
                message: "Email already exists for this user"
            });
        }
        else {
            const registerData = await new userModelSchema(req.body)
            try {
                const salt = await bcrypt.genSalt(10);
                registerData.password = await bcrypt.hash(req.body.password, salt)
                const filePath = `/uploads/${req.file.filename}`;
                registerData.profilePic = filePath;
                registerData.save();
                res.status(201).json({
                    success: true,
                    message: "Registration successfull",

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


const userLogin = async (req, res) => {
    try {
        const { userEmail, password } = req.body;
        if (userEmail && password) {
            const userData = await userModelSchema.findOne({ userEmail: userEmail })
            if (userData != null) {
                const isPasswordMatch = await bcrypt.compare(password, userData.password);
                if (userData.userEmail === userEmail && isPasswordMatch) {
                    const token = jwt.sign({ userId: userData._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
                    res.status(200).send({
                        success: true,
                        message: "Login successfull",
                        token: token
                    });
                } else {
                    res.status(401).send({
                        success: "failure",
                        message: "Email or password is not valid",
                    });
                }
            } else {
                res.status(400).json({
                    success: "failure",
                    message: "You are not a register user",
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
    const { userEmail } = req.body;
    try {
        const user = await userModelSchema.findOne({ userEmail: userEmail });
        if (user != null) {
            const secret = process.env.JWT_SECRET_KEY;
            const token = jwt.sign({ userID: user.id }, secret, {
                expiresIn: "20m"
            });
            const emailSend = sendEmail(userEmail, token)
            return res.status(201).json({
                success: true,
                message: "Email sent successfully",
                token: token,
                userID: user.id,
            });
        } else {
            res.status(403).json({
                success: "failure",
                message: "Email user is not found"
            })
        }
    } catch (err) {
        res.status(500).json({
            success: "failure",
            message: err.message,
        });
    }
}


const userResetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { newPassword, confirmPassword } = req.body;
    try {
        const checkUser = await userModelSchema.findById(id);
        if (checkUser != null) {
            const secretKey = process.env.JWT_SECRET_KEY;
            jwt.verify(token, secretKey);
            if (newPassword === confirmPassword) {
                const salt = await bcrypt.genSalt(10);
                const password = await bcrypt.hash(confirmPassword, salt);
                await userModelSchema.findByIdAndUpdate(checkUser._id, {
                    $set: { password: password },
                });
                res.status(200).json({
                    success: true,
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
                message: "Email is not found."
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
    userSignUp,
    userLogin,
    resetPasswordSendEmail,
    userResetPassword

}