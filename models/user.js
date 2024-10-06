const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });


userSchema.pre('save', async function () {
    let salt = await bcrypt.genSalt();
    let hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
})


module.exports = mongoose.model('User', userSchema);