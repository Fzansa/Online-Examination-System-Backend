const UserModal = require('../models/user');
const Quiz = require('../models/quiz')

const getUser = async (req, res) => {
    try {
        const users = await UserModal.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
        console.log(error);
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const checkAdmin = await UserModal.findById(userId);
        if (!checkAdmin) return res.status(404).json({ message: "user not found" });
        if (checkAdmin.role == 'admin') {
            return res.status(409).json({ message: 'you can not delete yourself' });
        }

        const user = await UserModal.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        return res.status(200).json({ message: "user deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
        console.log(error);
    }
}

const addQuizz = async (req, res) => {
    try {
        // Destructure and validate essential fields before creating the quiz
        const { title, duration, totalMarks, questions } = req.body;

        // Basic validation
        if (!title || !duration || !totalMarks || !questions || questions.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: "Title, duration, total marks, and questions are required." 
            });
        }

        // Create and save the new quiz
        const newQuizz = new Quiz(req.body);
        await newQuizz.save();

        // Return success response
        return res.status(201).json({
            success: true,
            message: "Quiz created successfully.",
            quiz: newQuizz
        });

    } catch (error) {
        // Log error for server-side debugging
        console.error('Error creating quiz:', error);

        // Return error response with more detailed error message
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal server error.',
            errorDetails: error.stack || null  // Optionally include stack trace for debugging
        });
    }
};




module.exports = { getUser, deleteUser, addQuizz }