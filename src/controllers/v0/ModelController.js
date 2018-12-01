const Model = require('../models/Model')
const moment = require('moment')
const ObjectId = require('mongoose').Types.ObjectId

class ModelController {
  async selectAny (req, res) {
    const model = new Model(req.params.collection)
    return res.json({ docs: await model.find(req.query) })
  }

  async store (req, res) {
    const model = new Model(req.params.collection)
    const DocModel = model(req.body)
    const doc = new DocModel(req.body)
    return res.json({ doc: await doc.save() })
  }

  async selectAll (req, res) {
    const model = new Model(req.params.collection)
    return res.json({ docs: await model.find() })
  }

  async update (req, res) {
    const model = new Model(req.params.collection)
    const DocModel = model(req.body)
    const updateFields = { ...req.body, updated_at: moment().toDate() }

    return res.json({
      doc: await DocModel.updateOne(
        { _id: ObjectId(req.params.id) },
        updateFields
      )
    })
  }
  async delete (req, res) {
    const model = new Model(req.params.collection)
    return res.json({
      doc: await model.deleteOne({ _id: ObjectId(req.params.id) })
    })
  }
}

module.exports = new ModelController()
