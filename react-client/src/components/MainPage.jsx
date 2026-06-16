import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Plus, MessageSquare, User, Briefcase, TrendingUp } from "lucide-react"

export default function MainPage() {
  const navigate = useNavigate()


  return (

    <div className="BigDaddy h-screen bg-slate-950 text-white">

    {/* Header header's bg is bg-slate-900 */}
    <header className="bg-red-900 sticky top-0 z-50 border-b-3 border-solid border-blue-500">
      
      <div className="bg-yellow-500 max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

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
    <div>






    </div>






















    </div>




















  )
}