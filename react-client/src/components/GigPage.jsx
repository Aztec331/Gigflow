import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Briefcase, TrendingUp, MessageSquare, User, ArrowLeft, IndianRupee } from "lucide-react"
import { getGigById } from "../api/gigs"

export default function GigPage() {

  const { gigId } = useParams()
  const navigate = useNavigate()

  const [gig, setGig] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {

    const fetchGig = async () => {
      try {

        setLoading(true)
        const response = await getGigById(gigId)
        setGig(response.data)

      }
      catch (err) {

        if (err.response?.status === 404) {
          setError("Gig not found")
        } else {
          setError("Something went wrong while loading this gig")
        }

      }
      finally {
        setLoading(false)
      }
    }

    fetchGig()

  }, [gigId])


  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <header className="bg-slate-900 sticky top-0 z-50 border-b-2 border-solid border-blue-500">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/main")}>GigFlow</h1>
          <nav className="flex gap-8 items-center">
            <button onClick={() => navigate("/main")} className="flex items-center gap-2 text-gray-300 hover:text-white hover:scale-105 cursor-pointer transition-all text-sm">
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

        {loading ? (

          <div className="text-center py-12">
            <p className="text-gray-500">Loading gig...</p>
          </div>

        ) : error ? (

          <div className="text-center py-12">
            <p className="text-gray-500">{error}</p>
          </div>

        ) : (

          <div className="bg-slate-900 border border-blue-500 rounded-2xl p-8">

            {/* Title + Level */}
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-3xl font-bold">{gig.title}</h2>
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

            {/* Category + bids */}
            <div className="flex gap-6 items-center text-sm mb-6">
              <span className="text-gray-500">{gig.category}</span>
              <span className="text-gray-500 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {gig.bids} bids
              </span>
              <span className="text-blue-400 font-semibold flex items-center gap-1">
                <IndianRupee className="w-4 h-4" />
                {gig.budget.toLocaleString()}
              </span>
            </div>

            {/* Divider */}
            <div className="h-px bg-blue-500 bg-opacity-20 mb-6"></div>

            {/* Description */}
            <div className="mb-8">
              <p className="text-sm font-medium text-gray-300 mb-2">Description</p>
              <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">
                {gig.description}
              </p>
            </div>

            {/* Bid button */}
            <div className="flex justify-end">
              <button
                className="bg-blue-600 hover:bg-blue-500 active:scale-95 text-white px-8 py-3 rounded-lg font-medium text-sm transition-all"
              >
                Place a Bid
              </button>
            </div>

          </div>

        )}

      </div>
      















    </div>
  )
}