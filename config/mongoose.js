import mongoose from 'mongoose'
const {env} = process

let uri
    
if (env.NODE_ENV == 'development') uri = `mongodb://${env.DEV_DB_USER}:${env.DEV_DB_PASSWORD}@${env.DEV_DB_HOST}:${env.DEV_DB_PORT}/${env.DEV_DB_NAME}`
else uri = `mongodb://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`

const config = {
    db: uri,
    dbOptions: {
        useNewUrlParser: true,
        //autoIndex: false, // Don't build indexes (verificar com carinho para ganhar performance em production)
        reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
        reconnectInterval: 500, // Reconnect every 500ms
        poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0,
        connectTimeoutMS: 30000, // Give up initial connection after 30 seconds
        socketTimeoutMS: 60000, // Close sockets after 60 seconds of inactivity
        family: 4 // Use IPv4, skip trying IPv6
    }
}

//let db = mongoose.createConnection(config.db,config.dbOptions)
mongoose.connect(config.db, config.dbOptions)
export default mongoose.connection
