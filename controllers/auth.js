import { compareSync } from 'bcrypt-nodejs';
import userModel from '../models/user'

export default class authController {

    constructor(req) {

        this.req = req

    }

    verifyAuth() {

        const {authtype} = this.req.headers

        switch (authtype) {

            case "local": return this.localAuth()

            default: return { "error": "no auth identify" }

        }

    }

    async localAuth(){
        const {email,password} = this.req.headers

        const User = userModel.model()

        let user = await User.findOne({ "local.email": email })

        if (typeof user === null) return { "error": "Invalid email" }

        else if (!compareSync( password + process.env.APP_SECRET, user.local.password)) return { "error": "Invalid password" }

        else return true

    }

}