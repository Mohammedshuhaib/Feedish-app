const expressAsyncHandler = require('express-async-handler')
const Admin = require('../../models/adminModel')
const bcrypt = require('bcrypt')
const { createError } = require('../../createError')
const { generateAccessToken } = require('../user/Authorization')
const jwt = require('jsonwebtoken')

module.exports = {

  adminLogin: (expressAsyncHandler(async (req, res, next) => {
    const admin = await Admin.findOne({ email: req.body.Email })
    if (admin) {
      const response = await bcrypt.compare(req.body.Password, admin.password)
      if (response) {
        const email = { email: admin.email }
        const accessToken = generateAccessToken(email)
        const refreshToken = jwt.sign(email, process.env.REFRESH_TOKEN_SECRET)
        await Admin.updateOne({ _id: admin._id }, { $set: { refreshToken } })
        res.cookie('accessToken', accessToken, { maxAge: 6000, httpOnly: true })
        res.cookie('refreshToken', refreshToken, { httpOnly: true })
        res.cookie('uerId', admin._id, { httpOnly: true })
        return res.status(200).json('success')
      } else {
        return next(createError(401, 'password not match'))
      }
    } else {
      return next(createError(404, 'Data not getting'))
    }
  }))
}
