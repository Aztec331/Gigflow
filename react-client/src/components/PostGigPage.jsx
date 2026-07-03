import { useState } from "react"
import { postGig } from "../api/gigs"
import { useNavigate } from "react-router-dom"
import { Briefcase, TrendingUp, MessageSquare, User, ArrowLeft } from "lucide-react"

export default function PostGigPage() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    category: "",
    level: ""
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const categories = ["Web Development", "Design", "DevOps", "Mobile", "AI/ML"]
  const levels = ["Easy", "Intermediate", "Expert"]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {

    e.preventDefault()
    setError("")

    if (!formData.title || !formData.description || !formData.budget || !formData.category || !formData.level) {
      setError("All fields are required")
      return
    }

    try {

      setLoading(true)

      // Read JWT from browser
      const token = localStorage.getItem("token")

      // Send gig to FastAPI
      await postGig(formData, token)

      navigate("/main")
      
    } 
    catch (err) {
      setError(err.response?.data?.detail || "Something went wrong")
    } 
    finally {
      setLoading(false)
    }

  }


  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <header className="bg-slate-900 sticky top-0 z-50 border-b-2 border-solid border-blue-500">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}>GigFlow</h1>
          <nav className="flex gap-8 items-center">
            <button onClick={() => navigate("/")} className="flex items-center gap-2 text-gray-300 hover:text-white hover:scale-105 cursor-pointer transition-all text-sm">
              <Briefcase className="w-4 h-4" />
              Browse
            </button>
            <button className="flex items-center gap-2 text-gray-300 hover:text-white hover:scale-105 cursor-pointer transition-all text-sm">
              <TrendingUp className="w-4 h-4" />
              My Bids
            </button>
            <button className="flex items-center gap-2 text-gray-300 hover:text-white hover:scale-105 cursor-pointer transition-all text-sm">
              <MessageSquare className="w-4 h-4" />
              Messages
            </button>
            <button
              onClick={() => navigate("/auth")}
              className="flex items-center gap-2 text-gray-300 hover:text-white hover:scale-105 cursor-pointer transition-all text-sm">
              <User className="w-4 h-4" />
              User
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-8 py-12">

        {/* Back button */}
        <button
          onClick={() => navigate("/main")}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Gigs
        </button>

        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Post a <span className="text-blue-500">Gig</span></h2>
          <p className="text-gray-400 text-sm">Fill in the details below to post your gig</p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900 border border-blue-500 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Gig Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Build a React Dashboard"
                className="w-full px-4 py-3 bg-slate-800 border border-blue-500 border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 text-sm"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what you need done in detail..."
                rows={5}
                className="w-full px-4 py-3 bg-slate-800 border border-blue-500 border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 text-sm resize-none"
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Budget (₹)
              </label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="e.g. 5000"
                className="w-full px-4 py-3 bg-slate-800 border border-blue-500 border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 text-sm"
              />
            </div>

            {/* Category and Level - side by side */}
            <div className="flex gap-4">

              {/* Category */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-blue-500 border-opacity-30 rounded-lg text-white focus:outline-none focus:border-blue-400 text-sm"
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Level */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Experience Level
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-blue-500 border-opacity-30 rounded-lg text-white focus:outline-none focus:border-blue-400 text-sm"
                >
                  <option value="">Select level</option>
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-400 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-500 active:scale-95 text-white px-8 py-3 rounded-lg font-medium text-sm transition-all"
              >
                {loading ? "Posting..." : "Post Gig"}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  )
}