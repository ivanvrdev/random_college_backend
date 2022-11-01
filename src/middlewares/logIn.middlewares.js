import { check } from 'express-validator'
import { validateErrors } from './validateErrors.js'

const logInValidations = [
    check('username')
    .exists().withMessage('Debe ingresar un nombre de usuario'),
    check('password')
    .exists().withMessage('Debe ingresar una contraseña'),
    validateErrors
]

export default logInValidations