const { config } = require('dotenv')
config({ path: './src/config/env/.env', silent: true })
const server = require('./src/config/express.js')
// const db = require('./src/config/mongoose')
// db.once('open', () => console.log('Database is Online'))
// db.on('err', err => console.log(err))

const { NODE_ENV } = process.env

let port

if (NODE_ENV === 'development') port = process.env.DEV_PORT
else port = process.env.PORT

server.listen(port || 3000, () => {
  console.log(
    `Server is running on ${NODE_ENV} enviromnent on uri http://localhost:${port}`
  )
})
