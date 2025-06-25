const { ValidationError } = require('express-validation');

const errorHandler = (err, req, res, next) => {
    // Handle express-validation errors
    if (err instanceof ValidationError) {
        const errorDetails = [];

        // Loop through all possible parts: body, params, query, headers
        for (const key in err.details) {
            if (Array.isArray(err.details[key])) {
                err.details[key].forEach((e) => errorDetails.push(e.message));
            }
        }

        return res.status(err.statusCode || 400).json({
            status: false,
            message: 'Validation error',
            errors: errorDetails,
        });
    }

    // Fallback error
    return res.status(500).json({
        status: false,
        message: err.message || 'Something went wrong',
    });
};

module.exports = errorHandler;