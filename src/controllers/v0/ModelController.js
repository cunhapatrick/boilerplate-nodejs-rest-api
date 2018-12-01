const { basename } = require('path')
const { Model } = require(`../../models/${basename(__dirname)}`)
const moment = require('moment')
const ObjectId = require('mongoose').Types.ObjectId

class ModelController {
  async selectAny (req, res) {
    const model = new Model(req.params.collection)
    return res.json({ docs: await model.find(req.query) })
  }

  async store (req, res) {
    const Doc = new Model(req.params.collection).model(req.body)
    const doc = new Doc(req.body)
    return res.json({ doc: await doc.save() })
  }

  async selectAll (req, res) {
    const model = new Model(req.params.collection).model()
    return res.json({ docs: await model.find() })
  }

  async update (req, res) {
    const model = new Model(req.params.collection).model(req.body)
    const updateFields = { ...req.body, updated_at: moment().toDate() }

    return res.json({
      doc: await model.updateOne({ _id: ObjectId(req.params.id) }, updateFields)
    })
  }
  async delete (req, res) {
    const model = new Model(req.params.collection).model()
    return res.json({
      doc: await model.deleteOne({ _id: ObjectId(req.params.id) })
    })
  }
}

module.exports = new ModelController()
