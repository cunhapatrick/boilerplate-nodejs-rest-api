//const Mongoose = require('../models/model')
import Model from '../models/model'
import moment from 'moment'
const ObjectId = require("mongoose").Types.ObjectId

export default class ModelController extends Model {

    constructor(req) {

        super(req.params.collection)

        this.req = req

    }

    selectAll() {
        return this.model().find()

    }

    selectOne() {

        return this.model().find(this.req.query)

    }

    insert() {

        const document = new ( this.model(this.req.body) )(this.req.body)

        return document.save().then(save => save)

    }

    updateOne() {

        let model = this.model(this.req.body)

        let update_fields = this.req.body

        update_fields.updated_at = moment().toDate()

        model.updateOne({ _id: ObjectId(this.req.params.id) }, update_fields, (err, raw) => {

            if (err) return err

            else return raw

        })

    }

    deleteOne() {

        this.model().deleteOne({ _id: ObjectId() }, err => {

            if (err) return err

            else return true

        })

    }

}