import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import { generateJWT } from '../utilities/jwt.js'

const errorResponse = {
    message: 'Error al autenticar usuario',
    type: 'danger'
}

const logIn = async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await User.findOne({username, active: true})

        if(!user){
            res.status(401).json(errorResponse)
            return
        }

        if(!bcrypt.compareSync(password, user.password)){
            res.status(401).json(errorResponse)
            return
        }

        const token = generateJWT({data: {id: user._id}})

        res.status(200).json({
            message: `Bienvenido ${user.username}`,
            type: 'success',
            user,
            token
        })

    } catch(e) {
        res.status(400).json(errorResponse)
        console.log('/src/controllers/login.controller.js - línea 13: Error al autenticar usuario: ', e)
    }
}

export default logIn 
