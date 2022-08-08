const express = require('express')
const router = express.Router()
const userController = require('../controller/user/Authentication')

router.post('/google_signup', userController.GoogleSignup)

router.post('/signup', userController.Signup)

router.post('/submitOtp', userController.Verifyotp)

router.post('/resendOtp', userController.ResendOtp)

router.post('/loginMobile', userController.LoginWithMobile)

router.post('/submitLoginOtp', userController.verifyLoginOtp)

module.exports = router
