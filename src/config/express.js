const express = require('express')
const cors = require('cors')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('connect-flash')
const path = require('path')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.middleware()
    this.view()
    this.routes()
  }

  middleware () {
    this.express.use(express.urlencoded({ extende: false }))
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(flash())
    this.express.use(
      session({
        name: 'root',
        store: new FileStore({
          path: path.resolve(__dirname, '..', 'tmp', 'sessions')
        }),
        secret: process.env.APP_SECRET,
        resave: true,
        saveUninitialized: true
      })
    )
  }

  view () {
    this.express.use(express.statis(path.resolve(__dirname, '..', 'views')))
    this.express.set('view engine', 'ejs')
  }

  route () {
    this.express.use(require('../routes/routes.js'))
  }
}

module.exports = new App().express
