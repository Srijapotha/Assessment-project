const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['categorize', 'cloze', 'comprehension'],
  },
  question: {
    type: String,
  },
  image: String,
  points: {
    type: Number,
    default: 1
  },
  // Categorize specific fields
  categories: [String],
  items: [{
    text: String,
    category: String
  }],
  // Cloze specific fields
  text: String,
  answers: [String],
  // Comprehension specific fields
  passage: String,
  subQuestions: [{
    question: String,
    options: [String],
    correctAnswer: String
  }]
})

const formSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: String,
  headerImage: String,
  questions: [questionSchema]
}, {
  timestamps: true
})

module.exports = mongoose.model('Form', formSchema)