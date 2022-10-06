import Degree from '../models/degree.model.js'

    export const createDeegre = async (req, res) => {
    
    try {
        const {
            name,
            description,
            duration,
            boss
        } = req.body

        const newDeegre = new Degree({
            name,
            description,
            duration,
            boss
        })

        await newDeegre.save()

        res.status(201).json({
            message: 'Carrera creada correctamente!'
        })

    } catch(e) {
        res.status(400).json({
            message: 'Error al crear la carrera...'
        })
        console.log('Error al crear la carrera: ', e)
    }
}

export const getDegrees = async (req, res) => {
    try {
        const { student } = req.query

        const filters = {}

        if(student) filters.students = {$elemMatch: {user: student}}

        const degrees = await Degree.find({...filters, active: true})
        .populate('subjects.data')
        .populate('students.user')

        if(degrees.length < 1) {
            res.status(404).json({
                message: 'No se encontró ninguna carrera'
            })
            return
        }

        res.status(200).json({
            message: 'Lista de carreras',
            degrees
        })
    }catch(e){
        res.status(400).json({
            message: 'Error al obtener la lista de carreras'
        })
        console.log('Error al obtener la lista de carreras ', e)
    }
}

export const getDegreeById = async (req, res) => {
    try {
        const { id } = req.params

        const degree = await Degree.findById(id)
        .populate('subjects.data')
        .populate('students.user')

        if(!degree) {
            res.status(404).json({
                message: 'No se encontró ninguna carrera'
            })
            return
        }

        res.status(200).json({
            message: 'Carrera encontrada',
            degree
        })
    }catch(e){
        res.status(400).json({
            message: 'Error al encontrar carrera'
        })
        console.log('Error al encontrar carrera: ', e)
    }
}

export const updateDegree = async (req, res) => {
    try {
        const { id } = req.params
        const fields = req.body

        const updated = await Degree.findByIdAndUpdate(id, fields, {new: true})

        res.status(201).json({
            message: 'Carrera actualizada correctamente!',
            degree: updated
        })
    } catch(e) {
        res.status(400).json({
            message: 'Error al actualizar la carrera...'
        })
        console.log('Error al actualizar la carrera: ', e)
    }
}

export const deleteDeegre = async (req, res) => {
    try{
        const { id } = req.params

        await Degree.findByIdAndDele1e(id)

        res.status(201).json({
            message: 'Carrera eliminada correctamente!'
        })
    }catch(e){
        res.status(400).json({
            message:  'Error al eliminar carrera...'
        })
        console.log('Error al eliminar carrera: ', e)
    }
}