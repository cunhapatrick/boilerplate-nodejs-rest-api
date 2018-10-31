const dotenv = require('dotenv')
const moment = require('moment')

dotenv.config({
    path: 'config/env/.env',
    silent: true
});

const init = () => {
    
    //import express configuration and init
    const app = require('./config/express')()
    
    //start server
    app.listen(process.env.PORT);
    
    //import and initialize mongodb(uncomment db command lines below)
    //const db = require('./config/mongoose')()

    //check if database is connected
    //db.once('open', () => console.log('Database is Online'))

    //check any database error on connection
    //db.on('err', err => console.log(err))
    
    console.log(`Onpass is listening on port ${process.env.PORT}.... DATETIME: ${moment().format('DD/MM/YYYY hh:mm:ss a')}`)

    module.exports = app;
}

init();