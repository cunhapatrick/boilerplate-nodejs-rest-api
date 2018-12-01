const { readdirSync } = require('fs')
let controllers = readdirSync(__dirname)
controllers = controllers
  .map(controller => controller.split('.')[0])
  .filter(controller => controller !== 'index')
let controllerRequire = {}
controllers.map(
  controller =>
    (controllerRequire = {
      ...controllerRequire,
      [controller]: require(`./${controller}`)
    })
)
module.exports = controllerRequire
