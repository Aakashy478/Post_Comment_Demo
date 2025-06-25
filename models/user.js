const mongoose = require('mongoose');
const { hashPassword } = require('../utils/hash');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, default: null },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    otp: { type: String, default: null },
    otpExpires: { type: Date, default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true
});

// Pre-save hook
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await hashPassword(this.password);
    }
    next();
});

module.exports = mongoose.model('User', userSchema, 'users');