import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Briefcase, TrendingUp, MessageSquare, IndianRupee, ArrowLeft, LogOut } from "lucide-react"
import { getGigById } from "../api/gigs"
import { postBid, getBidsByGig } from "../api/bids"

export default function GigPage() {

  const { gigId } = useParams()
  const navigate = useNavigate()
  //user stores a js object like this user = {id: 2,name: "Aditya",email: "aditya@gmail.com"}
  const user = JSON.parse(localStorage.getItem("user"))
  const token = localStorage.getItem("token")

  const [gig, setGig] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Bid form states
  const [bidForm, setBidForm] = useState({ message: "", price: "" })
  const [bidError, setBidError] = useState("")
  const [bidLoading, setBidLoading] = useState(false)
  const [bidSuccess, setBidSuccess] = useState(false)

  // Bids list states (owner only)
  const [bids, setBids] = useState([])
  const [bidsLoading, setBidsLoading] = useState(false)

  //useEffect to call a gig and all its bids
 useEffect(() => {
    const fetchGig = async () => {
      try {
        setLoading(true)
        const response = await getGigById(gigId)
        setGig(response.data)

        // Fetch bids only if current user is the owner
        if (response.data.owner_id === user?.id) {
          const bidsResponse = await getBidsByGig(gigId, token)
          setBids(bidsResponse.data)
        }
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

  //bid form handleSubmit --------------------------------------------------
  const handleBidSubmit = async (e) => {
    e.preventDefault()
    setBidError("")

    if (!bidForm.message || !bidForm.price) {
      setBidError("All fields are required")
      return
    }

    //if you're not signed in/guest user
    if (!token) {
      navigate("/auth")
      return
    }

    try {
      setBidLoading(true)
      await postBid(gigId, {
        message: bidForm.message,
        price: parseInt(bidForm.price)
      }, token)
      setBidSuccess(true)
      setBidForm({ message: "", price: "" })
    }
    catch (err) {
      setBidError(err.response?.data?.detail || "Something went wrong")
    }
    finally {
      setBidLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <header className="bg-slate-900 sticky top-0 z-50 border-b-2 border-solid border-blue-500">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold cursor-pointer">GigFlow</h1>
          <nav className="flex gap-8 items-center">
            <button className="flex items-center gap-2 text-gray-300 hover:text-white hover:scale-105 cursor-pointer transition-colors text-sm">
              <Briefcase className="w-4 h-4" />
              Browse
            </button>
            <button className="flex items-center gap-2 text-gray-300 hover:text-white hover:scale-105 cursor-pointer transition-colors text-sm">
              <TrendingUp className="w-4 h-4" />
              My Bids
            </button>
            <button className="flex items-center gap-2 text-gray-300 hover:text-white hover:scale-105 cursor-pointer transition-colors text-sm">
              <MessageSquare className="w-4 h-4" />
              Messages
            </button>
            <div className="flex items-center gap-2 bg-slate-800 border border-blue-500 border-opacity-30 px-3 py-1.5 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">
                {user?.name?.charAt(0).toUpperCase() || "G"}
              </div>
              <span className="text-sm text-white font-medium">{user?.name || "Guest"}</span>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem("token")
                localStorage.removeItem("user")
                navigate("/auth")
              }}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 hover:scale-105 cursor-pointer transition-all text-sm"
            >
              <LogOut className="w-4 h-4" />
              Logout
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
          <>
            {/* Gig Details Card */}
            <div className="bg-slate-900 border border-blue-500 rounded-2xl p-8 mb-6">

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

              {/* Category + owner + bids + budget */}
              <div className="flex gap-6 items-center text-sm mb-6">
                <span className="text-gray-500">{gig.category}</span>
                <span className="text-blue-400 font-semibold">👤 {gig.owner_name}</span>
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
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Description</p>
                <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">
                  {gig.description}
                </p>
              </div>

            </div>

            {/* Bid Form - only show if NOT the owner */}
            {user?.id !== gig?.owner_id && (
              <div className="bg-slate-900 border border-blue-500 rounded-2xl p-8 mb-6">
                <h3 className="text-lg font-semibold mb-6">Place a Bid</h3>

                {bidSuccess && (
                  <div className="bg-green-500 bg-opacity-20 border border-green-500 text-green-400 px-4 py-2 rounded-lg text-sm mb-4">
                    Bid placed successfully!
                  </div>
                )}

                <form onSubmit={handleBidSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Message
                    </label>
                    <textarea
                      value={bidForm.message}
                      onChange={(e) => setBidForm( prev => ({ ...prev, message: e.target.value }) )  }
                      placeholder="Describe your approach and why you're the best fit..."
                      rows={7}
                      className="w-full px-4 py-3 bg-slate-800 border border-blue-500 border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 text-sm resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Price (₹)
                    </label>
                    <input
                      type="number"
                      value={bidForm.price}
                      onChange={(e) => setBidForm(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="e.g. 4500"
                      className="w-full px-4 py-3 bg-slate-800 border border-blue-500 border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 text-sm"
                    />
                  </div>

                  {bidError && (
                    <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-400 px-4 py-2 rounded-lg text-sm text-center">
                      {bidError}
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={bidLoading}
                      className="bg-blue-600 hover:bg-blue-500 active:scale-95 text-white px-8 py-3 rounded-lg font-medium text-sm transition-all"
                    >
                      {bidLoading ? "Submitting..." : "Place Bid"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Bids List - only show to gig owner */}
            {user?.id === gig?.owner_id && (
              <div className="bg-slate-900 border border-blue-500 rounded-2xl p-8">
                <h3 className="text-lg font-semibold mb-6">
                  Bids ({bids.length})
                </h3>

                {bidsLoading ? (
                  <p className="text-gray-500 text-sm">Loading bids...</p>
                ) : bids.length === 0 ? (
                  <p className="text-gray-500 text-sm">No bids yet.</p>
                ) : (
                  <div className="Individuak_bid space-y-4">
                    {bids.map(bid => (
                      <div
                        key={bid.id}
                        className="border border-blue-500 border-opacity-20 rounded-lg p-4 hover:border-opacity-50 transition-all"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">
                              {bid.freelancer_name?.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium text-sm">{bid.freelancer_name}</span>
                          </div>
                          <span className="text-blue-400 font-semibold text-sm">
                            ₹{bid.price.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">{bid.message}</p>
                        <div className="flex justify-between items-center">
                          <span className={`text-xs px-2 py-1 rounded ${
                            bid.status === 'hired'
                            ? 'bg-green-500 bg-opacity-20 text-green-300'
                            : bid.status === 'rejected'
                            ? 'bg-red-500 bg-opacity-20 text-red-300'
                            : 'bg-yellow-500 bg-opacity-20 text-yellow-300'
                          }`}>
                            {bid.status}
                          </span>
                          {/* Hire button - coming next */}
                          {bid.status === 'pending' && (
                            <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-1.5 rounded-lg text-xs font-medium transition-colors">
                              Hire
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          

          </>
        )}
      </div>
    </div>
  )
}