//const Mongoose = require('../models/model')
const Model = require('../models/model')
const ObjectId = require("mongoose").Types.ObjectId

class ModelController extends Model {

    constructor(req) {

        super(req.params.collection)

        this.req = req

    }

    selectAll = () => {
        return this.model().find()

    }

    selectOne = () => {

        return this.model().findById(this.req.params.id)

    }

    insert = () => {

        let model = this.model(this.req.body)

        const document = new model(this.req.body)

        return document.save().then(save => save)

    }

    updateOne = () => {

        const moment = require('moment')

        let model = this.model(this.req.body)

        let update_fields = this.req.body

        update_fields.updated_at = moment().toDate()

        model.updateOne({ _id: ObjectId(this.req.params.id) }, update_fields, (err, raw) => {

            if (err) return err

            else return raw

        })

    }

    deleteOne = () => {

        this.model().deleteOne({ _id: ObjectId() }, err => {

            if (err) return err

            else return true

        })

    }

}

module.exports = ModelController