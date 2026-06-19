import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Plus, MessageSquare, User, Briefcase, TrendingUp } from "lucide-react"

export default function MainPage() {

  const[searchQuery, setSearchQuery] = useState("")

  const navigate = useNavigate()

  return (

    <div className="FatherSupreme h-screen bg-slate-950 text-white">

    {/* Header header's bg is bg-slate-900 */}
    <header className="BigDaddy bg-red-900 sticky top-0 z-50 border-b-2 border-solid border-blue-500">
      
      <div className="Daddy bg-yellow-500 max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

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
    <div className="BigDaddy bg-red-900 border-solid border-b border-blue-500 py-8">
      

      {/* max-w-7xl means 1280px */}
      <div className="Daddy bg-yellow-500 max-w-7xl mx-auto px-8">
        <h1 className="text-3xl font-bold mb-6">Find Your Next Project</h1>

        <div className=" bg-green-500 Little_flex_father flex gap-3">

          <div className="child_1_Of_Flex flex-1 relative">

              <Search className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search gigs..."
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 px-4 py-3 bg-slate-800 border border-blue-500 border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 text-sm"
              />
            

          </div>
          
          <button className="child_2_Of_Flex bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-medium text-sm transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> Post a Gig
          </button>

        </div>

      </div>


    </div>






















    </div>




















  )
}