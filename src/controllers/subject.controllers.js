import Subject from '../models/subject.model.js'

export const createSubject = async (req, res) => {
    
    try {
        const {
            name,
            description,
            duration,
            start_date,
            end_date
        } = req.body

        const newSubject = new Subject({
            name,
            description,
            duration,
            start_date,
            end_date
        })

        await newSubject.save()

        res.status(201).json({
            message: 'Materia creada correctamente!'
        })

    } catch(e) {
        res.status(400).json({
            message: 'Error al crear la materia...'
        })
        console.log('Error al crear materia: ', e)
    }
}

export const getSubjects = async (req, res) => {
    try {

        const { teacher, student } = req.query

        const filters = {}

        if(teacher) filters.teachers = {$elemMatch: {user: teacher}}
        if(student) filters.students = {$elemMatch: {user: student}}

        const subjects = await Subject.find({...filters, active: true})
        .populate('students.user')
        .populate('teachers.user')

        if(subjects.length < 1) {
            res.status(404).json({
                message: 'No se encontró ninguna materia'
            })
            return
        }

        res.status(200).json({
            message: 'Lista de materias',
            subjects
        })
    }catch(e){
        res.status(400).json({
            message: 'Error al obtener la lista de materias'
        })
        console.log('Error al obtener la lista de materias: ', e)
    }
}

export const getSubjectById = async (req, res) => {
    try {
        const { id } = req.params

        const subject = await Subject.findById(id)
        .populate('students.user')
        .populate('teachers.user')

        if(!subject) {
            res.status(404).json({
                message: 'No se encontró ninguna materia'
            })
            return
        }

        res.status(200).json({
            message: 'Materia encontrada',
            subject
        })
    }catch(e){
        res.status(400).json({
            message: 'Error al encontrar materia'
        })
        console.log('Error al encontrar materia: ', e)
    }
}

export const updateSubject = async (req, res) => {
    try {
        const { id } = req.params
        const fields = req.body

        const updated = await Subject.findByIdAndUpdate(id, fields, {new: true})

        res.status(201).json({
            message: 'Materia actualizada correctamente!',
            subject: updated
        })
    } catch(e) {
        res.status(400).json({
            message: 'Error al actualizar la materia...'
        })
        console.log('Error al actualizar la materia: ', e)
    }
}

export const deleteSubject = async (req, res) => {
    try{
        const { id } = req.params

        await Subject.findByIdAndDele1e(id)

        res.status(201).json({
            message: 'Materia eliminada correctamente!'
        })
    }catch(e){
        res.status(400).json({
            message:  'Error al eliminar materia...'
        })
        console.log('Error al eliminar materia: ', e)
    }
}