const mongoose = require('mongoose')

class UserModel {
  model () {
    const userSchema = new mongoose.Schema({
      local: {
        email: String,
        password: String
      },
      facebook: {
        id: String,
        token: String,
        name: String,
        email: String
      },
      instagram: {
        id: String,
        token: String,
        name: String,
        email: String
      },
      twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
      },
      google: {
        id: String,
        token: String,
        email: String,
        name: String
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

    if (
      mongoose.modelNames().find(collectionName => collectionName === 'users')
    ) {
      return mongoose.model('users')
    } else return mongoose.model('users', userSchema)
  }
}

module.exports new UserModel()
