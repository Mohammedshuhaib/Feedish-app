const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const User = require('../../models/userModel')
const expressAsyncHandler = require('express-async-handler')
const createError = require('../../createError')
dotenv.config()
module.exports = {

  Token: expressAsyncHandler(async (req, res, next) => {
    const { refreshToken, userId } = req.cookies
    if (!refreshToken) return next(createError(401, 'token not found'))
    const checkToken = await User.findOne({ _id: userId, refreshToken })
    if (!checkToken) return next(createError(401, 'token does not match'))
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return next(createError(403, 'Token not verified'))
      const accessToken = this.generateAccessToken({ name: user.name })
      res.cookie('accessToken', accessToken, { maxAge: 9000, http: true })
    })
  }),

  generateAccessToken: (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
  }

}
