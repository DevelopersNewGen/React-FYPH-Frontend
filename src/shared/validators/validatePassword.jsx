export const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    return regex.test(password)
}

export const validatePasswordMessage = 'El password debe contener al menos 8 caracteres, incluyendo al menos 1 letra minúscula, 1 letra mayúscula, 1 número y 1 símbolo (@$!%*?&)'

