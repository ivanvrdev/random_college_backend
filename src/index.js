import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { config } from 'dotenv'

import userRoutes from './routes/user.routes.js'

import logIn from './controllers/login.controller.js'
import { authenticateUser } from './middlewares/authentication.js'

import './connection.js'

config()

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.set('port', process.env.PORT || 3000)

app.get('/', (req, res) => res.status(200).json({message: '¡Bienvenido al servidor del Instituto Random!'}))
app.post('/login', logIn)
app.use('/user', authenticateUser, userRoutes)

app.listen(app.get('port'), ()=>console.log(`Servidor corriendo en el puerto ${app.get('port')}`))
