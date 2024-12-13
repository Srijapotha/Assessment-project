const Response = require('../models/response.model')
const { validationResult } = require('express-validator')

exports.submitResponse = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const response = new Response({
      formId: req.params.formId,
      answers: req.body.answers
    })
    await response.save()
    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}

exports.getFormResponses = async (req, res, next) => {
  try {
    const responses = await Response.find({ formId: req.params.formId })
      .sort({ createdAt: -1 })
    res.json(responses)
  } catch (error) {
    next(error)
  }
}