const bcrypt = require('bcryptjs')

const { argv } = process

if (argv.length !== 3) {
  throw new Error('Please, input the desired password as argument!')
}

const senha = argv[2]
const hash = bcrypt.hashSync(senha)

console.log('Generate hash...')
console.log(
  'APP SECRET CREATED!!!'
)
console.log('hash:',hash)
