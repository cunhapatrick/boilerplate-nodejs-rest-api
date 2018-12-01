const { basename } = require('path')
const { ModelController } = require(`../../controllers/${basename(__dirname)}`)

// app = express
module.exports = app => {
  app.route('/').get((req, res) => res.render('index'))
  // middleware instancia class ModelController e atribui o objeto instanciado na requisição
  app
    .route(`/${basename(__dirname)}/a/:collection/:id`)
    .get(ModelController.selectAny)
    .put(ModelController.update)
    .delete(ModelController.delete)

  app
    .route(`/${basename(__dirname)}/a/:collection`)
    .get(ModelController.selectAll)
    .post(ModelController.store)
}
