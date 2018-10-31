const express = require('express');
const cors = require('cors')

const app = express();
module.exports = () => {

    //view engine
    //app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'ejs'); //This line set the view engine or simply presentation factor to EJS which is responsible for HTML rendering.

    //request logger on terminal
    //app.use(logger('dev'));

    //request body em json
    app.use(express.json())

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
    
    return app;
};