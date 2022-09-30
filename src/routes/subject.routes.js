import { Router } from "express"
import { 
    createSubject, 
    getSubjects, 
    updateSubject, 
    deleteSubject 
} from "../controllers/subject.controllers.js"

const subjectRoutes = Router()

subjectRoutes.post('/create', createSubject)
subjectRoutes.get('/list', getSubjects)
subjectRoutes.put('/update', updateSubject)
subjectRoutes.delete('/delete',deleteSubject)

export default subjectRoutes