const quizModal = require('../models/quiz')

const getQuizz = async (req, res) => {
    try {
        const quizzs = await quizModal.find();
        res.status(200).json({ quizzs });
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
        console.log(error);
    }
}

const getSingleQuizz = async (req, res) => {
    try {
        const { id } = req.body;
        const quizz = await quizModal.findById(id)
        res.status(200).json({ quizz });
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
        console.log(error);
    }
}



module.exports = { getQuizz, getSingleQuizz }