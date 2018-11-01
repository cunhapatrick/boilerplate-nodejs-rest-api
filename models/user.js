//import mongoose,{Schema} from 'mongoose'
import {Schema,model,modelNames} from 'mongoose'

export default class User {

    model() {
        const userSchema = new Schema({

            local: {
                email: String,
                password: String
            },
            facebook: {
                id: String,
                token: String,
                name: String,
                email: String
            },
            instagram: {
                id: String,
                token: String,
                name: String,
                email: String
            },
            twitter: {
                id: String,
                token: String,
                displayName: String,
                username: String
            },
            google: {
                id: String,
                token: String,
                email: String,
                name: String
            },
            created_at: {
                type: Date,
                default: Date.now
            },
            updated_at: {
                type: Date,
                default: Date.now
            }
        }, {
                versionKey: false
            })

        if (modelNames().find(collectionName => collectionName === 'users')) return model('users')
        else return model('users', userSchema)

    }
}
