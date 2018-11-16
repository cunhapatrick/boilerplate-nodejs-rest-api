import { compareSync } from 'bcrypt-nodejs';

export default class authController {

    constructor(req) {

        this.req = req

    }

    verifyAuth() {

        const type = this.req.headers.authtype

        switch (type) {

            case "local": return this.localAuth()

            default: return { "error": "no auth identify" }

        }

    }

    async localAuth(){

        const userModel = new ( require('../models/user') )()

        const User = userModel.model()

        let user = await User.findOne({ "local.email": this.req.headers.email })

        if (typeof user === null) return { "error": "Invalid email" }

        else if (!compareSync(this.req.headers.password + process.env.APP_SECRET, user.local.password)) return { "error": "Invalid password" }

        else return true

    }

}