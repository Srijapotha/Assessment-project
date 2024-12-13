import { useState } from 'react'
import { Plus, X } from 'lucide-react'

function ClozeQuestion({ question, onChange }) {
  const [showPreview, setShowPreview] = useState(false)

  const handleTextChange = (e) => {
    onChange({ ...question, text: e.target.value })
  }

  const addBlank = () => {
    const newText = question.text + ' [blank]'
    const newAnswers = [...question.answers, '']
    onChange({ ...question, text: newText, answers: newAnswers })
  }

  const updateAnswer = (index, value) => {
    const newAnswers = [...question.answers]
    newAnswers[index] = value
    onChange({ ...question, answers: newAnswers })
  }

  const removeAnswer = (index) => {
    const newAnswers = question.answers.filter((_, i) => i !== index)
    onChange({ ...question, answers: newAnswers })
  }

  const renderPreview = () => {
    let previewText = question.text
    question.answers.forEach((answer, index) => {
      previewText = previewText.replace('[blank]', `<span class="px-4 py-1 mx-1 bg-gray-200 rounded">${answer}</span>`)
    })
    return <div dangerouslySetInnerHTML={{ __html: previewText }} />
  }

  return (
    <div>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700">Sentence with Blanks</h3>
          <button
            onClick={addBlank}
            className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Blank
          </button>
        </div>
        <textarea
          value={question.text}
          onChange={handleTextChange}
          className="w-full p-2 border border-gray-200 rounded focus:border-indigo-600 focus:outline-none"
          rows="3"
          placeholder="Enter text with [blank] placeholders"
        />
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Answers</h3>
        {question.answers.map((answer, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-500">Blank {index + 1}:</span>
            <input
              type="text"
              value={answer}
              onChange={(e) => updateAnswer(index, e.target.value)}
              className="flex-1 p-2 border border-gray-200 rounded focus:border-indigo-600 focus:outline-none"
            />
            <button
              onClick={() => removeAnswer(index)}
              className="p-2 text-red-600 hover:bg-red-50 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="text-sm text-indigo-600 hover:text-indigo-700"
        >
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </button>
        {showPreview && (
          <div className="mt-2 p-4 bg-gray-50 rounded">
            {renderPreview()}
          </div>
        )}
      </div>
    </div>
  )
}
export default ClozeQuestion