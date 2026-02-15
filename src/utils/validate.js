const validate = (schema, request) => {
    const validationOptions = {
        abortEarly: false, // Menampilkan semua error
        allowUnknown: true, // Mengizinkan property yang tidak didefinisikan dalam skema
        stripUnkonwn: true // Menghapus property yang tidak didefiniksan dalam skema
    }

    const {error, value} = schema.validate(request, validationOptions)
    if(error) {
        const err = new Error()
        err.isJoi = true
        err.message = error
        throw err
    } else {
        return value
    }
}

export default validate;