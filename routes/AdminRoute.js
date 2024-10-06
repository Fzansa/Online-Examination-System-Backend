const express = require('express');
const { getUser,deleteUser,addQuizz } = require('../controllers/Admin');
const AdminRoutes = express.Router();

AdminRoutes.get('/getuser', getUser);
AdminRoutes.delete('/delete/:id', deleteUser);

AdminRoutes.post('/addQuizz', addQuizz);

module.exports = AdminRoutes;