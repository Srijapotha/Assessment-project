import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const createForm = async (formData) => {
  const response = await api.post('/forms', formData)
  return response.data
}

export const getForms = async () => {
  const response = await api.get('/forms')
  return response.data
}

export const getForm = async (formId) => {
  const response = await api.get(`/forms/${formId}`)
  return response.data
}

export const updateForm = async (formId, formData) => {
  const response = await api.put(`/forms/${formId}`, formData)
  return response.data
}

export const deleteForm = async (formId) => {
  const response = await api.delete(`/forms/${formId}`)
  return response.data
}

export const submitResponses = async (formId, responses) => {
  const response = await api.post(`/forms/${formId}/responses`, responses)
  return response.data
}