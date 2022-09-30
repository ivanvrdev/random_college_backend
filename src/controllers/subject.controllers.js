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
        const subjects = await Subject.find({active: true})

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

export const updateSubject = async (req, res) => {
    try {
        const {id, ...body} = req.body

        const updated = await Subject.findByIdAndUpdate(id, body, {new: true})

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
        const {id} = req.body

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