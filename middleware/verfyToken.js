const jwt = require('jsonwebtoken');
const UsesrModal = require('../models/user');

const isAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized : No token provided'
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRETE);
        const user = await UsesrModal.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'user not found' });
        }
        if (user.role !== 'admin') {
            return res.status(401).json({ message: "Unauthorized : user is not an admin" });
        }
        req.user = user;
        next();
    } catch (error) {

    }
}

module.exports = { isAdmin }