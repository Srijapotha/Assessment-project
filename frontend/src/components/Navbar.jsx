import { PlusCircle, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <FileText className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">FormBuilder</span>
          </Link>
          <Link
            to="/create"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Create Form
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
