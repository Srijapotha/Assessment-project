import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Edit, Eye, Trash2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
function FormList() {
  const [forms, setForms] = useState([])

  useEffect(() => {
    async function get(){
      const response = await axios.get('http://localhost:3001/api/forms')
      const {d}=response.data
      setForms(d)

    }
    get()
 
  }, [])

  const handleDelete = async (formId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/forms/${formId}`);
      const {message}=response.data
      if(message=='Form deleted successfully'){
        const response = await axios.get('http://localhost:3001/api/forms')
        const {d}=response.data
        setForms(d)

      }
      
      toast.success('Form deleted successfully')
    } catch (error) {
      toast.error('Failed to delete form')
    }
  }

  if (forms.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No Forms Yet</h2>
        <p className="text-gray-600 mb-8">Create your first form to get started!</p>
        <Link
          to="/create"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Create New Form
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Questions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {forms.map((form) => (
              <tr key={form._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{form.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{form.questions.length} questions</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(form.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Link
                      to={`/edit/${form._id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <Link
                      to={`/preview/${form._id}`}
                      className="text-green-600 hover:text-green-900"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(form._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      
      </div>
    </div>
  )
}

export default FormList