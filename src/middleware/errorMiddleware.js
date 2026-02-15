import ErrorResponse from "../utils/errorHandler.js"

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message || 'Internal Server Error'

     // Menangani Mongoose validation error
    if(err.name === 'ValidationError') {
        statusCode = 400;
        const errors = Object.values(err.errors).map(el => el.message);
        message = `Validasi Error: ${errors.join(', ')}`;
    }
    // Menangani Joi validation error
    if(err.isJoi) {
        statusCode = 400
        const errors = err.message.details.map(detail => detail.message)
        message = `Validasi Error: ${errors.join(', ')}`;
    }
    if( err instanceof ErrorResponse) {
        statusCode = err.status
        message = err.message
    }
    res.status(statusCode).json(message)
}

export default errorHandler