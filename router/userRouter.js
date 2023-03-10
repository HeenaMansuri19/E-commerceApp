const express = require('express');
const router = express.Router()
const user = require('../controller/userController')
const { upload } = require('../middlewares/imageStorage')
const auth = require('../middlewares/auth-middleware')
//const validation = require('../validations/user/userValidation')

router.post("/signup", upload.single("profilePic"), user.userSignUp)
router.post("/userlogin", auth.isUser, user.userLogin)
router.post("/sendemail", user.resetPasswordSendEmail)
router.post("/userResetPassword/:id/:token", user.userResetPassword)

module.exports = router;