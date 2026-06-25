import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Plus, MessageSquare, User, Briefcase, TrendingUp } from "lucide-react"

export default function MainPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const navigate = useNavigate()

  const categories = ["All", "Web Development", "Design", "DevOps", "Mobile", "AI/ML"]

const [gigs] = useState([
  // WEB DEVELOPMENT
  {
    id: 1,
    title: "Fix Contact Form Bug",
    description: "Resolve validation issues in React contact form",
    budget: 1000,
    category: "Web Development",
    level: "Easy",
    bids: 2
  },
  {
    id: 2,
    title: "Admin Dashboard",
    description: "Build analytics dashboard using React and Chart.js",
    budget: 6500,
    category: "Web Development",
    level: "Intermediate",
    bids: 5
  },
  {
    id: 3,
    title: "Node.js REST API",
    description: "Create scalable REST API with authentication",
    budget: 6000,
    category: "Web Development",
    level: "Intermediate",
    bids: 5
  },
  {
    id: 4,
    title: "GraphQL API Development",
    description: "Build GraphQL server with Node.js and Apollo",
    budget: 7000,
    category: "Web Development",
    level: "Expert",
    bids: 3
  },

  // DESIGN
  {
    id: 5,
    title: "Logo for Coffee Shop",
    description: "Need a simple logo for local coffee business",
    budget: 1200,
    category: "Design",
    level: "Easy",
    bids: 11
  },
  {
    id: 6,
    title: "Landing Page Design",
    description: "Design a modern landing page for startup",
    budget: 1800,
    category: "Design",
    level: "Intermediate",
    bids: 4
  },
  {
    id: 7,
    title: "Figma Design System",
    description: "Create reusable components and style guide",
    budget: 4000,
    category: "Design",
    level: "Intermediate",
    bids: 4
  },
  {
    id: 8,
    title: "Brand Identity Design",
    description: "Create complete brand identity system",
    budget: 3500,
    category: "Design",
    level: "Expert",
    bids: 8
  },

  // DEVOPS
  {
    id: 9,
    title: "Docker Setup",
    description: "Containerize an existing Node.js application",
    budget: 1500,
    category: "DevOps",
    level: "Easy",
    bids: 6
  },
  {
    id: 10,
    title: "Dockerize FastAPI Project",
    description: "Containerize existing FastAPI application",
    budget: 3000,
    category: "DevOps",
    level: "Intermediate",
    bids: 3
  },
  {
    id: 11,
    title: "CI/CD Pipeline Setup",
    description: "Setup GitHub Actions deployment workflow",
    budget: 4500,
    category: "DevOps",
    level: "Intermediate",
    bids: 2
  },
  {
    id: 12,
    title: "Kubernetes Setup",
    description: "Setup and configure Kubernetes clusters",
    budget: 5500,
    category: "DevOps",
    level: "Expert",
    bids: 1
  },

  // MOBILE
  {
    id: 13,
    title: "Bug Fix in Mobile App",
    description: "Fix crash issue occurring on Android devices",
    budget: 2000,
    category: "Mobile",
    level: "Easy",
    bids: 6
  },
  {
    id: 14,
    title: "Flutter App Development",
    description: "Build iOS and Android app for fitness tracking",
    budget: 8000,
    category: "Mobile",
    level: "Intermediate",
    bids: 4
  },
  {
    id: 15,
    title: "React Native Mobile App",
    description: "Develop cross-platform food delivery application",
    budget: 9000,
    category: "Mobile",
    level: "Intermediate",
    bids: 5
  },
  {
    id: 16,
    title: "Banking App Development",
    description: "Build secure banking application with biometrics",
    budget: 12000,
    category: "Mobile",
    level: "Expert",
    bids: 2
  },

  // AI/ML
  {
    id: 17,
    title: "Dataset Cleanup",
    description: "Clean and prepare dataset for training",
    budget: 1800,
    category: "AI/ML",
    level: "Easy",
    bids: 7
  },
  {
    id: 18,
    title: "Chatbot for Website",
    description: "Integrate AI chatbot into company website",
    budget: 7500,
    category: "AI/ML",
    level: "Intermediate",
    bids: 2
  },
  {
    id: 19,
    title: "Sentiment Analysis Model",
    description: "Analyze customer reviews using NLP",
    budget: 6500,
    category: "AI/ML",
    level: "Intermediate",
    bids: 4
  },
  {
    id: 20,
    title: "Computer Vision System",
    description: "Build image recognition model for products",
    budget: 10000,
    category: "AI/ML",
    level: "Expert",
    bids: 1
  }
])

  const filteredGigs = gigs.filter(gig => {

    const matchesSearch = gig.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || gig.category === selectedCategory
    return matchesSearch && matchesCategory

  })

  return (
    <div className="FatherSupreme min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900 border-b border-solid border-blue-500">

        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          
          <h1 className="text-2xl font-bold">GigFlow</h1>
          
          <nav className="flex gap-8 items-center">
            <button className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Browse
            </button>
            <button className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              My Bids
            </button>
            <button className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Messages
            </button>
            <button 
              onClick={() => navigate("/auth")}
              className="text-gray-300 hover:text-white transition-colors"
            >
              <User className="w-5 h-5" />
            </button>
          </nav>

        </div>
        
      </header>

      {/* Search Section */}
      <div className="bg-slate-900 border-solid border-b border-blue-500 py-8">

        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl font-bold mb-6">Find Your Next Project</h2>
          <div className="flex gap-3">
            
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search gigs..."
                value={searchQuery}
                // value="Aditya"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 px-4 py-3 bg-slate-800 border border-blue-500 border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 text-sm"
              />
            </div>
            
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-medium text-sm transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" /> Post Gig
            </button>

          </div>
        </div>

      </div>

      {/* Main Content */}
      <div className="Daddy max-w-7xl mx-auto px-8 py-8">

        {/* Category Filter */}
        <div className="mb-8">
          <p className="text-gray-400 text-sm mb-3 font-medium">Category</p>
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

          { filteredGigs.length > 0 ? (
            filteredGigs.map(gig => (
              <div
                key={gig.id}
                className="CardBase border border-blue-500 border-opacity-20 rounded-lg p-6 hover:border-opacity-50 hover:bg-slate-800 transition-all cursor-pointer"
              >
                <div className="flexFather flex justify-between items-start gap-4">

                  <div className="flexChild1 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold hover:text-blue-400 transition-colors">
                        {gig.title}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded ${
                        gig.level === 'Expert' 
                          ? 'bg-red-500 bg-opacity-20 text-red-300'
                          : gig.level === 'Intermediate'
                          ? 'bg-yellow-500 bg-opacity-20 text-yellow-300'
                          : 'bg-green-500 bg-opacity-20 text-green-300'
                      }`}>
                        {gig.level}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">{gig.description}</p>
                    <div className="flex items-center gap-6 text-sm">
                      <span className="text-gray-500">{gig.category}</span>
                      <span className="text-gray-500">{gig.bids} bids</span>
                      <span className="text-blue-400 font-semibold">₹{gig.budget.toLocaleString()}</span>
                    </div>
                  </div>

                  <button className="flexChild2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
                    View
                  </button>
                  
                </div>

              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No gigs found matching your search</p>
            </div>
          ) }
          
        </div>

      </div>
      


    </div>


  )
}