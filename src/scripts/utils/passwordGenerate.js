const bcrypt = require('bcrypt-nodejs')

const { argv } = process

const { APP_SECRET } = process.env

if (argv.length !== 4) {
  throw new Error('Por favor passe a senha como argumento!')
}

if (!APP_SECRET || APP_SECRET === '') {
  throw new Error('APP_SECRET não definido como variável de ambiente (env)')
}

const senha = argv[3]

console.log('Gerando hash...')

const hash = bcrypt.hashSync(senha + APP_SECRET)

console.log('Hash: ', hash)
