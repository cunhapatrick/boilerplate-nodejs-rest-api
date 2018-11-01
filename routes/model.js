import ModelController from '../controllers/model';
import AuthController from '../controllers/auth';

//app = express
module.exports = app => {
    app.route('/').all((req, res) => {

        res.send("teste")

    })
    //middleware instancia class ModelController e atribui o objeto instanciado na requisição
    app.route('/v1/a/:collection/:id').all(async (req, res, next) => {

        let authController = new AuthController(req)

        const auth = await authController.verifyAuth()

        if (!auth.error) {

            req.modelController = new ModelController(req)

            next()

        } else {

            res.json(auth)

        }

    })

        .get(req => res.json( req.modelController.selectOne() ) )

        .put(req => res.json( req.modelController.updateOne() ) )

        .delete(req => res.json( req.modelController.deleteOne() ) )

    app.route('/v1/a/:collection').all(async (req, res, next) => {

        let authController = new AuthController(req)

        const auth = await authController.verifyAuth()

        if (!auth.error) {

            req.modelController = new ModelController(req)

            next()

        }

        else res.json(auth)

    })
        .get(req => res.json( req.modelController.selectAll() ) )

        .post(req => res.json( req.modelController.insert() ) )

}
