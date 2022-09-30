import { validateJWT } from "../utilities/jwt.js"
import User from '../models/user.model.js'

export const authenticateUser = async (req, res, next) => {
    const token = req.get('token')

    if(!token) {
        res.status(401).json({
            message: 'Usuario no autorizado'
        })
        return
    }

    const valid = validateJWT(token)

    if(!valid) {
        res.status(401).json({
            message: 'Usuario no autorizado'
        })
        return
    }

    const user = await User.findById(valid.data.id)

    req.body.user = user

    next()
}