import { check } from 'express-validator'
import { validateErrors } from './validateErrors.js'

const logInValidations = [
    check('username')
    .exists().withMessage('Debe ingresar un nombre de usuario')
    .isLength({min: 8}).withMessage('Debe contener al menos 8 caracteres')
    .isLength({max: 16}).withMessage('El máximo es de 16 caracteres'),
    check('password')
    .exists().withMessage('Debe ingresar una contraseña')
    .isLength({min: 8}).withMessage('Debe contener al menos 8 caracteres')
    .isLength({max: 16}).withMessage('El máximo es de 16 caracteres'),
    validateErrors
]

export default logInValidations