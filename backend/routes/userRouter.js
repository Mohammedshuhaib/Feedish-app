const express = require('express')
const router = express.Router()
const userController = require('../controller/user')

router.post('/google_signup', userController.GoogleSignup)

router.post('/signup', userController.Signup)

router.post('/submitOtp', userController.Verifyotp)

module.exports = router
