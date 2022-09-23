import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'

const logIn = async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await User.findOne({username})

        if(!user){
            res.status(200).json({
                message: 'Usuario no encontrado'
            })
            return
        }

        if(!bcrypt.compareSync(password, user.password)){
            res.status(200).json({
                message: 'Contraseña incorrecta'
            })
            return
        }

        res.status(200).json({
            message: `Bienvenido ${user.username}` 
        })

    } catch(e) {
        res.status(400).json({
            message: 'Error al autenticar usuario',
        })
        console.log('/src/controllers/login.controller.js - línea 13: Error al autenticar usuario: ', e)
    }
}

export default logIn 
