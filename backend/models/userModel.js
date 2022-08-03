const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    mobileNumber: { type: Number },
    email: { type: String, required: true },
    picture: { type: String, required: true }
  },
  { collection: 'userData' }
)

const model = mongoose.model('userData', userSchema)

module.exports = model
