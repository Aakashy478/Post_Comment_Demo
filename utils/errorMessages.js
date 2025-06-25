function errorMessages(field, min = null, max = null, values = null, format = null) {
    const label = field.charAt(0).toUpperCase() + field.slice(1);

    const messages = {
        // Common base rules
        'any.required': `${label} is required`,
        'string.base': `${label} must be a string`,
        'string.empty': `${label} cannot be empty`,
        'number.base': `${label} must be a number`,
        'boolean.base': `${label} must be true or false`,
        'date.base': `${label} must be a valid date`,
        'array.base': `${label} must be an array`,
        'object.base': `${label} must be an object`,
    };

    // Conditionally add min/max based on type (Joi will decide which one is used)
    if (min !== null) {
        messages['string.min'] = `${label} must be at least ${min} characters long`;
        messages['number.min'] = `${label} must be at least ${min}`;
        messages['array.min'] = `${label} must have at least ${min} items`;
    }

    if (max !== null) {
        messages['string.max'] = `${label} must be at most ${max} characters long`;
        messages['number.max'] = `${label} must be at most ${max}`;
        messages['array.max'] = `${label} must have at most ${max} items`;
    }

    if (values !== null) {
        messages['any.only'] = `${label} must be one of: ${values.join(', ')}`;
    }

    if (format !== null) {
        messages['date.format'] = `${label} must match the format: ${format}`;
    }

    return messages;
}

module.exports = errorMessages;
