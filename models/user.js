class User {
    constructor() {
        this.mongoose = require('mongoose')
        this.Schema = this.mongoose.Schema
    }

    model() {
        const userSchema = new this.Schema({

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

        if (this.mongoose.modelNames().find(collectionName => collectionName === 'user')) return this.mongoose.model('user')
        else return this.mongoose.model('user', userSchema)

    }
}

module.exports = User;
