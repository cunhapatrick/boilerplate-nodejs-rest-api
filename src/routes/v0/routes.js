const ModelController = require('./controllers/ModelController')

// app = express
module.exports = app => {
  app.route('/').get((req, res) => res.render('index'))
  // middleware instancia class ModelController e atribui o objeto instanciado na requisição
  app
    .route(`/${__dirname}/a/:collection/:id`)
    .get(ModelController.selectAny)
    .put(ModelController.update)
    .delete(ModelController.delete)

  app
    .route(`/${__dirname}/a/:collection`)
    .get(ModelController.selectAll)
    .post(ModelController.store)
}
