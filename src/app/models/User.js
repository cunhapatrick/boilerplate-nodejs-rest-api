const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwi = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.compareHash = function (password) {
  return bcrypt.compare(password, this.password)
}

userSchema.statics.generateToken = function ({ id }) {
  return jwi.sign({ id }, process.env.APP_SECRET, {
    expiresIn: 86400
  })
}

module.exports = mongoose.model('User', userSchema)
