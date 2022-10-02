import { Router } from 'express'

import { createDeegre, getDegrees, updateDegree, deleteDeegre, getDegreeById} from '../controllers/degree.controllers.js'

const degreeRoutes = Router()

degreeRoutes.post('/create', createDeegre)
degreeRoutes.get('/list', getDegrees)
degreeRoutes.get('/:id', getDegreeById)
degreeRoutes.put('/update/:id', updateDegree)
degreeRoutes.delete('/delete/:id', deleteDeegre)

export default degreeRoutes