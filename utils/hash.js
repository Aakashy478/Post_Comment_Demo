const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Hashing failed');
    }
}

const comparePassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error('Error comparing password:', error);
        throw new Error('Comparison failed');
    }
}

module.exports = { hashPassword, comparePassword };