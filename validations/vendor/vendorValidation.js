const vendorModelSchema = require('../../models/vendorModelSchema')
const schema = require("../vendor/vendorSchema")

module.exports = {
    registerVendorValidation: async(req,res, next)=>{
        const value = await schema.registerVendor.validate(req.body,{abortEarly: false})
        if(value.error){
            res.json({
                success:0,
                message:value.error.details[0].message
            })
        }else{
            next()
        }
    },


loginVendorValidation: async (req, res, next) => {
    const value = await schema.loginVendor.validate(req.body, { abortEarly: false })
    if (value.error) {
        res.json({
            succes: 0,
            message: value.error.details[0].message
        })
    } else {
        next()
    }
},
}

