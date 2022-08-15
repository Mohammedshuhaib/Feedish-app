const nodemailer = require('nodemailer')

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
      text: `Your verification code is ${otpCode}`, // plain text body
      html: '<p>For clients that do not support AMP4EMAIL or amp content is not valid</p>',
      amp: `<!doctype html>
      <html ⚡4email>
        <head>
          <meta charset="utf-8">
          <style amp4email-boilerplate>body{visibility:hidden}</style>
          <script async src="https://cdn.ampproject.org/v0.js"></script>
          <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
        </head>
        <body>
        <h1>Hello ${name},</h1>
        <p>Your Feedish app verification code is - <a href='#' >${otpCode}</a> </p>
        <p>Lets order now</p>
           <amp-anim src="https://media.giphy.com/media/Hn8aoHEZFKhTINisXz/giphy.gif" width="500" height="350"/></p>
        </body>
      </html>`
    }
    transporter.sendMail(clindOtpCode, (error, info) => {
      if (error) reject(error)
      resolve(otpCode)
    })
  })

}
