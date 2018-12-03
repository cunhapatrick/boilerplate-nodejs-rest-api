const express = require('express')
const { json, urlencoded } = express
const cors = require('cors')
class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.middleware()
    this.routes()
  }

  middleware () {
    this.express.use(urlencoded({ extended: false }))
    this.express.use(json())
    this.express.use(cors())
    this.express.use(require(`../middlewares/v0/auth`))
  }

  routes () {
    require(`../routes/v0/routes.js`)(this.express)
  }
}

module.exports = new App().express
