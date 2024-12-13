import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import FormBuilder from './components/FormBuilder'
import FormPreview from './components/FormPreview'
import FormList from './components/FormList'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<FormList />} />
            <Route path="/create" element={<FormBuilder />} />
            <Route path="/edit/:formId" element={<FormBuilder />} />
            <Route path="/preview/:formId" element={<FormPreview />} />
          </Routes>
        </main>
        <Toaster position="bottom-right" />
      </div>
    </BrowserRouter>
  )
}

export default App