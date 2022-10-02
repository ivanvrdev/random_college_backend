import { Router } from "express"
import { 
    createSubject, 
    getSubjects, 
    updateSubject, 
    deleteSubject, 
    getSubjectById
} from "../controllers/subject.controllers.js"

const subjectRoutes = Router()

subjectRoutes.post('/create', createSubject)
subjectRoutes.get('/list', getSubjects)
subjectRoutes.get('/:id', getSubjectById)
subjectRoutes.put('/update/:id', updateSubject)
subjectRoutes.delete('/delete/:id',deleteSubject)

export default subjectRoutes