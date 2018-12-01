const { readdirSync } = require('fs')
let models = readdirSync(__dirname)
models = models
  .map(model => (model = model.split('.')[0]))
  .filter(model => model !== 'index')

let modelRequire = {}
models.map(
  model => (modelRequire = { ...modelRequire, [model]: require(`./${model}`) })
)
module.exports = modelRequire
