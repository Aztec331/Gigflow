import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Plus, MessageSquare, User, Briefcase, TrendingUp } from "lucide-react"

export default function MainPage() {

  const[searchQuery, setSearchQuery] = useState("")
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
      category: "Web Development",
      level: "Intermediate",
      bids: 5
    },
    {
      id: 4,
      title: "Database Schema Design",
      description: "Design PostgreSQL database for enterprise e-commerce",
      budget: 2500,
      category: "Web Development",
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
      category: "Web Development",
      level: "Expert",
      bids: 3
    },
    {
      id: 9,
      title: "React Native Mobile App",
      description: "Develop cross-platform food delivery application",
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
      description: "Setup and configure Kubernetes clusters",
      budget: 5500,
      category: "DevOps",
      level: "Expert",
      bids: 1
    },
    {
      id: 12,
      title: "Machine Learning Model",
      description: "Build ML model for text classification",
      budget: 8500,
      category: "AI/ML",
      level: "Expert",
      bids: 4
    }
  ])



  return (

    <div className="FatherSupreme h-screen bg-slate-950 text-white">

    {/* Header header's bg is bg-slate-900 */}
    <header className="BigDaddy bg-slate-900 sticky top-0 z-50 border-b-2 border-solid border-blue-500">
      
      <div className="Daddy max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold">GigFlow</h1>

        <nav className="flex gap-8 items-center">

          <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm">
            <Briefcase className="w-4 h-4" />
            Browse
          </button>
          <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm">
             <TrendingUp className="w-4 h-4" />
            My Bids
          </button>

          <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm">
            <MessageSquare className="w-4 h-4" />
            Messages
          </button>

          <button 
          onClick={() => navigate("/auth")}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm">
            <User className="w-4 h-4" />
            User
          </button>

        </nav>

      </div>

    </header>

    {/* Search Section */}
    <div className="BigDaddy bg-slate-900 border-solid border-b border-blue-500 py-8">
      

      {/* max-w-7xl means 1280px */}
      <div className="Daddy max-w-7xl mx-auto px-8">
        <h1 className="text-3xl font-bold mb-6">Find Your Next Project</h1>

        <div className="Little_flex_father flex gap-3">

          <div className="child_1_Of_Flex flex-1 relative">

              <Search className="absolute left-4 top-3 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search gigs..."
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 px-4 py-3 bg-slate-800 border border-blue-500 border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 text-sm"
              />
            
          </div>
          
          <button className="child_2_Of_Flex bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium text-sm transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> Post a Gig
          </button>

        </div>

      </div>


    </div>


    {/* Main Content */}
    <div className="BigDaddy">
      
    
      <div className="Daddy max-w-7xl mx-auto px-8 py-8">
      
      {/* Categories filter */}
      <div className="mb-8">
      <p className="text-gray-400 text-sm mb-3 font-medium">Category</p>
      <div className="allCategories flex gap-2 ">
        {categories.map(cat =>(
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

      {/* Gigs list */}
      <div className="space-y-3">
        Gigs list
      </div>

    

























      </div>
    </div>





























    </div>

  )
}