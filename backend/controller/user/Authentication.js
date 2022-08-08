const User = require('../../models/userModel')
const { OAuth2Client } = require('google-auth-library')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { sendOtp, verifyOtp } = require('../../smsHandler/TwilioOtp')
const asyncHandler = require('express-async-handler')
const { generateAccessToken } = require('./Authorization')
const { createError } = require('../../createError')
dotenv.config()

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
module.exports = {

  // google signup start

  GoogleSignup: async (req, res) => {
    try {
      const { token } = req.body
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
      })
      let users = []
      const { name, email, picture } = ticket.getPayload()
      users = { name, email, picture }
      await User.create({ ...users })

      res.status(201)

      res.json({ name, email, picture, userLogin: true })
    } catch (err) {
      res.status(200)
      res.json({ userLogin: true })
    }
  },

  // google signup end

  //  Singup start

  Signup: asyncHandler(async (req, res, next) => {
    const { data } = req.body
    const user = await User.findOne({ $or: [{ email: data.Email }, { mobileNumber: data.MobileNumber }] })
    if (user) {
      return next(createError(409, 'Email address or Mobile number are already exist'))
    } else {
      await sendOtp(data.MobileNumber)
      res.status(200)
      res.json({ status: 'ok' })
    }
  }),

  // verify otp

  Verifyotp: asyncHandler(async (req, res, next) => {
    const { OTP, data } = req.body
    const response = await verifyOtp(data.MobileNumber, OTP)
    if (response === 'approved') {
      const user = { name: data.Name }
      const accessToken = generateAccessToken(user)
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
      data.refreshToken = refreshToken
      const resp = await User.create({ name: data.Name, email: data.Email, mobileNumber: data.MobileNumber, refreshToken })
      res.cookie('accessToken', accessToken, { maxAge: 6000, httpOnly: true })
      res.cookie('refreshToken', refreshToken, { httpOnly: true })
      res.cookie('uerId', resp._id, { httpOnly: true })
      return res.status(200).json({ message: 'Success' })
    } else {
      return next(createError(401, 'invalid Otp'))
    }
  }),

  // resent otp

  ResendOtp: asyncHandler(async (req, res, next) => {
    const { data } = req.body
    await sendOtp(data)
    res.status(200)
  }),

  //  Singup end

  // login start

  // login mobile number

  LoginWithMobile: asyncHandler(async (req, res, next) => {
    const { mobileNumber } = req.body
    const user = await User.findOne({ mobileNumber })
    if (user === null) {
      return next(createError(401, 'user not exists'))
    } else {
      // await sendOtp(data.MobileNumber)
      res.status(200)
      res.json({ status: 'ok' })
    }
  }),

  verifyLoginOtp: asyncHandler(async (req, res, next) => {
    const { OTP, data } = req.body

    // const response = await verifyOtp(data.MobileNumber, OTP)
    const response = 'approved'
    if (response === 'approved') {
      const user = await User.findOne({ mobileNumber: data })
      console.log(user)
      // const accessToken = generateAccessToken(user)
      // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
      // const resp = await User.create({ name: refreshToken })
      // res.cookie('accessToken', accessToken, { maxAge: 6000, httpOnly: true })
      // res.cookie('refreshToken', refreshToken, { httpOnly: true })
      // res.cookie('uerId', resp._id, { httpOnly: true })
      // return res.status(200).json({ message: 'Success' })
    } else {
      return next(createError(401, 'invalid Otp'))
    }
  })

  // login end

}
