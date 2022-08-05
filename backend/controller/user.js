const User = require('../models/userModel')
const { OAuth2Client } = require('google-auth-library')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { sendOtp, verifyOtp } = require('../smsHandler/TwilioOtp')
dotenv.config()

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
module.exports = {

  // authentication miidleware

  generateAccessToken: (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
  },

  // authentication miidleware end

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

  Signup: async (req, res) => {
    const { data } = req.body
    try {
      const response = await sendOtp(data.MobileNumber)
      console.log(response)
      if (response.status === 'pending') {
        res.status(200)
        res.json({ status: 'ok' })
      }
    } catch (err) {
      console.log(err)
      res.status(400)
      res.json({ status: 'error', err })
    }
  },

  // verify otp

  Verifyotp: async (req, res) => {
    try {
      const { OTP, data } = req.body
      const response = await verifyOtp(data.MobileNumber, OTP)
      if (response === 'approved') {
        const user = { name: data.Name }
        const accessToken = generateAccessToken(user)
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
        res.sendStatus(200).json({ accessToken, refreshToken })
      }
    } catch (err) {
      res.sendStatus(401)
    }
  }

  //  Singup end

}
