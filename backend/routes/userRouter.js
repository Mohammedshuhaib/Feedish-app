const express = require('express')
const { OAuth2Client } = require('google-auth-library')
const router = express.Router()
const dotenv = require('dotenv')
const User = require('../models/userModel')

dotenv.config()
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
router.get('/', (req, res) => {
  console.log('iam in landing patge')
})

let users = []


router.post('/google_signup', async (req, res) => {
  const { token } = req.body

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID
  })
  const { name, email, picture } = ticket.getPayload()
  users = {name, email, picture}
  await User.create({...users})

  res.status(201)

  res.json({ name, email, picture })
})

module.exports = router
