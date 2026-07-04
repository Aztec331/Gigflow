import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './components/AuthPage'
import MainPage from './components/MainPage'
import Rough from './components/Rough'
import PostGigPage from './components/PostGigPage'
import GigPage from "./components/GigPage"

function App() {
  return (

    <div className='min-h-screen bg-slate-950'>
    <BrowserRouter>

      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/post-gig" element={<PostGigPage />} />
        <Route path="/gigs/:gigId" element={<GigPage />} />
        <Route path="/rough/:gigId" element={<Rough />} />
      </Routes>

    </BrowserRouter>
    </div>


  )
}

export default App