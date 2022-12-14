import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { config } from 'dotenv'

import userRoutes from './routes/user.routes.js'
import subjectRoutes from './routes/subject.routes.js'
import degreeRoutes from './routes/degree.routes.js'
import postRoutes from './routes/post.routes.js'
import authRoutes from './routes/auth.routes.js'

import { getPublicPosts } from './controllers/post.controllers.js'

import { authenticateUser } from './middlewares/customMiddlewares.js'

import './connection.js'

config()

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.set('port', process.env.PORT || 3000)

app.get('/', (req, res) => res.status(200).json({message: '¬°Bienvenido al servidor del Instituto Random!'}))
app.use('/auth', authRoutes)
app.use('/user', authenticateUser, userRoutes)
app.use('/subject', authenticateUser, subjectRoutes)
app.use('/degree', authenticateUser, degreeRoutes)
app.use('/post', authenticateUser, postRoutes)
app.use('/public/post', getPublicPosts)

app.listen(app.get('port'), ()=>console.log(`Servidor corriendo en el puerto ${app.get('port')}`))
