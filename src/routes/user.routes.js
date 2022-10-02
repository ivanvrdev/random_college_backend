import { Router } from "express"

import { createUser, getUsers, updateUser, deleteUser, getUserById } from "../controllers/user.controllers.js"
import { createUserValidations } from "../middlewares/user.middlewares.js"
import { validateErrors } from '../middlewares/validateErrors.js'

const userRoutes = Router()

userRoutes.post('/create', createUserValidations, validateErrors, createUser)
userRoutes.get('/list', getUsers)
userRoutes.get('/:id', getUserById)
userRoutes.put('/update/:id', updateUser)
userRoutes.delete('/delete/:id', deleteUser)

export default userRoutes