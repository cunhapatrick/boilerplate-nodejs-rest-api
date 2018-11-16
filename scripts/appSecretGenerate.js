const bcrypt = require('bcrypt-nodejs')

const { argv,env } = process

if (argv.length !== 4) return console.log('Por favor passe a senha como argumento!');


const senha = argv[3];

console.log('Gerando hash...');

const hash = bcrypt.hashSync(senha);

console.log('APP SECRET CRIADO!!!',"Por favor cole o hash abaixo dentro do respectivo DEV_APP_SECRET || APP_SECRET(DEV = develop)")
console.log(hash)