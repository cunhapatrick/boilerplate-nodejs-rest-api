//const Mongoose = require('../models/model')
const Model = require('../models/model')
const ObjectId = require('mongoose').Types.ObjectId

class ModelController extends Model {

    constructor(req, res) {

        super(req.params.collection)

        this.req = req

        this.res = res

    }

    async selectAll() {
        this.res.json(await this.model().find())

    }

    async selectOne() {

        this.res.json(await this.model().findById(this.req.params.id))

    }

    async insert() {

        let model = this.model(this.req.body)

        const document = new model(this.req.body)

        this.res.json(await document.save().then(save => save))

    }

    async updateOne() {

        const moment = require('moment')

        let model = this.model(this.req.body)

        let update_fields = this.req.body

        update_fields.updated_at = moment().toDate()

        model.updateOne({ _id: ObjectId(this.req.params.id) }, update_fields, (err, raw) => {

            if (err) this.res.json(err)

            else this.res.json(raw)

        })

    }

    async deleteOne() {

        this.model().deleteOne({ _id: ObjectId() }, err => {

            if (err) this.res.json(err)

            else this.res.json({ "success": true })

        })

    }

}

module.exports = ModelController