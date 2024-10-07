const express = require('express');
const { getQuizz, getSingleQuizz } = require('../controllers/User');
const UserRoutes = express.Router();


UserRoutes.get('/getQuizz', getQuizz);
UserRoutes.post('/getSingleQuizz', getSingleQuizz);

module.exports = UserRoutes;