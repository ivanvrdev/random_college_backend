import { Router } from 'express'

import { createDeegre, getDegrees, updateDegree, deleteDeegre} from '../controllers/degree.controllers.js'

const degreeRoutes = Router()

degreeRoutes.post('/create', createDeegre)
degreeRoutes.get('/list', getDegrees)
degreeRoutes.put('/update', updateDegree)
degreeRoutes.delete('/delete', deleteDeegre)

export default degreeRoutes