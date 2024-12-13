const express = require('express')
const { body } = require('express-validator')
const responseController = require('../controllers/response.controller')

const router = express.Router()

const responseValidation = [
  body('answers').isObject().withMessage('Answers must be an object')
]

router.post('/:formId/submit', responseValidation, responseController.submitResponse)
router.get('/:formId', responseController.getFormResponses)

module.exports = router