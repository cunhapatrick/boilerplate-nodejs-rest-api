import mongoose from 'mongoose'
import moment from 'moment'

export default class Model {

    constructor(collection) {

        this.collection = collection

    }

    collectionName() {

        return this.collection
    
    }

    model(fields = undefined){

        if (typeof fields === "undefined") {

            return mongoose.modelNames().find(collectionName => collectionName === this.collection) ? mongoose.model(this.collection) : mongoose.model(this.collection, {})

        } else {
            
            let schemaAttr = {}, schema

            Object.keys(fields).map(name => {

                //check if field is string or date
                if (typeof fields[name] === "string") schemaAttr[name] = moment(fields[name], ['YYYY-MM-DD', 'YYYY-MM-DDTHH:mm:ss.SSSZ'], true).isValid() ? Date : String

                //other types    
                else schemaAttr[name] = typeof fields[name]

            })

            schemaAttr.created_at = { type: Date, default: Date.now }

            schemaAttr.updated_at = { type: Date, default: Date.now }

            schema = new Schema(schemaAttr)

            if (mongoose.modelNames().find(collectionName => collectionName === this.collection)) {

                delete mongoose.models[this.collection]

                return mongoose.model(this.collection, schema)

            } else {

                return mongoose.model(this.collection, schema)

            }
        }
    }
}