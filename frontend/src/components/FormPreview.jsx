import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'
function FormPreview() {
  const { formId } = useParams()
  const [form, setForm] = useState(null)
  const [answers, setAnswers] = useState({})

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/forms/${formId}`);
        setForm(response.data);
      } catch (error) {
        toast.error('Failed to load form');
      }
    };
    fetchForm();
  }, [formId]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/responses', {
        formId: form._id,
        answers: answers
      });
      toast.success('Responses submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit responses');
    }
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case 'categorize':
        return (
          <div className="space-y-4">
            {question.categories.map((category) => (
              <div key={category} className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">{category}</h4>
                <div className="space-y-2">
                  {question.items
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <div key={item.text} className="p-2 bg-gray-50 rounded">
                        {item.text}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )

      case 'cloze':
        return (
          <div>
            {question.text.split('[blank]').map((part, index, array) => (
              <span key={index}>
                {part}
                {index < array.length - 1 && (
                  <input
                    type="text"
                    className="mx-2 p-1 border-b-2 border-gray-300 focus:border-indigo-600 focus:outline-none"
                    value={answers[`${question.id}-${index}`] || ''}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        [`${question.id}-${index}`]: e.target.value,
                      })
                    }
                  />
                )}
              </span>
            ))}
          </div>
        )

      case 'comprehension':
        return (
          <div>
            <div className="mb-4 p-4 bg-gray-50 rounded">
              <p className="whitespace-pre-wrap">{question.passage}</p>
            </div>
            <div className="space-y-4">
              {question.subQuestions.map((subQ, index) => (
                <div key={subQ.id} className="border-b pb-4">
                  <p className="font-medium mb-2">
                    {index + 1}. {subQ.question}
                  </p>
                  <div className="space-y-2">
                    {subQ.options.map((option) => (
                      <label key={option} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`question-${subQ.id}`}
                          value={option}
                          checked={answers[subQ.id] === option}
                          onChange={(e) =>
                            setAnswers({
                              ...answers,
                              [subQ.id]: e.target.value,
                            })
                          }
                          className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (!form) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {form.headerImage && (
          <img
            src={form.headerImage}
            alt="Form header"
            className="w-full h-48 object-cover"
          />
        )}
        
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{form.title}</h1>
          {form.description && (
            <p className="text-gray-600 mb-6">{form.description}</p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {form.questions.map((question, index) => (
                <div key={question.id} className="border-b pb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        Question {index + 1}
                      </h3>
                      <p className="mt-1 text-gray-600">{question.question}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {question.points} points
                    </span>
                  </div>

                  {question.image && (
                    <img
                      src={question.image}
                      alt={`Question ${index + 1}`}
                      className="mb-4 rounded-lg max-h-64 object-contain"
                    />
                  )}

                  {renderQuestion(question)}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit Responses
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FormPreview