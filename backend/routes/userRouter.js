const express = require('express')
const router = express.Router()
const userController = require('../controller/user/Authentication')
const Authorization = require('../controller/user/Authorization')

router.post('/google-signup', userController.googleSignup)

router.post('/signup', userController.signup)

router.post('/submit-otp', userController.verifyOtp)

router.post('/resend-otp', userController.resendOtp)

router.post('/login-mobile', userController.loginWithMobile)

router.post('/submit-loginotp', userController.verifyLoginOtp)

router.post('/token', Authorization.token)

router.post('/send-emailotp', userController.loginWithEmail)

router.post('/submit-emailotp', userController.verifyEmailOtp)

router.post('/resend-emailotp', userController.resendEmailOtp)

module.exports = router
