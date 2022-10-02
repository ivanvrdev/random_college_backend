export const validateUnique = async (model, fieldValueObject, message) => {
    const exists = await model.findOne(fieldValueObject)

    if(exists) return Promise.reject(message)
}

export const comparePasswords = (password, confirmPassword) => {
    if(password !== confirmPassword){
        throw new Error('Las contraseñas no coinciden')
    }
    return true
}