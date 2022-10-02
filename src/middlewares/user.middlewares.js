import { check } from 'express-validator'
import { validateUnique, comparePasswords } from '../utilities/customValidations.js'
import User from '../models/user.model.js'

export const createUserValidations = [
    check('user.types.*')
    .isIn(['admin']).withMessage('No estás autorizado para realizar esta acción'),
    check('username')
    .exists().withMessage('Debe ingresar un nombre de usuario')
    .isString().withMessage('El nombre de usuario debe ser un string')
    .isLength({min: 8}).withMessage('La longitud mínima es de 8 caracteres')
    .isLength({max: 16}).withMessage('La longitud máxima es de 16 caracteres')
    .custom(value => validateUnique(User, {username: value}, 'El nombre de usuario ya existe')),
    check('password')
    .exists().withMessage('Debe ingresar una contraseña')
    .isStrongPassword().withMessage('Debe contener al menos 8 caracteres, una minúscula, una mayúscula, un número y un símbolo'),
    check('confirmPassword')
    .exists().withMessage('Debe volver a ingresar la contraseña')
    .custom((value, {req}) => comparePasswords(req.body.password, value)),
    check('email')
    .exists().withMessage('Debe ingresar un correo electrónco')
    .isEmail().withMessage('Correo ingresado no válido')
    .custom(value => validateUnique(User, {email: value}, 'El correo electrónico ya existe')),
    check('phone')
    .exists().withMessage('Debe ingresar un número de teléfono')
    .isNumeric().withMessage('El número de teléfono debe ser de tipo numérico')
    .isLength({min: 10}).withMessage('La longitud mínima es de 10 caracteres')
    .isLength({max: 16}).withMessage('La longitud máxima es de 16 caracteres')
    .custom(value => validateUnique(User, {phone: value}, 'El número de teléfono ya existe')),
    check('types')
    .isArray().withMessage('Debe ser una lista. Ejemplo: ["tipo", "otroTipo"]'),
    check('types.*')
    .isIn(['admin', 'profesor', 'estudiante']).withMessage('Tipo de usuario no soportado')
]