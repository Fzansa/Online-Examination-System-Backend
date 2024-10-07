const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quizId: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  answers: [
    {
      questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Question', 
        required: true
      },
      selectedOptionId: {
        type: String,
        required: true
      },
      isCorrect: {
        type: Boolean,
        required: true
      },
      correctOptionId: {
        type: String // For reference to the correct option (if applicable)
      }
    }
  ],
  score: {
    type: Number,
    required: true
  },
  totalMarks: {
    type: Number,
    required: true
  },
  timeTaken: {
    type: Number, // in seconds
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Result', resultSchema);
