const moment = require('moment');
const { generateToken } = require('../middlewares/authentication');
const USER = require('../models/user');
const { comparePassword } = require('../utils/hash');

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const existingUser = await USER.findOne({ email, isDelete: false });
        if (existingUser) return res.status(409).json({ message: 'User already exists' });

        const newUser = {
            firstName,
            lastName,
            email,
            password,
        };

        await USER.create(newUser);
        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log('Error in registerUser:', error);
        res.status(500).json({ message: 'Something went wrong!' });
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await USER.findOne({ email, isDeleted: false });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });

        const token = await generateToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'development',
            maxAge: 24 * 60 * 60 * 1000, // 1 day 
        });

        res.status(200).json({ message: 'Login successful.' });
    } catch (error) {
        console.log('Error in loginUser:', error);
        res.status(500).json({ message: 'Something went wrong!' });
    }
}

const logoutUser = (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful.' });
    } catch (error) {
        console.log('Error in logoutUser:', error);
        return res.status(500).json({ message: 'Something went wrong!' });
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await USER.findOne({ email, isDeleted: false });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
        user.otp = otp;
        user.otpExpires = 2 * 60 * 1000;
        await user.save();

        return res.status(200).json({ message: 'OTP sent to your email', otp });
    } catch (error) {
        console.log('Error in forgotPassword:', error);
        return res.status(500).json({ message: 'Something went wrong!' });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        const user = await USER.findOne({ email, isDeleted: false });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const difference = moment().diff(moment(user.otpExpires), 'minutes');

        if (difference > 2) {
            return res.status(400).json({ message: 'OTP has expired' });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        user.password = newPassword;
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        return res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.log('Error in resetPassword:', error);
        return res.status(500).json({ message: 'Something went wrong!' });
    }
}

module.exports = { registerUser, loginUser, logoutUser, forgotPassword, resetPassword };