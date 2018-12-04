const Model = require(`../models/Model`)

class ModelController {
  async index (req, res) {
    const model = new Model(req.params.collection).model()
    const filters = {}
    const docs = await model.paginate(filters, {
      limit: 20,
      page: req.query.page || 1,
      sort: '-created_at'
    })
    return res.json(docs)
  }

  async show (req, res) {
    const model = new Model(req.params.collection).model()
    return res.json(await model.findById(req.params.id))
  }

  async store (req, res) {
    const Doc = new Model(req.params.collection).model(req.body)
    const doc = Doc.create(req.body)
    return res.json(doc)
  }

  async update (req, res) {
    const model = new Model(req.params.collection).model(req.body)

    return res.json({
      doc: await model.findOneAndUpdate(req.params.id, req.body, {
        new: true
      })
    })
  }

  async destroy (req, res) {
    const model = new Model(req.params.collection).model()
    await model.findOneAndDelete(req.params.id)
    return res.send()
  }
}

module.exports = new ModelController()
