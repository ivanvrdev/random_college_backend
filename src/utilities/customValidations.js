export const validateUnique = async (model, fieldValueObject, message) => {
    const exists = await model.findOne(fieldValueObject)

    if(exists) return Promise.reject(message)
}

export const comparePasswords = (password, confirmPassword) => {
    if(!confirmPassword) throw new Error('Debe confirmar la contraseña')

    if(password !== confirmPassword) throw new Error('Las contraseñas no coinciden')

    return true
}

export const validateDate = (date) => {

    const dateComponents = date.split('-')

    const currentDate = new Date()
    const inputDate = new Date(
        parseInt(dateComponents[0]), 
        parseInt(dateComponents[1]) - 1, 
        parseInt(dateComponents[2])
    )

    if(inputDate > currentDate) throw new Error('Fecha no válida')

    return true
}