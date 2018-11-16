//const Mongoose = require('../models/model')
import Model from '../models/model'
import moment from 'moment'
const ObjectId = require("mongoose").Types.ObjectId

export default class ModelController extends Model {

    constructor(req) {
        super(req.params.collection)

        this.selectAll = () => this.model.find()

        this.selectAny = () => this.model.find(req.query)

        this.store = () => (new (this.model(req.body))(req.body)).save()

        this.update = () => {
            const model = this.model(req.body)
            let update_fields = req.body
            update_fields.updated_at = moment().toDate()
            model.updateOne({_id: ObjectId(req.params.id)},update_fields,(err,raw)=> err ? err : raw)
        }

        this.delete = () => this.model.deleteOne({_id: ObjectId(req.params.id)},err => err ? err : true)

    }

}