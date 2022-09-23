import bcrypt from 'bcryptjs'

import User from '../models/user.model.js'

export const createUser = async (req, res) => {
    const { username, password, email, phone, types } = req.body

    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
            username,
            password: hash,
            email,
            phone,
            types
        })

        await newUser.save()
        
        res.status(201).json({
            message: 'Usuario creado correctamente'
        })
    } catch(e) {
        res.status(400).json({
            message: 'Error al crear usuario'
        })
        console.log('/src/controllers/user.controllers.js - línea 29: Error al crear usuario: ', e)
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({active: true})

        res.status(200).json({
            message: 'Lista de usuarios',
            users
        })
    } catch(e) {
        res.status(400).json({
            message: 'Error al obtener la lista de usuarios',
        })
        console.log('/src/controllers/user.controllers.js - línea 45: Error al obtener la lista de usuarios: ', e)
    }
}

export const updateUser = async (req, res) => {
    const {id, ...fields} = req.body
    
    try {
        const updated = await User.findByIdAndUpdate(id, fields, {new: true})

        res.status(201).json({
            message: 'Usuario actualizado correctamente',
            user: updated
        })
    } catch(e) {
        res.status(400).json({
            message: 'Error al actualizar usuario',
        })
        console.log('/src/controllers/user.controllers.js - línea 63: Error al actualizar usuario: ', e)
    }
}

export const deleteUser = async (req, res) => {
    const {id} = req.params

    try {
        await User.findByIdAndDelete(id)

        res.status(201).json({
            message: 'Usuario eliminado correctamente'
        })
    } catch(e) {
        res.status(400).json({
            message: 'Error al eliminar usuario',
        })
        console.log('/src/controllers/user.controllers.js - línea 80: Error al eliminar usuario: ', e)
    }
}