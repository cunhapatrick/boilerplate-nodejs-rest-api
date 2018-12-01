const express = require('express')
const { json, urlencoded } = express
const cors = require('cors')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('connect-flash')
const { resolve } = require('path')
class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.middleware()
    this.view()
    this.routes()
  }

  middleware () {
    this.express.use(urlencoded({ extended: false }))
    this.express.use(json())
    this.express.use(cors())
    this.express.use(flash())
    this.express.use(
      session({
        name: 'root',
        store: new FileStore({
          path: resolve(__dirname, '..', 'tmp', 'sessions')
        }),
        secret: process.env.APP_SECRET,
        resave: true,
        saveUninitialized: true
      })
    )
    // this.express.use(require(`../middlewares/v0/auth`))
  }

  view () {
    this.express.use(express.static(resolve(__dirname, '..', 'views')))
    this.express.set('view engine', 'ejs')
  }

  routes () {
    require(`../routes/v0/routes.js`)(this.express)
  }
}

module.exports = new App().express
