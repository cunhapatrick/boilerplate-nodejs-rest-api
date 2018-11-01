import {Schema,modelNames,model,models} from 'mongoose'
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

            return modelNames().find(collectionName => collectionName === this.collection) ? model(this.collection) : this.mongoose.model(this.collection, {})

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

            schema = new Schema(schemaAttr, {

                versionKey: false

            })

            if (modelNames().find(collectionName => collectionName === this.collection)) {

                delete models[this.collection]

                return model(this.collection, schema)

            } else {

                return model(this.collection, schema)

            }
        }
    }
}