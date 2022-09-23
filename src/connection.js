import { connect } from "mongoose"
import { config } from "dotenv"

config()

const connection = connect(process.env.DB_URI, {dbName: process.env.DB_NAME}) 
.then(()=>console.log('Servidor conectado a la base de datos'))
.catch(e=>console.log('Error al conectar el servidor a la base de datos: ', e))

export default connection