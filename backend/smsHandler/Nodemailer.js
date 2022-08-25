const nodemailer = require('nodemailer')
const { eventNames } = require('../models/userModel')

module.exports = {
  sendOtpEmail: async (email, name) => new Promise(async (resolve, reject) => {
    const otpCode = Math.floor(100000 + Math.random() * 900000)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_USER, // generated ethereal user
        pass: process.env.NODEMAILER_PASS
      }
    })

    // send mail with defined transport object
    const clindOtpCode = {
      from: process.env.NODEMAILER_USER, // sender address
      to: email, // list of receivers
      subject: 'LiveDrive Email Varification', // Subject line
      text: `Hello ${name},Your livedrive verification code is ${otpCode}`
    }
    transporter.sendMail(clindOtpCode, (error, info) => {
      if (error) reject(error)
      resolve(otpCode)
    })
  })

}


