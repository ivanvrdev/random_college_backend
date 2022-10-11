import bcrypt from 'bcryptjs'

import User from '../models/user.model.js'

export const createUser = async (req, res) => {    
    try {
        const { username, password, email, phone, types } = req.body

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

        const { username, email, phone, type } = req.query

        const filters = {}

        if(username) filters.username = username
        if(email) filters.email = email
        if(phone) filters.phone = phone
        if(type) filters.types = {$all: [type]}

        const users = await User.find({...filters, active: true})

        if(users.length < 1) {
            res.status(404).json({
                message: 'No se encontraron usuarios...',
            })
            return
        }

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

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findById(id)

        if(!user) {
            res.status(404).json({
                message: 'Usuario no encontrado'
            })
            return
        }

        res.status(200).json({
            message: 'Usuario encontrado',
            user
        })
    } catch(e) {
        res.status(400).json({
            message: 'Error al encontrar usuario',
        })
        console.log('/src/controllers/user.controllers.js - línea 45: Error al obtener la lista de usuarios: ', e)
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const fields = req.body

        //avatar image uri
        if(req.file?.path) {
            if(!fields.profile) {
                fields.profile = {}
            }
            fields.profile.avatar = req.file.path
        }

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
    try {
        const { id } = req.params
        
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