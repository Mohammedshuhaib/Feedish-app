const express = require('express')
const router = express.Router()
const userController = require('../controller/user/Authentication')
const Authorization = require('../controller/user/Authorization')

router.post('/google_signup', userController.GoogleSignup)

router.post('/signup', userController.Signup)

router.post('/submitOtp', userController.Verifyotp)

router.post('/resendOtp', userController.ResendOtp)

router.post('/loginMobile', userController.LoginWithMobile)

router.post('/submitLoginOtp', userController.verifyLoginOtp)

router.post('/token', Authorization.Token)

router.post('/sendEmailOtp', userController.LoginWithEmail)

router.post('/submitEmailOtp', userController.verifyEmailOtp)

module.exports = router
