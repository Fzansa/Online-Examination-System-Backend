const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModal = require('../models/user');
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existUser = await UserModal.findOne({ email });
        if (existUser) {
            return res.status(401).json({ success: false, message: "User already exist" });
        }
        const newUser = new UserModal({ name, email, password });
        await newUser.save();

        res.status(200).json({
            newUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
        console.log(error)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existUser = await UserModal.findOne({ email });
        if (!existUser) {
            return res.status(404).json({ success: false, message: "Invalid Credentials" });
        }

        const isPasswordMatch = await bcrypt.compare(password, existUser.password);
        if (!isPasswordMatch) {
            return res.status(404).json({ success: false, message: "Invalid Credentials" });
        }

        const token = jwt.sign({
            userId: existUser._id,
            name: existUser.name,
            role: existUser.role,
            email: existUser.email
        }, process.env.JWT_SECRETE, { expiresIn: '10h' });
        res.status(200).json({
            success: true,
            message: "Login Successfully",
            existUser,
            token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
        console.log(error)
    }
}
const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({
            message: 'user logout successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
        console.log(error)
    }
}

module.exports = {
    register,
    login,
    logout
}