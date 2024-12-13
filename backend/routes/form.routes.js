const express = require('express')
const { body } = require('express-validator')
const formController = require('../controllers/form.controller')

const router = express.Router()

const formValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('questions').isArray().withMessage('Questions must be an array'),
  body('questions.*.type').isIn(['categorize', 'cloze', 'comprehension'])
    .withMessage('Invalid question type'),
  body('questions.*.question').trim().notEmpty()
    .withMessage('Question text is required')
]

router.post('/f', formController.createForm)
router.get('/', formController.getForms)
router.get('/:id', formController.getForm)
router.put('/:id', formValidation, formController.updateForm)
router.delete('/:id', formController.deleteForm)

module.exports = router