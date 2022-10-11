import { check, checkSchema } from 'express-validator'
import { validateUnique, comparePasswords, validateDate } from '../utilities/customValidations.js'
import { validateErrors } from './validateErrors.js'
import User from '../models/user.model.js'

//para datos que se validan sí o sí al crear el usuario 
//o si existen al momento de hacer una modificación 
const condition = (value, {req}) => req.path === '/create' || value

export const userValidations = [
    check('username')
    .if(condition)
    .exists().withMessage('Debe ingresar un nombre de usuario')
    .isString().withMessage('El nombre de usuario debe ser un string')
    .isLength({min: 8}).withMessage('La longitud mínima es de 8 caracteres')
    .isLength({max: 16}).withMessage('La longitud máxima es de 16 caracteres')
    .custom(value => validateUnique(User, {username: value}, 'El nombre de usuario ya existe')),
    check('password')
    .if(condition)
    .exists().withMessage('Debe ingresar una contraseña')
    .isStrongPassword().withMessage('Debe contener al menos 8 caracteres, una minúscula, una mayúscula, un número y un símbolo')
    .custom((value, {req}) => comparePasswords(value, req.body.confirmPassword)),
    check('email')
    .if(condition)
    .exists().withMessage('Debe ingresar un correo electrónco')
    .isEmail().withMessage('Correo ingresado no válido')
    .custom(value => validateUnique(User, {email: value}, 'El correo electrónico ya existe')),
    check('phone')
    .if(condition)
    .exists().withMessage('Debe ingresar un número de teléfono')
    .isNumeric().withMessage('El número de teléfono debe ser de tipo numérico')
    .isLength({min: 10}).withMessage('La longitud mínima es de 10 caracteres')
    .isLength({max: 16}).withMessage('La longitud máxima es de 16 caracteres')
    .custom(value => validateUnique(User, {phone: value}, 'El número de teléfono ya existe')),
    check('types')
    .if(condition)
    .isArray({min: 1, max: 3}).withMessage('Debe ser una lista. Ejemplo: ["tipo", "otroTipo"]'),
    check('types.*')
    .if(condition)
    .isIn(['admin', 'profesor', 'estudiante']).withMessage('Tipo de usuario no soportado'),
//     check('profile.avatar')
//     .if(value => value)
//     .isURL().withMessage('Formato no válido'),
    check('profile.first_name')
    .if(condition)
    .isString().withMessage('Debe ser un texto')
    .isLength({min: 3}).withMessage('La longitud mínima es de 3 caracteres')
    .isLength({max: 16}).withMessage('La longitud máxima es de 16 caracteres'),
    check('profile.last_name')
    .if(condition)
    .isString().withMessage('Debe ser un texto')
    .isLength({min: 3}).withMessage('La longitud mínima es de 3 caracteres')
    .isLength({max: 16}).withMessage('La longitud máxima es de 16 caracteres'),
    check('profile.cuil')
    .if(condition)
    .isString().withMessage('Debe ser un texto')
    .isNumeric().withMessage('Debe ser de tipo numérico')
    .isLength({min: 10, max: 11}).withMessage('Debe contener entre 10 y 11 caracteres'),
    check('profile.nationallity')
    .if(condition)
    .isString().withMessage('Debe ser un texto')
    .isLength({min: 5}).withMessage('La longitud mínima es de 5 caracteres')
    .isLength({max: 20}).withMessage('La longitud máxima es de 20 caracteres'),
    check('profile.born_date')
    .if(condition)
    .isDate().withMessage('Formato no válido. Formato aceptado: YYYY-MM-DD')
    .custom(validateDate),
    check('profile.sex')
    .if(condition)
    .isString().withMessage('Debe ser un texto')
    .isIn(['hombre', 'mujer', 'otro', 'ns/nc']).withMessage('Opción no soportada'),
    check('profile.address')
    .if(condition)
    .isArray().withMessage('Debe ser una lista de objetos'),
    validateErrors
]