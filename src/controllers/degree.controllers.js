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
        const degrees = await Degree.find({active: true})

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

export const updateDegree = async (req, res) => {
    try {
        const {id, ...body} = req.body

        const updated = await Degree.findByIdAndUpdate(id, body, {new: true})

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
        const {id} = req.body

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