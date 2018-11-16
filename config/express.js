import express, { json } from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import moment from 'moment'

config({
    path: 'config/env/.env',
    silent: true
});

let port

if (process.env.NODE_ENV === "development") port = process.env.DEV_PORT
else port = process.env.PORT

const app = express()

    //view engine
    //app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'ejs'); //This line set the view engine or simply presentation factor to EJS which is responsible for HTML rendering.

    //request logger on terminal
    //app.use(logger('dev'));

    //request body em json
    app.use(json())

    //Accept request of all origins
    app.use(cors())

    //request body urlencoded
    //app.use(express.urlencoded({extended:false}))

    //configuração de cookies
    //app.use(cookieParser())

    //Views path, 2 parameter string or array of strings
    app.set('views', 'views')

    //Routes e afins
    require('../routes/model')(app);
    
    app.listen(port)

    //import and initialize mongodb(uncomment db command lines below)
    import db from './mongoose'

    //check if database is connected
    db.once('open', () => console.log('Database is Online'))

    //check any database error on connection
    db.on('err', err => console.log(err))
    
    console.log(`Onpass is listening on port ${port}.... DATETIME: ${moment().format('DD/MM/YYYY hh:mm:ss a')}`)

    export default app