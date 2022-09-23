import { Router } from "express"

import { createUser, getUsers, updateUser, deleteUser } from "../controllers/user.controllers.js"

const userRoutes = Router()

userRoutes.post('/create', createUser)
userRoutes.get('/list', getUsers)
userRoutes.put('/update', updateUser)
userRoutes.delete('/delete/:id', deleteUser)

export default userRoutes