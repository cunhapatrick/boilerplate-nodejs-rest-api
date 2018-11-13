#BoilerPlate API Nodejs

## Description

    This boilerPlate have all the primary configurations to start a nodejs API with Express and MongoDB with the initial settings

## How to use with https

    git clone https://gitlab.com/PatrickCunha/boilerplate-api-nodejs.git

## How to use with SSH

    First of all you have to generate and register your ssh key inside the gitlab then after that just use the command above
    git clone git@gitlab.com:PatrickCunha/boilerplate-api-nodejs.git

## Generate and register SSH Key

    

## Initial env Settings

    run the following bash command -> on terminal npm run mount "aplication name" "Online Repository URL"
    after that run the next command -> npm run appSecretGenerate "keyword", copy the hash inside .env

## Download MongoDB (development)

    go to https://www.mongodb.com/download-center/community and follow instructions to download
    or download docker mongodb container inside develop enviroment
    or go to https://mlab.com/home and create a database
    after download and installation, create a database with users collection

## Create Database User

    after install mongo open mongo shell with command on terminal -> mongo
    use database_name
    db.createUser({user: "username",pwd:"userpassword",roles:[{role:"readWrite",db:"databasename"}]})