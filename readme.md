# BoilerPlate API Nodejs

## Description

This boilerPlate have all the primary configurations to start a nodejs API with Express and MongoDB with the initial settings

## Repository URL

https://github.com/cunhapatrick/boilerplate-nodejs.git

## Initial env Settings

run `yarn mount aplication_name Online_Repository_URL`
run `yarn appSecretGenerate keyword` , copy the hash inside .env variable APP_SECRET

## Download MongoDB (development)

go to https://www.mongodb.com/download-center/community and follow instructions to download
or download docker mongodb container inside develop enviroment
or go to https://mlab.com/home and create a database
after download and installation, create a database with users collection

## Create Database User

run commands `mongo` to iniciate mongo shell
run commands inside mongo shell `use database_name` ,`db.createUser({user: "username",pwd:"userpassword",roles:[{role:"readWrite",db:"databasename"}]})` , changing the username, userpassword and databasename to the respective data of your project

## Initial Database Configuration

After create the database and it's user, goto .env file and inform the data
goto server.js on project root and uncomment the const db and it's listener

```
const db = require('./src/config/mongoose')
db.once('open', () => console.log('Database is Online'))
db.on('err', err => console.log(err))
```

## Init Server

run `yarn`, after that run `yarn start`
