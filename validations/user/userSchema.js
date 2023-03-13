const joi = require("joi")
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);

const schema = {
    registerUser: joi.object({
        userName: joi
            .string()
            .max(20)
            .message({
                "string.min":"{#label} should contains at least {#limit} characters",
            })
            .required(),
        userEmail: joi
            .string()
            .email()
            .message("invalid email address")
            .required(),
        password: joiPassword
            .string()
            .minOfSpecialCharacters(1)
            .minOfLowercase(1)
            .minOfUppercase(1)
            .minOfNumeric(1)
            .noWhiteSpaces()
            .required()
            .messages({
                'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
                'password.minOfSpecialCharacters':
                '{#label} should contain at least {#min} special character',
                'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
                'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
                'password.noWhiteSpaces': '{#label} should not contain white spaces'
            }),
        phoneNo: joi
            .number()
            .integer()
            .min(100000000)
            .max(9999999999)
            .message("invalid mobile number")
            .required(),
        city: joi
            .string()
            .required(),
        address: joi
            .string()
            .required()
    }).unknown(true),



loginUser: joi.object({
    userEmail: joi.string().email().required(),
    password: joi.string().required(),

}).unknown(true)
}

module.exports = schema
  
