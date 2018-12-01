const { basename } = require('path')
const { compareSync } = require('bcrypt-nodejs')
const { User } = require(`../../models/${basename(__dirname)}`)
const verifyAuth = (req, res, next) => {
  const { authtype } = req.headers

  switch (authtype) {
    case 'local':
      return localAuth(req, res, next)

    default:
      return res.json({ error: 'no auth identify' })
  }
}

const localAuth = async (req, res, next) => {
  const { email, password } = req.headers
  const user = await User.findOne({ 'local.email': email })

  if (user === 'null') return res.json({ error: 'Invalid email' })
  else if (
    !compareSync(password + process.env.APP_SECRET, user.local.password)
  ) {
    return res.json({ error: 'Invalid password' })
  } else return next()
}

module.exports = verifyAuth
