const mongoose = require("mongoose");

// Option Schema for multiple-choice questions
const optionSchema = new mongoose.Schema({
  text: { type: String, required: true } // The text of the option
});

// Question Schema for both multiple-choice and short-answer questions
const questionSchema = new mongoose.Schema({
  text: { type: String, required: true }, // The question text
  type: {
    type: String,
    enum: ["multiple-choice", "short-answer"], // Question type can be multiple-choice or short-answer
    required: true
  },
  options: [optionSchema], // Array of options (only for multiple-choice questions)
  correctOptionId: { type: String }, // ID of the correct option (for multiple-choice)
  marks: { type: Number, required: true } // Marks assigned to the question
});

// Quiz Schema
const quizSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title of the quiz
  description: { type: String }, // Description of the quiz
  duration: { type: Number, required: true }, // Duration of the quiz in minutes
  totalMarks: { type: Number, required: true }, // Total marks for the quiz
  questions: [questionSchema] // Array of questions in the quiz
});

// Compile the model from the schema
const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
