import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Image as ImageIcon, Save } from 'lucide-react'
import QuestionCard from './questions/QuestionCard'
import { toast } from 'react-hot-toast'
import axios from 'axios'
function FormBuilder() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    description: '',
    headerImage: '',
    questions: []
  })

  const addQuestion = (type) => {
    const newQuestion = {
      id: Date.now(),
      type,
      question: '',
      image: '',
      points: 1
    }

    if (type === 'categorize') {
      newQuestion.categories = ['Category 1', 'Category 2']
      newQuestion.items = [{ text: 'Item 1', category: 'Category 1' }]
    } else if (type === 'cloze') {
      newQuestion.text = 'This is a [blank] sentence'
      newQuestion.answers = ['sample']
    } else if (type === 'comprehension') {
      newQuestion.passage = ''
      newQuestion.subQuestions = [{
        id: Date.now(),
        question: '',
        options: ['Option 1', 'Option 2'],
        correctAnswer: 'Option 1'
      }]
    }

    setForm(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }))
  }

  const handleSave = async () => {
    console.log('sdsd')
    try {
      const response = await axios.post('http://localhost:3001/api/forms/f',form)
      toast.success('Form saved successfully!')
      navigate('/')
    } catch (error) {
      toast.error('Failed to save form')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <input
          type="text"
          placeholder="Form Title"
          className="text-2xl font-bold w-full mb-4 p-2 border-b border-gray-200 focus:border-indigo-600 focus:outline-none"
          value={form.title}
          onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
        />
        
        <textarea
          placeholder="Form Description"
          className="w-full mb-4 p-2 border-b border-gray-200 focus:border-indigo-600 focus:outline-none resize-none"
          value={form.description}
          onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
        />

        <div className="flex items-center space-x-2 mb-4">
          <ImageIcon className="w-5 h-5 text-gray-500" />
          <input
            type="url"
            placeholder="Header Image URL"
            className="flex-1 p-2 border border-gray-200 rounded focus:border-indigo-600 focus:outline-none"
            value={form.headerImage}
            onChange={e => setForm(prev => ({ ...prev, headerImage: e.target.value }))}
          />
        </div>
      </div>

      {form.questions.map((question, index) => (
        <QuestionCard
          key={question.id}
          question={question}
          onUpdate={(updatedQuestion) => {
            const newQuestions = [...form.questions]
            newQuestions[index] = updatedQuestion
            setForm(prev => ({ ...prev, questions: newQuestions }))
          }}
          onDelete={() => {
            setForm(prev => ({
              ...prev,
              questions: prev.questions.filter(q => q.id !== question.id)
            }))
          }}
        />
      ))}

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => addQuestion('categorize')}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Plus className="w-5 h-5 mr-2" />
            Categorize
          </button>
          <button
            onClick={() => addQuestion('cloze')}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Plus className="w-5 h-5 mr-2" />
            Cloze
          </button>
          <button
            onClick={() => addQuestion('comprehension')}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Plus className="w-5 h-5 mr-2" />
            Comprehension
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Save className="w-5 h-5 mr-2" />
          Save Form
        </button>
      </div>
    </div>
  )
}
export default FormBuilder;