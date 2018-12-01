const { compareSync } = require('bcrypt-nodejs')
const UserModel = require('../models/user')

class AuthController {
  verifyAuth (req, res) {
    const { authtype } = req.headers

    switch (authtype) {
      case 'local':
        return this.localAuth(req.res)

      default:
        return { error: 'no auth identify' }
    }
  }

  async localAuth (req, res) {
    const { email, password } = req.headers
    let user = await UserModel.findOne({ 'local.email': email })

    if (user === 'null') return { error: 'Invalid email' }
    else if (
      !compareSync(password + process.env.APP_SECRET, user.local.password)
    ) {
      return { error: 'Invalid password' }
    } else return true
  }
}

module.exports = new AuthController()
