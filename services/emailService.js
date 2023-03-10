const dotenv = require('dotenv').config();
var nodemailer = require('nodemailer')

let password = process.env.password
const sendEmail = (email, token) => {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "heenamansuri87961@gmail.com",
            pass: "jlvqlcthvwfgpwvz"
        }
    });

    //send out email through nodemailer
    var mailOptions = {
        from: "heenamansuri87961@gmail.com",
        to: email,
        subject: "RESET PASSWORD",
        html:
            `
        <p> You are requested to RESET PASSWORD</p>
        <h5>click to this link <a href="http//localhost:3000/reset/${token}">link</a>to reset password</h5>`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email Sent Succesfully' + info.response);
        }
    })
}

module.exports = {
    sendEmail
}
