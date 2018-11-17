//const Mongoose = require('../models/model')
import Model from '../models/model'
import moment from 'moment'
const ObjectId = require("mongoose").Types.ObjectId

export default class ModelController extends Model {

    constructor(req) {
        super(req.params.collection)
        
        this.query = req.query
        this.params = req.params
        this.body = req.body

    }
    selectAny() { return this.model.find(this.query) }
    
    store() { return (new (this.model(this.body))(this.body)).save() }
    
    selectAll() { return this.model.find()}
    
    update() {
        const model = this.model(this.body)
        let update_fields = this.body
        update_fields.updated_at = moment().toDate()
        return model.updateOne({_id: ObjectId(this.params.id)},update_fields,(err,raw)=> err ? err : raw)
    }
    delete() { return this.model.deleteOne({_id: ObjectId(this.params.id)},err => err ? err : true)}
}