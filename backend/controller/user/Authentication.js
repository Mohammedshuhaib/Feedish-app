const User = require('../../models/userModel')
const { OAuth2Client } = require('google-auth-library')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { sendOtp, verifyOtp } = require('../../smsHandler/TwilioOtp')
const asyncHandler = require('express-async-handler')
const { generateAccessToken } = require('./Authorization')
const { createError } = require('../../createError')
const { sendOtpEmail } = require('../../smsHandler/Nodemailer')
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
      const accessToken = generateAccessToken(name)
      const refreshToken = jwt.sign(name, process.env.REFRESH_TOKEN_SECRET)
      users = { name, email, picture, refreshToken }
      const data = await User.create({ ...users })
      res.cookie('accessToken', accessToken, { maxAge: 6000, httpOnly: true })
      res.cookie('refreshToken', refreshToken, { httpOnly: true })
      res.cookie('uerId', data._id, { httpOnly: true })
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
    const data = req.body
    const user = await User.findOne({
      $or: [{ email: data.Email }, { mobileNumber: data.MobileNumber }]
    })
    if (user) {
      return next(
        createError(409, 'Email address or Mobile number are already exist')
      )
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
    console.log('--------------------twilio response--------------------', response)
    if (response === 'approved') {
      const user = { name: data.Name }
      const accessToken = generateAccessToken(user)
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
      const resp = await User.create({
        name: data.Name,
        email: data.Email,
        mobileNumber: data.MobileNumber,
        refreshToken
      })
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
      await sendOtp(mobileNumber)
      res.status(200)
      res.json({ status: 'ok' })
    }
  }),

  verifyLoginOtp: asyncHandler(async (req, res, next) => {
    const { OTP, data } = req.body
    const response = await verifyOtp(data, OTP)
    // const response = 'approved'
    if (response === 'approved') {
      const user = await User.findOne({ mobileNumber: data })
      const users = { name: user.Name }
      const accessToken = generateAccessToken(users)
      const refreshToken = jwt.sign(users, process.env.REFRESH_TOKEN_SECRET)
      await User.updateOne({ _id: user._id }, { $set: { refreshToken } })
      res.cookie('accessToken', accessToken, { maxAge: 6000, httpOnly: true })
      res.cookie('refreshToken', refreshToken, { httpOnly: true })
      res.cookie('uerId', user._id, { httpOnly: true })
      res.status(200).json('ok')
    } else {
      return next(createError(401, 'invalid Otp'))
    }
  }),

  LoginWithEmail: asyncHandler(async (req, res, next) => {
    try {
      const { email } = req.body
      const user = await User.findOne({ email })
      if (user) {
        const response = await sendOtpEmail(email, user.name)
        res.cookie('otpcode', response, { maxAge: 100000, httpOnly: true })
        return res.status(200).json('success')
      } else {
        return next(createError(404, 'no user'))
      }
    } catch (err) {
      console.log(err)
      return next(createError(500, 'server error'))
    }
  }),

  verifyEmailOtp: asyncHandler(async (req, res, next) => {
    const { otpcode } = req.cookies
    const { OTP, email } = req.body
    if (otpcode) {
      if (otpcode === OTP) {
        const user = await User.findOne({ email })
        const users = { name: user.Name }
        const accessToken = generateAccessToken(users)
        const refreshToken = jwt.sign(users, process.env.REFRESH_TOKEN_SECRET)
        await User.updateOne({ _id: user._id }, { $set: { refreshToken } })
        res.cookie('accessToken', accessToken, { maxAge: 6000, httpOnly: true })
        res.cookie('refreshToken', refreshToken, { httpOnly: true })
        res.cookie('uerId', user._id, { httpOnly: true })
        return res.status(200).json('successfully login')
      } else {
        return next(createError(401, 'otp dosnt match'))
      }
    } else {
      return next(createError(403, 'otp Expired'))
    }
  }),

  ResendEmailOtp: asyncHandler(async (req, res, next) => {
    const { email } = req.body
    const data = User.findOne(email)
    await sendOtpEmail(email, data.name)
    res.status(200).json('success')
  })

  // login end
}
