require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)

module.exports = {

  sendOtp: (Mobilenumber) => new Promise((resolve, reject) => {
    try {
      const verification = client.verify.v2.services(process.env.TWILIO_SERVIECE_ID)
        .verifications
        .create({ to: `+91${Mobilenumber}`, channel: 'sms' })
      resolve(verification)
    } catch (err) {
      reject(err)
    }
  }),

  verifyOtp: (Mobilenumber, otp) => new Promise((resolve, reject) => {
    client.verify.v2.services(process.env.TWILIO_SERVIECE_ID)
      .verificationChecks
      .create({ to: `+91${Mobilenumber}`, code: otp })
      .then(verification_check => resolve(verification_check.status))
      .catch((err) => reject(err))
  })

}
