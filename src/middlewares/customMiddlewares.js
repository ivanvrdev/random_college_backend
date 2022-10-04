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

export const authorizeAdminOnly = (req, res, next) => {
    const {user} = req.body

    if(!user.types.includes('admin')) {
        return res.status(403).json({
            message: 'No estás autorizado para realizar esta acción'
        })
    }

    next()
}

export const authorizeUpdateUser = (req, res, next) => {
    const {user, ...fields} = req.body
    const documentId = req.params.id
    
    const isAdmin = user.types.includes('admin')

    //sólo los administradores pueden editar el tipo de usuario
    if(!isAdmin && fields.types){

        return res.status(403).json({
            message: 'No estás autorizado para realizar esta acción'
        })
    }
    
    //el usuario sólo puede actualizar la información que le corresponde a sí mismo    
    if(!isAdmin && user._id.toString() !== documentId){

        return res.status(403).json({
            message: 'No estás autorizado para realizar esta acción'
        })
    }

    next()
}