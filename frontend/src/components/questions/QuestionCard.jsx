import { Trash2, Image as ImageIcon } from 'lucide-react'
import CategorizeQuestion from './CategorizeQuestion'
import ClozeQuestion from './ClozeQuestion'
import ComprehensionQuestion from './ComprehensionQuestion'

function QuestionCard({ question, onUpdate, onDelete }) {
  const renderQuestionType = () => {
    switch (question.type) {
      case 'categorize':
        return <CategorizeQuestion question={question} onChange={onUpdate} />
      case 'cloze':
        return <ClozeQuestion question={question} onChange={onUpdate} />
      case 'comprehension':
        return <ComprehensionQuestion question={question} onChange={onUpdate} />
      default:
        return null
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between items-start mb-4">
        <input
          type="text"
          placeholder="Question"
          className="text-lg font-medium flex-1 p-2 border-b border-gray-200 focus:border-indigo-600 focus:outline-none"
          value={question.question}
          onChange={e => onUpdate({ ...question, question: e.target.value })}
        />
        <button
          onClick={onDelete}
          className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <ImageIcon className="w-5 h-5 text-gray-500" />
        <input
          type="url"
          placeholder="Question Image URL"
          className="flex-1 p-2 border border-gray-200 rounded focus:border-indigo-600 focus:outline-none"
          value={question.image}
          onChange={e => onUpdate({ ...question, image: e.target.value })}
        />
      </div>

      {renderQuestionType()}

      <div className="mt-4 flex items-center">
        <label className="text-sm text-gray-600">Points:</label>
        <input
          type="number"
          min="1"
          className="ml-2 w-20 p-1 border border-gray-200 rounded focus:border-indigo-600 focus:outline-none"
          value={question.points}
          onChange={e => onUpdate({ ...question, points: parseInt(e.target.value) })}
        />
      </div>
    </div>
  )
}
export default QuestionCard;