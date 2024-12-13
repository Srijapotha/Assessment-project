import { Plus, X } from 'lucide-react'

function ComprehensionQuestion({ question, onChange }) {
  const addSubQuestion = () => {
    const newSubQuestions = [
      ...question.subQuestions,
      {
        id: Date.now(),
        question: '',
        options: ['Option 1', 'Option 2'],
        correctAnswer: 'Option 1'
      }
    ]
    onChange({ ...question, subQuestions: newSubQuestions })
  }

  const updateSubQuestion = (index, field, value) => {
    const newSubQuestions = [...question.subQuestions]
    newSubQuestions[index] = { ...newSubQuestions[index], [field]: value }
    onChange({ ...question, subQuestions: newSubQuestions })
  }

  const addOption = (subQuestionIndex) => {
    const newSubQuestions = [...question.subQuestions]
    const options = newSubQuestions[subQuestionIndex].options
    newSubQuestions[subQuestionIndex].options = [...options, `Option ${options.length + 1}`]
    onChange({ ...question, subQuestions: newSubQuestions })
  }

  const updateOption = (subQuestionIndex, optionIndex, value) => {
    const newSubQuestions = [...question.subQuestions]
    newSubQuestions[subQuestionIndex].options[optionIndex] = value
    onChange({ ...question, subQuestions: newSubQuestions })
  }

  const removeOption = (subQuestionIndex, optionIndex) => {
    const newSubQuestions = [...question.subQuestions]
    newSubQuestions[subQuestionIndex].options = newSubQuestions[subQuestionIndex].options
      .filter((_, i) => i !== optionIndex)
    onChange({ ...question, subQuestions: newSubQuestions })
  }

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Passage</h3>
        <textarea
          value={question.passage}
          onChange={(e) => onChange({ ...question, passage: e.target.value })}
          className="w-full p-2 border border-gray-200 rounded focus:border-indigo-600 focus:outline-none"
          rows="4"
          placeholder="Enter the comprehension passage"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700">Questions</h3>
          <button
            onClick={addSubQuestion}
            className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Question
          </button>
        </div>

        {question.subQuestions.map((subQ, index) => (
          <div key={subQ.id} className="mb-6 p-4 border border-gray-200 rounded">
            <div className="mb-4">
              <input
                type="text"
                value={subQ.question}
                onChange={(e) => updateSubQuestion(index, 'question', e.target.value)}
                className="w-full p-2 border border-gray-200 rounded focus:border-indigo-600 focus:outline-none"
                placeholder={`Question ${index + 1}`}
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-700">Options</h4>
                <button
                  onClick={() => addOption(index)}
                  className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Option
                </button>
              </div>

              {subQ.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(index, optionIndex, e.target.value)}
                    className="flex-1 p-2 border border-gray-200 rounded focus:border-indigo-600 focus:outline-none"
                  />
                  <button
                    onClick={() => removeOption(index, optionIndex)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correct Answer
              </label>
              <select
                value={subQ.correctAnswer}
                onChange={(e) => updateSubQuestion(index, 'correctAnswer', e.target.value)}
                className="w-full p-2 border border-gray-200 rounded focus:border-indigo-600 focus:outline-none"
              >
                {subQ.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default ComprehensionQuestion