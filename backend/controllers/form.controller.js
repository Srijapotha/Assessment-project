const Form = require('../models/form.model')
const { validationResult } = require('express-validator')

exports.createForm = async (req, res, next) => {

  console.log('12323')
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const form = new Form(req.body)
    await form.save()
    res.status(201).json(form)
  } catch (error) {
    next(error)
  }
}

exports.getForms = async (req, res, next) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 })
    res.json({d:forms})
  } catch (error) {
    next(error)
  }
}

exports.getForm = async (req, res, next) => {
  try {
    const form = await Form.findById(req.params.id)
    if (!form) {
      return res.status(404).json({ message: 'Form not found' })
    }
    res.json(form)
  } catch (error) {
    next(error)
  }
}

exports.updateForm = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const form = await Form.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!form) {
      return res.status(404).json({ message: 'Form not found' })
    }
    res.json(form)
  } catch (error) {
    next(error)
  }
}

exports.deleteForm = async (req, res, next) => {
  try {
    const form = await Form.findByIdAndDelete(req.params.id)
    if (!form) {
      return res.status(404).json({ message: 'Form not found' })
    }
    res.json({ message: 'Form deleted successfully' })
  } catch (error) {
    next(error)
  }
}