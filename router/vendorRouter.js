const express = require('express');
const router = express.Router()
const vendor = require('../controller/vendorController')
const { upload } = require('../middlewares/imageStorage');
const validation = require('../validations/vendor/vendorValidation')
const auth = require('../middlewares/auth-middleware')

router.post("/signup", upload.single("profilePic"),validation.registerVendorValidation,vendor.vendorSignUp)
router.post("/vendorlogin",auth.isVendor,validation.loginVendorValidation,vendor.vendorLogin)
router.post("/sendemail",vendor.resetPasswordSendEmail)
router.post("/vendorResetPassword/:id/:token",vendor.vendorResetPassword)

module.exports = router;