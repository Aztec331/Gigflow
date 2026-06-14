import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function MainPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const navigate = useNavigate()

  const categories = ["All", "Web Development", "Design", "DevOps", "Mobile", "AI/ML"]

  const [gigs] = useState([
    {
      id: 1,
      title: "React Dashboard Development",
      description: "Build an analytics dashboard with React and TypeScript",
      budget: 5000,
      category: "Web Development",
      level: "Intermediate",
      bids: 3
    },
    {
      id: 2,
      title: "UI/UX Design for SaaS",
      description: "Design user interface for project management tool",
      budget: 3000,
      category: "Design",
      level: "Expert",
      bids: 7
    },
    {
      id: 3,
      title: "Node.js REST API",
      description: "Create scalable REST API with authentication",
      budget: 6000,
      category: "Backend",
      level: "Intermediate",
      bids: 5
    },
    {
      id: 4,
      title: "Database Schema Design",
      description: "Design PostgreSQL database for e-commerce",
      budget: 2500,
      category: "Backend",
      level: "Expert",
      bids: 2
    },
    {
      id: 5,
      title: "Flutter App Development",
      description: "Build iOS and Android app for fitness tracking",
      budget: 8000,
      category: "Mobile",
      level: "Intermediate",
      bids: 4
    },
    {
      id: 6,
      title: "DevOps Pipeline Setup",
      description: "Setup CI/CD with GitHub Actions and Docker",
      budget: 4500,
      category: "DevOps",
      level: "Expert",
      bids: 2
    },
    {
      id: 7,
      title: "Vue.js Component Library",
      description: "Create reusable component library for UI",
      budget: 4000,
      category: "Web Development",
      level: "Intermediate",
      bids: 6
    },
    {
      id: 8,
      title: "GraphQL API Development",
      description: "Build GraphQL server with Node.js and Apollo",
      budget: 7000,
      category: "Backend",
      level: "Expert",
      bids: 3
    },
    {
      id: 9,
      title: "React Native Mobile App",
      description: "Develop cross-platform app with React Native",
      budget: 9000,
      category: "Mobile",
      level: "Intermediate",
      bids: 5
    },
    {
      id: 10,
      title: "Brand Identity Design",
      description: "Create complete brand identity system",
      budget: 3500,
      category: "Design",
      level: "Expert",
      bids: 8
    },
    {
      id: 11,
      title: "Kubernetes Setup",
      description: "Setup and configure Kubernetes cluster",
      budget: 5500,
      category: "DevOps",
      level: "Expert",
      bids: 1
    },
    {
      id: 12,
      title: "Machine Learning Model",
      description: "Build ML model for prediction tasks",
      budget: 8500,
      category: "AI/ML",
      level: "Expert",
      bids: 4
    }
  ])

  const filteredGigs = gigs.filter(gig => {
    const matchesSearch = gig.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || gig.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900 border-b border-blue-500 border-opacity-20">
        <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">GigFlow</h1>
          <nav className="flex gap-6 items-center">
            <button className="text-gray-300 hover:text-white transition-colors text-sm">Browse</button>
            <button className="text-gray-300 hover:text-white transition-colors text-sm">My Bids</button>
            <button className="text-gray-300 hover:text-white transition-colors text-sm">Messages</button>
            <button 
              onClick={() => navigate("/auth")}
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              Account
            </button>
          </nav>
        </div>
      </header>

      {/* Search Section */}
      <div className="bg-slate-900 bg-opacity-50 border-b border-blue-500 border-opacity-10 py-8">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search gigs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 bg-slate-800 border border-blue-500 border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 text-sm"
            />
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-medium text-sm transition-colors">
              Post a Gig
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <p className="text-gray-400 text-sm mb-3">Category</p>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-gray-300 hover:bg-slate-700 border border-blue-500 border-opacity-20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gigs List */}
        <div className="space-y-3">
          {filteredGigs.length > 0 ? (
            filteredGigs.map(gig => (
              <div
                key={gig.id}
                className="bg-slate-900 border border-blue-500 border-opacity-20 rounded-lg p-6 hover:border-opacity-50 hover:bg-slate-800 transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold group-hover:text-blue-400 transition-colors">
                        {gig.title}
                      </h3>
                      <span className="text-xs bg-blue-500 bg-opacity-20 text-blue-300 px-3 py-1 rounded">
                        {gig.level}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{gig.description}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-500">{gig.category}</span>
                      <span className="text-xs text-gray-500">{gig.bids} bids</span>
                      <span className="text-blue-400 font-semibold text-sm">₹{gig.budget}</span>
                    </div>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ml-4">
                    View
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No gigs found matching your search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}