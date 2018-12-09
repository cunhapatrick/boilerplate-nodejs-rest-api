const bcrypt = require('bcryptjs')

const { argv } = process

const { APP_SECRET } = process.env

if (argv.length !== 3) {
  throw new Error('Please, input the password as argument!')
}

if (!APP_SECRET || APP_SECRET === '') {
  throw new Error('APP_SECRET not defined on enviromnent file (.env)')
}

const senha = argv[2]

console.log('Generate hash...')

const hash = bcrypt.hashSync(senha + APP_SECRET)

console.log('Hash: ', hash)
