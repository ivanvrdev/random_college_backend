import { check, checkSchema } from 'express-validator'
import { validateUnique, comparePasswords } from '../utilities/customValidations.js'
import { validateErrors } from './validateErrors.js'
import User from '../models/user.model.js'

export const createUserValidations = [
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
    .isArray({min: 1, max: 3}).withMessage('Debe ser una lista. Ejemplo: ["tipo", "otroTipo"]'),
    check('types.*')
    .isIn(['admin', 'profesor', 'estudiante']).withMessage('Tipo de usuario no soportado'),
    validateErrors
]

export const updateUserValidations = [
    check('username')
    .if(value => value)
    .isString().withMessage('El nombre de usuario debe ser un string')
    .isLength({min: 8}).withMessage('La longitud mínima es de 8 caracteres')
    .isLength({max: 16}).withMessage('La longitud máxima es de 16 caracteres')
    .custom(value => validateUnique(User, {username: value}, 'El nombre de usuario ya existe')),
    check('password')
    .if(value => value)
    .isStrongPassword().withMessage('Debe contener al menos 8 caracteres, una minúscula, una mayúscula, un número y un símbolo')
    .custom((value, {req}) => comparePasswords(value, req.body.confirmPassword)),
    check('email')
    .if(value => value)
    .isEmail().withMessage('Correo ingresado no válido')
    .custom(value => validateUnique(User, {email: value}, 'El correo electrónico ya existe')),
    check('phone')
    .if(value => value)
    .isNumeric().withMessage('El número de teléfono debe ser de tipo numérico')
    .isLength({min: 10}).withMessage('La longitud mínima es de 10 caracteres')
    .isLength({max: 16}).withMessage('La longitud máxima es de 16 caracteres')
    .custom(value => validateUnique(User, {phone: value}, 'El número de teléfono ya existe')),
    check('types')
    .if(value => value)
    .isArray({min: 1, max: 3}).withMessage('Debe ser una lista. Ejemplo: ["tipo", "otroTipo"]'),
    check('types.*')
    .if(value => value)
    .isIn(['admin', 'profesor', 'estudiante']).withMessage('Tipo de usuario no soportado'),
    check('profile.avatar')
    .if(value => value)
    .isURL().withMessage('Formato no válido'),
    check('profile.first_name')
    .if(value => value)
    .isLength({min: 3}).withMessage('La longitud mínima es de 3 caracteres')
    .isLength({max: 16}).withMessage('La longitud máxima es de 16 caracteres'),
    check('profile.last_name')
    .if(value => value)
    .isLength({min: 3}).withMessage('La longitud mínima es de 3 caracteres')
    .isLength({max: 16}).withMessage('La longitud máxima es de 16 caracteres'),
    check('profile.cuil')
    .if(value => value)
    .isNumeric().withMessage('Debe ser de tipo numérico')
    .isLength({min: 10, max: 11}).withMessage('Debe contener entre 10 y 11 caracteres'),
    validateErrors
]

export const userSchema = [
    checkSchema({
        username: {
            isString: {
                errorMessage: 'Debe ser de tipo string',
            },
            isLength: {
                errorMessage: 'Debe tener entre 8 y 16 caracteres',
                options: {
                    min: 8,
                    max: 16
                }
            },
            custom: {
                options: value => validateUnique(User, {username: value}, 'El nombre de usuario ya existe')
            }
        }       
    }),
    validateErrors
]