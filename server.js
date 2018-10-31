import dotenv from 'dotenv'
dotenv.config({
    path: 'config/env/.env',
    silent: true
});

const init = () => {
    //import and initialize mongodb
    const db = require('./config/mongoose')();

    //import express configuration and init
    const app = require('./config/express')();

    //start server
    app.listen(process.env.PORT);

    //check if database is connected
    db.once('open', () => console.log('Database is Online'))

    //check any database error on connection
    db.on('err', err => console.log(err))
    console.log(`Onpass is listening on port ${process.env.PORT}.... DATETIME:${DATE.now()}`)

    module.exports = app;
}

init();