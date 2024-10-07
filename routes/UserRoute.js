const express = require('express');
const { getQuizz } = require('../controllers/User');
const UserRoutes = express.Router();


UserRoutes.get('/getQuizz', getQuizz);

module.exports = UserRoutes;