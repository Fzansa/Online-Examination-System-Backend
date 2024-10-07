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


module.exports = { getQuizz }