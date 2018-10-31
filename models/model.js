class Model {

    constructor(collection) {

        this.collection = collection

        this.mongoose = require('mongoose')

    }

    collectionName() {
        return this.collection
    }

    model(fields = undefined) {

        const Schema = this.mongoose.Schema

        if (typeof fields === "undefined") {

            return this.mongoose.modelNames().find(collectionName => collectionName === this.collection) ? this.mongoose.model(this.collection) : this.mongoose.model(this.collection, {})

        } else {
            let moment = require('moment')
            let schemaAttr = {}, schema

            Object.keys(fields).map(name => {

                //check if field is string or date
                if (typeof fields[name] === "string") schemaAttr[name] = moment(fields[name], ['YYYY-MM-DD', 'YYYY-MM-DDTHH:mm:ss.SSSZ'], true).isValid() ? Date : String

                //other types    
                else schemaAttr[name] = typeof fields[name]

            })

            schemaAttr.created_at = { type: Date, default: Date.now }

            schemaAttr.updated_at = { type: Date, default: Date.now }

            schema = new Schema(schemaAttr, {
                versionKey: false
            })

            if (this.mongoose.modelNames().find(collectionName => collectionName === this.collection)) {

                delete this.mongoose.models[this.collection]

                return this.mongoose.model(this.collection, schema)

            } else {

                return this.mongoose.model(this.collection, schema)

            }
        }
    }
}

module.exports = Model