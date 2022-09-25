import { validateJWT } from "../utilities/jwt.js"

export const authenticateUser = (req, res, next) => {
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

    req.body.user = valid.data

    next()
}