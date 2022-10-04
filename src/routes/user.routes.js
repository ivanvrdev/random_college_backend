import { Router } from "express"

import { createUser, getUsers, updateUser, deleteUser, getUserById } from "../controllers/user.controllers.js"
import { authorizeAdminOnly, authorizeUpdateUser } from "../middlewares/customMiddlewares.js"
import { createUserValidations, updateUserValidations, userSchema } from "../middlewares/user.middlewares.js"

const userRoutes = Router()

userRoutes.post('/create', authorizeAdminOnly, userSchema, createUser)
userRoutes.get('/list', getUsers)
userRoutes.get('/:id', getUserById)
userRoutes.put('/update/:id', authorizeUpdateUser, updateUserValidations, updateUser)
userRoutes.delete('/delete/:id', authorizeAdminOnly, deleteUser)

export default userRoutes